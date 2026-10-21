"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Magnetic } from "./ui/magnetic-button";
import { SwissGridBackground } from "./ui/swiss-grid-background";
import { EASE, DURATION } from "@/lib/motion";
import { formatISTTime } from "@/lib/utils";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
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

  // Scroll parallax & fade transforms
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const line1ParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const line2ParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-16%"]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.15]);
  const subcopyOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-x-hidden pb-8 pt-24 sm:pb-10 sm:pt-28"
    >
      {/* The swiss grid lives only inside the hero */}
      <SwissGridBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-[1680px] flex-1 flex-col justify-between px-6 md:px-10 lg:px-16">
        {/* a) Meta row */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, delay: 0.28, ease: EASE }}
          className="flex flex-col gap-2 font-mono text-sm tracking-[0.04em] text-ink-dim sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        >
          <div className="inline-flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span>Available for freelance</span>
          </div>

          <div className="tabular-nums">
            <span>Ghatal, IN · </span>
            <span className="inline-block min-w-[5ch] text-left">
              {mounted && time ? time : "--:--"}
            </span>
            <span> IST</span>
          </div>
        </motion.div>

        {/* Center content: Headline, 12-col Subcopy/CTA row */}
        <div className="my-auto py-2">
          {/* b) Headline (h1) with descender breathing room */}
          <h1 className="text-[clamp(3.25rem,8.6vw,10rem)] font-display font-[800] leading-[0.95] tracking-[-0.05em] text-ink [text-wrap:balance]">
            <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
              <motion.span
                initial={shouldReduceMotion ? false : { y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: DURATION.slow, delay: 0.08, ease: EASE }}
                className="block"
              >
                <motion.span
                  style={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: line1ParallaxY,
                          opacity: headlineOpacity,
                        }
                  }
                  className="inline-block"
                >
                  Building on screen,
                </motion.span>
              </motion.span>
            </span>

            <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
              <motion.span
                initial={shouldReduceMotion ? false : { y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: DURATION.slow, delay: 0.2, ease: EASE }}
                className="block"
              >
                <motion.span
                  style={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: line2ParallaxY,
                          opacity: headlineOpacity,
                        }
                  }
                  className="inline-block"
                >
                  cutting on <span className="timeline-stroke">timeline.</span>
                </motion.span>
              </motion.span>
            </span>
          </h1>

          {/* 12-column layout below headline: cols 1-6 = subcopy + CTAs */}
          <div className="mt-[40px] grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8 lg:col-span-6">
              {/* c) Subcopy: max-width 38ch */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION.base, delay: 0.34, ease: EASE }}
              >
                <motion.p
                  style={shouldReduceMotion ? undefined : { opacity: subcopyOpacity }}
                  className="max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink-dim [text-wrap:pretty]"
                >
                  CSE student and full-stack developer who also cuts cinematic video and motion.
                  Exploring applied ML.
                </motion.p>
              </motion.div>

              {/* d) CTAs: 32px below subcopy */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION.base, delay: 0.4, ease: EASE }}
              >
                <motion.div
                  style={shouldReduceMotion ? undefined : { opacity: subcopyOpacity }}
                  className="mt-[32px] flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6"
                >
                  <Magnetic>
                    <a
                      href="#work"
                      className="btn-primary inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
                    >
                      View work
                    </a>
                  </Magnetic>
                  <a
                    href="#contact"
                    className="group relative inline-flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-ink sm:justify-start"
                  >
                    <span>Get in touch</span>
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                    <span className="absolute bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* e) Bottom row */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, delay: 0.46, ease: EASE }}
          className="flex items-center justify-between font-mono text-sm tracking-[0.04em] text-ink-dim pt-4"
        >
          <motion.div
            style={shouldReduceMotion ? undefined : { opacity: scrollCueOpacity }}
            className="flex items-center gap-2.5"
          >
            <span>Scroll</span>
            <div className="relative h-5 w-px overflow-hidden bg-line-strong">
              {!shouldReduceMotion && (
                <motion.div
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    ease: EASE,
                  }}
                  className="h-full w-full bg-ink"
                />
              )}
            </div>
          </motion.div>

          <span>Web / Motion / ML</span>
        </motion.div>
      </div>
    </section>
  );
}