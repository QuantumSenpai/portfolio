"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import {
  availability,
  contactForm,
  contactSection,
  email,
  socials,
} from "@/lib/data";
import { EASE, DURATION, STAGGER } from "@/lib/motion";

/**
 * Shared hover transition.
 * Duration + easing come from lib/motion.ts so every section animates the same.
 */
const HOVER_TRANSITION = {
  transitionDuration: `${DURATION.base}s`,
  transitionTimingFunction: `cubic-bezier(${EASE.join(", ")})`,
};

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const shouldReduceMotion = useReducedMotion();

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [consent, setConsent] = useState(false);

  const [copied, setCopied] = useState(false);
  const emailRef = useRef<HTMLSpanElement>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [nameLabel, emailLabel, serviceLabel, messageLabel] = contactForm.fields;

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
      // Fallback: select the email text so it can be copied manually.
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

    // Consent must be given before anything is sent.
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

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) {
      setErrorMessage(contactForm.errors.invalidEmail);
      setStatus("error");
      return;
    }

    setStatus("loading");
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

  return (
    <section id="contact" className="relative w-full py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1680px] px-6 md:px-10 lg:px-16">
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Heading */}
          <motion.div variants={itemVariants}>
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
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
          </motion.div>

          {/* Email call to action */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col items-start gap-5 sm:mt-16 sm:flex-row sm:items-center sm:gap-6"
          >
            <a
              href={`mailto:${email}`}
              style={HOVER_TRANSITION}
              className="group relative inline-flex max-w-full items-baseline gap-2 font-mono text-[clamp(0.875rem,3.4vw,2.5rem)] leading-none text-ink transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 sm:gap-4"
            >
              <span ref={emailRef} className="break-all">
                {email}
              </span>
              <span
                aria-hidden="true"
                className="inline-block text-xl leading-none text-ink-dim transition-transform rotate-45 group-hover:rotate-0 group-focus-visible:rotate-0 group-hover:text-accent group-focus-visible:text-accent"
              >
                ↗
              </span>
              {/* Accent underline — scaleX 0 -> 1 from the left */}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 bg-accent transition-transform group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </a>

            <button
              type="button"
              onClick={handleCopy}
              aria-live="polite"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/20 px-4 py-2 font-mono text-xs text-ink-dim transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {copied ? "Copied" : "Copy email"}
            </button>
          </motion.div>

          {/* Contact form */}
          <motion.div
            variants={itemVariants}
            className="mt-12 border-t border-ink/15 pt-10 sm:mt-16"
          >
            <form
              noValidate
              onSubmit={handleSubmit}
              className="grid max-w-3xl gap-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={nameLabel}>
                  <input
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    className="field-input"
                  />
                </Field>

                <Field label={emailLabel}>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="field-input"
                  />
                </Field>
              </div>

              <Field label={serviceLabel}>
                <select name="service" className="field-input">
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
                  rows={5}
                  required
                  className="field-input resize-none"
                />
              </Field>

              {/* Privacy consent */}
              <div className="flex items-start gap-3">
                <input
                  id="privacy-consent"
                  type="checkbox"
                  name="consent"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
                />
                <label
                  htmlFor="privacy-consent"
                  className="text-sm leading-relaxed text-ink-dim"
                >
                  {contactForm.consentPrefix}{" "}
                  <a
                    href="/privacy"
                    className="underline underline-offset-4 transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                  >
                    {contactForm.consentLink}
                  </a>
                </label>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-opacity disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                >
                  {status === "loading"
                    ? contactForm.submitting
                    : contactForm.submit}
                </button>

                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: DURATION.fast, ease: EASE }}
                      className="font-mono text-sm text-accent"
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
                      className="font-mono text-sm text-red-500"
                    >
                      {errorMessage}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>

          {/* Socials */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 sm:mt-16"
          >
            {socials.map((social) => (
              <a
                key={social.url}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={HOVER_TRANSITION}
                className="group inline-flex items-center gap-1.5 font-mono text-xs text-ink-dim transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
              >
                <span>{social.label}</span>
                <span
                  aria-hidden="true"
                  className="inline-block text-sm leading-none transition-transform rotate-45 group-hover:rotate-0 group-focus-visible:rotate-0"
                >
                  ↗
                </span>
              </a>
            ))}
          </motion.div>

          {/* Availability */}
          <motion.div
            variants={itemVariants}
            className="mt-12 inline-flex items-center gap-2 font-mono text-xs text-ink-dim sm:mt-16"
          >
            <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-accent/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span>{availability.text}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-ink-dim">
        {label}
      </span>
      {children}
    </label>
  );
}
