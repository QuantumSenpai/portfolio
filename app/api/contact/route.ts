import { NextResponse } from "next/server";
import { contactForm } from "@/lib/data";
import { rateLimitSubmission } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 10 * 1024;
const NAME_MAX = 80;
const EMAIL_MAX = 120;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 2000;

const MIN_ELAPSED_MS = 3000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function fail(status: number, message: string, headers?: HeadersInit) {
  return NextResponse.json({ error: message }, { status, headers });
}

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isSameOrigin(request: Request): boolean {
  const allowed = new Set<string>();

  const requestHost = request.headers.get("host");
  if (requestHost) allowed.add(requestHost);

  const siteUrl = process.env.SITE_URL;
  if (siteUrl) {
    try {
      allowed.add(new URL(siteUrl).host);
    } catch {

    }
  }

  if (allowed.size === 0) return false;

  for (const candidate of [
    request.headers.get("origin"),
    request.headers.get("referer"),
  ]) {
    if (!candidate) continue;
    try {
      if (allowed.has(new URL(candidate).host)) return true;
    } catch {

    }
  }

  return false;
}

export async function POST(request: Request) {

  const declared = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
    return fail(413, contactForm.errors.invalidRequest);
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return fail(400, contactForm.errors.invalidRequest);
  }

  if (raw.length > MAX_BODY_BYTES) {
    return fail(413, contactForm.errors.invalidRequest);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return fail(400, contactForm.errors.invalidRequest);
  }

  const body = (payload ?? {}) as Record<string, unknown>;


  if (str(body.company) !== "") {
    return NextResponse.json({ ok: true });
  }


  const startedAt = Number(body.startedAt);
  if (
    !Number.isFinite(startedAt) ||
    startedAt <= 0 ||
    Date.now() - startedAt < MIN_ELAPSED_MS
  ) {
    return fail(400, contactForm.errors.invalidRequest);
  }


  if (!isSameOrigin(request)) {
    return fail(403, contactForm.errors.invalidRequest);
  }


  if (body.consent !== true) {
    return fail(400, contactForm.errors.missingConsent);
  }


  const name = str(body.name);
  const email = str(body.email);
  const service = str(body.service);
  const message = str(body.message);

  if (!name || name.length > NAME_MAX) {
    return fail(400, contactForm.errors.invalidFields);
  }
  if (!email || email.length > EMAIL_MAX || !EMAIL_RE.test(email)) {
    return fail(400, contactForm.errors.invalidEmail);
  }
  if (!contactForm.services.includes(service)) {
    return fail(400, contactForm.errors.invalidFields);
  }
  if (message.length < MESSAGE_MIN || message.length > MESSAGE_MAX) {
    return fail(400, contactForm.errors.invalidFields);
  }


  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const limit = await rateLimitSubmission(ip);
  if (!limit.allowed) {
    return fail(429, contactForm.errors.rateLimited, {
      "Retry-After": String(limit.retryAfterSeconds),
    });
  }


  const formId = process.env.FORMSPREE_FORM_ID;
  if (!formId) {
    console.error("[contact] FORMSPREE_FORM_ID is not configured");
    return fail(500, contactForm.errors.sendFailed);
  }

  try {
    const upstream = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name, email, service, message }),
      cache: "no-store",
    });

    if (!upstream.ok) {
      console.error("[contact] upstream submission failed", upstream.status);
      return fail(502, contactForm.errors.sendFailed);
    }
  } catch {
    console.error("[contact] upstream request failed");
    return fail(502, contactForm.errors.sendFailed);
  }

  return NextResponse.json({ ok: true });
}
