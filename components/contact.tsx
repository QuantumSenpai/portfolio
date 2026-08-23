"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./ui/reveal";
import { Magnetic } from "./ui/magnetic-button";
import { StrokeText } from "./ui/stroke-text";

type Status = "idle" | "loading" | "success" | "error";

const services = [
  "Video Editing",
  "Motion Design / VFX",
  "Web Development",
  "Content Writing",
  "College Project Help",
  "Other",
];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="container py-24 sm:py-32">
      <Reveal>
        <span className="eyebrow">006 — Contact</span>
        <h2 className="mt-4 max-w-xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Let&apos;s build
          <br />
          <StrokeText>something.</StrokeText>
        </h2>
        <p className="mt-5 max-w-md text-ink-dim">
          Open for freelance — video editing, motion design, web development and content
          writing. Whether you&apos;re a startup, creator or fellow student, let&apos;s
          talk.
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-12 max-w-xl">
        <form
          action="https://formspree.io/f/YOUR_FORM_ID"
          method="POST"
          onSubmit={handleSubmit}
          className="grid gap-5"
        >
          <Field label="Name">
            <input type="text" name="name" required className="field-input" />
          </Field>

          <Field label="Email">
            <input type="email" name="email" required className="field-input" />
          </Field>

          <Field label="Service">
            <select name="service" className="field-input">
              {services.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>

          <Field label="Message">
            <textarea name="message" rows={5} required className="field-input resize-none" />
          </Field>

          <Magnetic strength={0.2}>
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex w-full items-center justify-center rounded-full bg-accent px-6 py-4 text-sm font-medium text-white transition-opacity disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : "Send message"}
            </button>
          </Magnetic>

          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-mono text-sm text-accent"
              >
                Message sent — I&apos;ll get back to you soon ⚡
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-mono text-sm text-red-500"
              >
                Something went wrong — email itxkisu@gmail.com directly.
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </Reveal>
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