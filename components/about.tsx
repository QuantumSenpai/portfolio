"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { aboutSection, skillGroups, services } from "@/lib/data";
import { EASE, DURATION, STAGGER } from "@/lib/motion";

/**
 * Shared hover transition.
 * Duration + easing come from lib/motion.ts so every section animates the same.
 */
const HOVER_TRANSITION = {
  transitionDuration: `${DURATION.base}s`,
  transitionTimingFunction: `cubic-bezier(${EASE.join(", ")})`,
};

export function About({ hasPortrait = false }: { hasPortrait?: boolean }) {
  const shouldReduceMotion = useReducedMotion();

  const groupVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: STAGGER },
    },
  };

  const pillVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.base, ease: EASE },
    },
  };

  return (
    <section id="about" className="relative w-full py-24 sm:py-32">
      {/* Legacy anchor: the Skills section now lives here */}
      <span id="skills" />

      <div className="mx-auto w-full max-w-[1680px] px-6 md:px-10 lg:px-16">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, ease: EASE }}
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Section heading */}
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            {aboutSection.eyebrow}
          </span>
          <h2
            style={{ fontWeight: 800, letterSpacing: "-0.04em" }}
            className="mt-4 font-display text-ink text-[length:var(--text-h2)] [text-wrap:balance]"
          >
            {aboutSection.heading}
          </h2>

          <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-x-8 lg:gap-x-12 xl:gap-x-16">
            {/* Left: portrait */}
            <div className="max-w-[240px] md:col-span-4 md:max-w-none">
              <Portrait hasPortrait={hasPortrait} />
              <p className="mt-3 font-mono text-xs text-ink-dim">
                {aboutSection.portrait.caption}
              </p>
            </div>

            {/* Right: bio, skills, services */}
            <div className="md:col-span-7 md:col-start-6">
              {/* Bio */}
              <div className="max-w-[60ch] space-y-4">
                {aboutSection.bio.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-relaxed text-ink-dim">
                    {paragraph}
                  </p>
                ))}
                <p className="font-mono text-xs text-ink-dim">
                  {aboutSection.education.line}
                </p>
              </div>

              {/* Skills */}
              <div className="mt-12">
                {skillGroups.map((group) => (
                  <div key={group.label} className="mt-8 first:mt-0">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-ink-dim">
                      {group.label}
                    </h3>
                    <motion.ul
                      variants={groupVariants}
                      initial={shouldReduceMotion ? false : "hidden"}
                      whileInView="visible"
                      viewport={{ once: true, margin: "-40px" }}
                      className="mt-4 flex flex-wrap gap-2"
                    >
                      {group.items.map((item) => (
                        <motion.li
                          key={item}
                          variants={pillVariants}
                          className="rounded-full border border-ink/20 px-3 py-1 font-mono text-xs text-ink"
                        >
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                ))}
              </div>

              {/* Services */}
              <div className="mt-12 border-t border-ink/15 pt-8">
                <div className="grid gap-8 sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-3">
                  {services.map((service, i) => (
                    <div key={service.title}>
                      <span className="font-mono text-xs tabular-nums text-ink-dim">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h4
                        style={{
                          fontWeight: 700,
                          letterSpacing: "-0.015em",
                        }}
                        className="mt-3 font-display text-xl leading-tight text-ink sm:text-2xl"
                      >
                        {service.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                        {service.line}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Portrait({ hasPortrait }: { hasPortrait: boolean }) {
  const [failed, setFailed] = useState(!hasPortrait);

  if (failed) return <PortraitPlaceholder />;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-ink/15 bg-surface">
      <Image
        src={aboutSection.portrait.src}
        alt={aboutSection.portrait.alt}
        width={1600}
        height={2000}
        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 30vw, 240px"
        className="aspect-[4/5] w-full object-cover grayscale-[30%] transition-[filter] group-hover:grayscale-0"
        style={HOVER_TRANSITION}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

/** Shown when public/profile.jpg is empty or fails to load. */
function PortraitPlaceholder() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-ink/15 bg-surface select-none">
      {/* Accent gradient at 10% opacity */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 120% at 85% 15%, color-mix(in srgb, var(--accent) 10%, var(--surface)), var(--surface))`,
        }}
      />

      {/* Faint grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(to right, var(--ink) 1px, transparent 1px), linear-gradient(to bottom, var(--ink) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Monogram in Cabinet Grotesk at ink 12% opacity */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-8xl font-bold tracking-tighter text-ink/[0.12]"
      >
        KA
      </span>
    </div>
  );
}
