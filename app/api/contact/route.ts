import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { contactForm } from "@/lib/data";

export const runtime = "nodejs";

/** Rate limit: 5 submissions per 10 minutes, per hashed client IP. */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const HASH_SALT = "kisu-contact-form";

type Bucket = { count: number; resetAt: number };

/** In-memory only — never written to disk, never shared between instances. */
const buckets = new Map<string, Bucket>();

function hashClient(value: string) {
  return createHash("sha256").update(`${HASH_SALT}:${value}`).digest("hex");
}

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const ip =
    forwarded.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  return hashClient(ip);
}

function rateLimit(key: string) {
  const now = Date.now();

  // Drop every window that has already expired.
  for (const [existingKey, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(existingKey);
  }

  const bucket = buckets.get(key);
  if (!bucket) {
    const resetAt = now + RATE_LIMIT_WINDOW_MS;
    buckets.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetAt };
  }

  bucket.count += 1;
  buckets.set(key, bucket);

  return {
    allowed: bucket.count <= RATE_LIMIT_MAX,
    remaining: Math.max(0, RATE_LIMIT_MAX - bucket.count),
    resetAt: bucket.resetAt,
  };
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: contactForm.errors.invalidRequest },
      { status: 400 }
    );
  }

  const body = (payload ?? {}) as Record<string, unknown>;

  // Consent is required — the client always sends consent: true.
  if (body.consent !== true) {
    return NextResponse.json(
      { error: contactForm.errors.missingConsent },
      { status: 400 }
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const service = typeof body.service === "string" ? body.service.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !service || !message) {
    return NextResponse.json(
      { error: contactForm.errors.missingFields },
      { status: 400 }
    );
  }

  const limit = rateLimit(clientKey(request));
  if (!limit.allowed) {
    return NextResponse.json(
      { error: contactForm.errors.rateLimited },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000))
          ),
        },
      }
    );
  }

  try {
    const response = await fetch(contactForm.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name, email, service, message }),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: contactForm.errors.sendFailed },
        { status: 502 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: contactForm.errors.sendFailed },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
