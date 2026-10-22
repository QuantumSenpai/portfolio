"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  availability,
  contactForm,
  contactSection,
  email,
} from "@/lib/data";
import { EASE, DURATION, STAGGER } from "@/lib/motion";
import { Footer } from "@/components/footer";

const HOVER_TRANSITION = {
  transitionDuration: `${DURATION.base}s`,
  transitionTimingFunction: `cubic-bezier(${EASE.join(", ")})`,
};

const MIN_ELAPSED_MS = 3000;
const COOLDOWN_MS = 60 * 1000;
const COOLDOWN_KEY = "contact:cooldown";

type Status = "idle" | "sending" | "success" | "error";

const FIELD_CLASS =
  "w-full border-b border-ink/20 bg-transparent pb-2 text-[1.0625rem] text-ink transition-colors placeholder:text-ink-dim/60 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function Contact({
  hasSignature = false,
}: {
  hasSignature?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [consent, setConsent] = useState(false);

  const [copied, setCopied] = useState(false);
  const emailRef = useRef<HTMLSpanElement>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [startedAt, setStartedAt] = useState("");
  const [ready, setReady] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState(0);

  const [nameLabel, emailLabel, serviceLabel, messageLabel] = contactForm.fields;

  useEffect(() => {
    setStartedAt(String(Date.now()));
    const timer = setTimeout(() => setReady(true), MIN_ELAPSED_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let last = 0;
    try {
      const raw = window.localStorage.getItem(COOLDOWN_KEY);
      last = raw ? Number(raw) : 0;
    } catch {
      last = 0;
    }
    if (Number.isFinite(last) && last > 0) {
      const until = last + COOLDOWN_MS;
      if (until > Date.now()) setCooldownUntil(until);
    }
  }, []);

  useEffect(() => {
    if (!cooldownUntil) return;
    const remaining = cooldownUntil - Date.now();
    if (remaining <= 0) {
      setCooldownUntil(0);
      return;
    }
    const timer = setTimeout(() => setCooldownUntil(0), remaining);
    return () => clearTimeout(timer);
  }, [cooldownUntil]);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  async function handleCopy() {
    let didCopy = false;

    try {
      await navigator.clipboard.writeText(email);
      didCopy = true;
    } catch {
      const node = emailRef.current;
      if (node && typeof window !== "undefined") {
        try {
          const range = document.createRange();
          range.selectNodeContents(node);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
          didCopy = document.execCommand("copy");
        } catch {
          didCopy = false;
        }
      }
    }

    if (didCopy) {
      setCopied(true);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(() => setCopied(false), 1600);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const senderEmail = String(data.get("email") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const company = String(data.get("company") ?? "");
    const formStartedAt = String(data.get("startedAt") ?? "");

    if (!consent) {
      setErrorMessage(contactForm.errors.missingConsent);
      setStatus("error");
      return;
    }

    if (!name || !senderEmail || !service || !message) {
      setErrorMessage(contactForm.errors.missingFields);
      setStatus("error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(senderEmail)) {
      setErrorMessage(contactForm.errors.invalidEmail);
      setStatus("error");
      return;
    }

    if (message.length < 10) {
      setErrorMessage(contactForm.errors.invalidFields);
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: senderEmail,
          service,
          message,
          company,
          startedAt: formStartedAt,
          consent: true,
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        setErrorMessage(payload?.error ?? contactForm.errors.invalidRequest);
        setStatus("error");
        return;
      }

      form.reset();
      setConsent(false);

      const now = Date.now();
      try {
        window.localStorage.setItem(COOLDOWN_KEY, String(now));
      } catch {
        setCooldownUntil(0);
      }
      setCooldownUntil(now + COOLDOWN_MS);
      setStatus("success");
    } catch {
      setErrorMessage(contactForm.errors.sendFailed);
      setStatus("error");
    }
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: STAGGER },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.base, ease: EASE },
    },
  };

  const disabled = status === "sending" || !ready || cooldownUntil > 0;

  return (
    <section id="contact" className="relative w-full py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10 lg:px-16">
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-8 xl:gap-x-12">
            <motion.div
              variants={itemVariants}
              className="pb-16 sm:pb-24 lg:col-span-5"
            >
              <span className="font-mono text-[13px] uppercase tracking-widest text-accent">
                {contactSection.eyebrow}
              </span>
              <h2
                style={{ fontWeight: 800, letterSpacing: "-0.04em" }}
                className="mt-4 font-display text-ink text-[clamp(2.5rem,7vw,7rem)] leading-[0.95] [text-wrap:balance]"
              >
                {contactSection.heading}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-dim sm:text-lg">
                {contactSection.subline}
              </p>

              <a
                href={`mailto:${email}`}
                style={HOVER_TRANSITION}
                className="group relative mt-8 inline-flex max-w-full items-center gap-2 text-[clamp(1.25rem,2.4vw,2rem)] leading-tight text-ink transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 max-[379px]:[overflow-wrap:anywhere]"
              >
                <span ref={emailRef}>{email}</span>
                <span
                  aria-hidden="true"
                  className="inline-block text-lg leading-none text-ink-dim transition-transform rotate-45 [@media(hover:hover)]:group-hover:rotate-0 group-focus-visible:rotate-0 [@media(hover:hover)]:group-hover:text-accent group-focus-visible:text-accent"
                >
                  ↗
                </span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 bg-accent transition-transform [@media(hover:hover)]:group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
              </a>

              <div className="mt-8 flex flex-wrap items-center gap-3 max-[479px]:flex-col max-[479px]:items-stretch">
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-live="polite"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-ink/15 px-5 text-[0.9375rem] leading-none text-ink-dim transition-colors [@media(hover:hover)]:hover:border-accent [@media(hover:hover)]:hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  {copied ? "Copied" : "Copy email"}
                </button>

                <div className="inline-flex h-11 items-center justify-center gap-2.5 rounded-full border border-ink/15 px-5 text-[0.9375rem] leading-none text-ink-dim">
                  <span
                    aria-hidden="true"
                    className="relative flex h-2 w-2 items-center justify-center"
                  >
                    <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-accent/60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  <span>{availability.text}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="pb-16 sm:pb-24 lg:col-start-7 lg:col-span-6"
            >
              <form
                noValidate
                onSubmit={handleSubmit}
                className="relative grid gap-7"
              >
                <div
                  aria-hidden="true"
                  className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
                >
                  <input
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <input type="hidden" name="startedAt" value={startedAt} />

                <div className="grid gap-7 md:grid-cols-2">
                  <Field label={nameLabel}>
                    <input
                      type="text"
                      name="name"
                      required
                      maxLength={80}
                      autoComplete="name"
                      className={FIELD_CLASS}
                    />
                  </Field>

                  <Field label={emailLabel}>
                    <input
                      type="email"
                      name="email"
                      required
                      maxLength={120}
                      autoComplete="email"
                      className={FIELD_CLASS}
                    />
                  </Field>
                </div>

                <Field label={serviceLabel}>
                  <select name="service" className={FIELD_CLASS}>
                    {contactForm.services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label={messageLabel}>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    maxLength={2000}
                    className={`${FIELD_CLASS} min-h-[140px] resize-none`}
                  />
                </Field>

                <div className="flex items-start gap-3">
                  <input
                    id="privacy-consent"
                    type="checkbox"
                    name="consent"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent)]"
                  />
                  <label
                    htmlFor="privacy-consent"
                    className="text-[0.9375rem] leading-relaxed text-ink-dim"
                  >
                    {contactForm.consentPrefix}{" "}
                    <a
                      href="/privacy"
                      className="underline underline-offset-4 transition-colors [@media(hover:hover)]:hover:text-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                    >
                      {contactForm.consentLink}
                    </a>
                  </label>
                </div>

                <div className="flex flex-col items-start gap-4 min-[640px]:flex-row min-[640px]:items-center">
                  <button
                    type="submit"
                    disabled={disabled}
                    className="btn-primary inline-flex h-[52px] items-center justify-center rounded-full px-7 text-base font-medium transition-opacity disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                  >
                    {status === "sending"
                      ? contactForm.submitting
                      : contactForm.submit}
                  </button>

                  <div aria-live="polite" className="text-base">
                    <AnimatePresence mode="wait">
                      {status === "success" && (
                        <motion.p
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: DURATION.fast, ease: EASE }}
                          className="text-accent"
                        >
                          {contactForm.success}
                        </motion.p>
                      )}
                      {status === "error" && (
                        <motion.p
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: DURATION.fast, ease: EASE }}
                          className="text-red-500"
                        >
                          {errorMessage}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Footer hasSignature={hasSignature} />
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.9375rem] text-ink-dim">{label}</span>
      {children}
    </label>
  );
}
