import { createHash } from "node:crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/** Per-IP sliding window: 3 submissions per hour. */
const PER_IP_HOURLY = 3;
/** Per-IP sliding window: 10 submissions per day. */
const PER_IP_DAILY = 10;
/** Global cap per day across every visitor — protects the Formspree quota. */
const GLOBAL_DAILY = 25;

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

/** The IP address is only ever used as a hash key — it is never stored or logged. */
export function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}

/* ------------------------------------------------------------------ */
/* Upstash (shared, survives restarts) — used only when its env is set */
/* ------------------------------------------------------------------ */

let upstashLimiters: {
  ipHourly: Ratelimit;
  ipDaily: Ratelimit;
  global: Ratelimit;
} | null = null;

function getUpstash() {
  if (upstashLimiters) return upstashLimiters;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const redis = new Redis({ url, token });

  upstashLimiters = {
    ipHourly: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(PER_IP_HOURLY, "1 h"),
      prefix: "contact:ip:hour",
      analytics: false,
    }),
    ipDaily: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(PER_IP_DAILY, "1 d"),
      prefix: "contact:ip:day",
      analytics: false,
    }),
    global: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(GLOBAL_DAILY, "1 d"),
      prefix: "contact:global:day",
      analytics: false,
    }),
  };

  return upstashLimiters;
}

/* ------------------------------------------------------------------ */
/* In-memory fallback — only used when Upstash is not configured        */
/* ------------------------------------------------------------------ */

type Bucket = { count: number; resetAt: number };
const memory = new Map<string, Bucket>();

function memoryLimit(
  key: string,
  max: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();

  for (const [existingKey, bucket] of memory) {
    if (bucket.resetAt <= now) memory.delete(existingKey);
  }

  const bucket = memory.get(key);
  if (!bucket) {
    const resetAt = now + windowMs;
    memory.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  bucket.count += 1;
  memory.set(key, bucket);

  return {
    allowed: bucket.count <= max,
    retryAfterSeconds: Math.max(
      1,
      Math.ceil((bucket.resetAt - now) / 1000)
    ),
  };
}

/* ------------------------------------------------------------------ */

let warned = false;

/** Log exactly one warning, never anything about the client. */
function warnOnce(reason: string) {
  if (warned) return;
  warned = true;
  console.warn(
    `[rate-limit] ${reason} — falling back to the in-memory limiter.`
  );
}

function toResult(results: { success: boolean; reset: number }[]) {
  const blocked = results.filter((result) => !result.success);
  if (blocked.length === 0) return { allowed: true, retryAfterSeconds: 0 };

  const reset = Math.min(...blocked.map((result) => result.reset));
  return {
    allowed: false,
    retryAfterSeconds: Math.max(1, Math.ceil((reset - Date.now()) / 1000)),
  };
}

/**
 * Counts one submission against the per-IP hourly window, the per-IP daily
 * window and the global daily cap.
 */
export async function rateLimitSubmission(
  ip: string
): Promise<RateLimitResult> {
  const key = hashIp(ip);
  const upstash = getUpstash();

  if (upstash) {
    try {
      const [hourly, daily, global] = await Promise.all([
        upstash.ipHourly.limit(key),
        upstash.ipDaily.limit(key),
        upstash.global.limit("all"),
      ]);
      return toResult([hourly, daily, global]);
    } catch {
      warnOnce("Upstash could not be reached");
    }
  } else {
    warnOnce(
      "UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are not set"
    );
  }

  const hourly = memoryLimit(`h:${key}`, PER_IP_HOURLY, HOUR_MS);
  const daily = memoryLimit(`d:${key}`, PER_IP_DAILY, DAY_MS);
  const global = memoryLimit("g:all", GLOBAL_DAILY, DAY_MS);

  return toResult([
    { success: hourly.allowed, reset: Date.now() + hourly.retryAfterSeconds * 1000 },
    { success: daily.allowed, reset: Date.now() + daily.retryAfterSeconds * 1000 },
    { success: global.allowed, reset: Date.now() + global.retryAfterSeconds * 1000 },
  ]);
}
