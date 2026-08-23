"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { CursorGlow } from "./ui/cursor-glow";
import { Magnetic } from "./ui/magnetic";
import { stats } from "@/lib/data";

const headlineLines = ["Building on screen,", "cutting on timeline."];

const terminalLines = [
  "now coding a new feature",
  "now editing a cinematic cut",
  "now learning NLP & ML",
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-16 pt-28 sm:px-8"
    >
      <CursorGlow />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 inline-flex items-center gap-2 font-mono text-xs text-ink-dim"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Available for freelance — Ghatal, West Bengal, IN
        </motion.div>

        <h1 className="max-w-4xl text-[13vw] leading-[0.98] sm:text-[7.5vw] lg:text-[5.5rem]">
          {headlineLines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={i === 1 ? "inline-block italic text-accent" : "inline-block"}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-md text-base text-ink-dim sm:text-lg"
        >
          I&apos;m <strong className="font-medium text-ink">Krishnendu Adak</strong> — a
          B.Tech CSE student building interactive web experiences by day and cutting
          cinematic edits by night. Currently deep in NLP &amp; Machine Learning.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
        >
          <Terminal />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <Magnetic>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              View work
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-accent"
            >
              Get in touch
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-16 flex flex-wrap gap-10 sm:gap-14"
        >
          {stats.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Terminal() {
  const [text, setText] = useState("");

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      const current = terminalLines[lineIndex];
      if (!deleting) {
        charIndex++;
        setText(current.slice(0, charIndex));
        if (charIndex === current.length) {
          deleting = true;
          timeout = setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex--;
        setText(current.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          lineIndex = (lineIndex + 1) % terminalLines.length;
        }
      }
      timeout = setTimeout(tick, deleting ? 28 : 50);
    }

    tick();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="mt-8 inline-flex max-w-fit items-center gap-2 rounded-lg border border-line bg-surface px-4 py-3 font-mono text-sm text-ink-dim">
      <span className="text-accent">~/kisu</span>
      <span>{text}</span>
      <span className="animate-pulse">_</span>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div className="flex flex-col gap-1">
      <span ref={ref} className="font-display text-3xl sm:text-4xl">
        0
      </span>
      <span className="font-mono text-xs text-ink-dim">{label}</span>
    </div>
  );
}