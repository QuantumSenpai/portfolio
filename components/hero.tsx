"use client";

import { useEffect, useRef, useState } from "react";
import {
  m,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Magnetic } from "./ui/magnetic-button";
import { SwissGridBackground } from "./ui/swiss-grid-background";
import { EASE, DURATION, STAGGER } from "@/lib/motion";
import { availability, heroCopy, heroLinks } from "@/lib/data";
import { formatISTTime } from "@/lib/utils";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const bottomBarInView = useInView(bottomBarRef);
  const shouldReduceMotion = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    setMounted(true);
    setTime(formatISTTime());
    const interval = setInterval(() => {
      setTime(formatISTTime());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

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
    <section
      ref={heroRef}
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-x-hidden pb-8 pt-24 sm:pt-28"
    >
      <SwissGridBackground />

      <m.div
        variants={containerVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-[1680px] flex-1 flex-col px-5 md:px-10 lg:px-16"
      >
        <m.div
          variants={itemVariants}
          className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="inline-flex h-11 items-center gap-2.5 rounded-full border border-ink/15 px-5 text-[0.9375rem] leading-none text-ink-dim">
            <span
              aria-hidden="true"
              className="relative flex h-2 w-2 items-center justify-center"
            >
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-accent/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span>{availability.text}</span>
          </div>

          <div className="text-[0.9375rem] tabular-nums text-ink-dim">
            <span>Ghatal, IN · </span>
            <span className="inline-block min-w-[5ch] text-left">
              {mounted && time ? time : "--:--"}
            </span>
            <span> IST</span>
          </div>
        </m.div>

        <div className="my-auto py-8">
          <h1 className="font-display text-[clamp(2.5rem,7vw,6.5rem)] font-bold leading-[1.0] tracking-[-0.03em] text-ink [text-wrap:balance]">
            <m.span variants={itemVariants} className="sm:block">
              {heroCopy.headline.first}
            </m.span>{" "}
            <m.span variants={itemVariants} className="sm:block">
              {heroCopy.headline.second}{" "}
              <span className="timeline-stroke">{heroCopy.headline.accent}</span>
            </m.span>
          </h1>

          <m.p
            variants={itemVariants}
            className="mt-8 max-w-[52ch] text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-relaxed text-ink-dim [text-wrap:pretty]"
          >
            {heroCopy.subcopy}
          </m.p>

          <m.div
            variants={itemVariants}
            className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center"
          >
            <Magnetic>
              <a
                href="#work"
                className="btn-primary inline-flex h-[52px] items-center justify-center rounded-full px-6 text-sm font-medium transition-transform hover:-translate-y-0.5"
              >
                View work
              </a>
            </Magnetic>

            <a
              href="#contact"
              className="group relative inline-flex min-h-11 items-center justify-center gap-1.5 text-sm font-medium text-ink sm:justify-start"
            >
              <span>Get in touch</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 [@media(hover:hover)]:group-hover:translate-x-1"
              >
                →
              </span>
              <span className="absolute bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] [@media(hover:hover)]:group-hover:scale-x-100" />
            </a>
          </m.div>
        </div>

        <m.div
          ref={bottomBarRef}
          variants={itemVariants}
          className="mt-auto flex items-center justify-between gap-4 border-t border-ink/10 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-6"
        >
          <div className="hidden items-center gap-2 text-[0.9375rem] text-ink-dim min-[480px]:flex">
            <span>{heroCopy.scrollLabel}</span>
            <m.span
              aria-hidden="true"
              animate={
                shouldReduceMotion || !bottomBarInView
                  ? { y: 0 }
                  : { y: [0, 6, 0] }
              }
              transition={
                shouldReduceMotion || !bottomBarInView
                  ? { duration: 0 }
                  : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
              }
              className="inline-block"
            >
              ↓
            </m.span>
          </div>

          <div className="grid w-full grid-cols-3 gap-2 min-[480px]:w-auto min-[480px]:flex">
            {heroLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex h-11 items-center justify-center rounded-full border border-ink/15 px-5 text-[0.9375rem] leading-none text-ink transition-colors [@media(hover:hover)]:hover:border-accent [@media(hover:hover)]:hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
              >
                {link.label}
              </a>
            ))}
          </div>
        </m.div>
      </m.div>
    </section>
  );
}
