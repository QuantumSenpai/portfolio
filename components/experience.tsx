"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  experienceSection,
  experiences,
  type ExperienceEntry,
} from "@/lib/data";
import { EASE, DURATION, STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Shared hover / focus transition.
 * Duration + easing are pulled from lib/motion.ts so every section animates
 * identically. Only transform + opacity are animated — never layout properties.
 */
const HOVER_TRANSITION = {
  transitionDuration: `${DURATION.base}s`,
  transitionTimingFunction: `cubic-bezier(${EASE.join(", ")})`,
};

export function Experience() {
  const shouldReduceMotion = useReducedMotion();

  // Which row is hovered / focused — every other row dims to 55%
  const [activeId, setActiveId] = useState<string | null>(null);

  const headingVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.base, ease: EASE },
    },
  };

  const listVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: STAGGER },
    },
  };

  const rowVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.base, ease: EASE },
    },
  };

  return (
    <section id="experience" className="relative w-full py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10 lg:px-16">
        {/* Section heading */}
        <motion.div
          variants={headingVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-14 sm:mb-20"
        >
          <span className="font-mono text-[13px] uppercase tracking-widest text-accent">
            {experienceSection.eyebrow}
          </span>
          <h2
            style={{ fontWeight: 800, letterSpacing: "-0.04em" }}
            className="mt-4 font-display text-ink text-[length:var(--text-h2)] [text-wrap:balance]"
          >
            {experienceSection.heading}
          </h2>
          <p className="mt-4 max-w-xl text-base text-ink-dim sm:text-lg">
            {experienceSection.description}
          </p>
        </motion.div>

        {/* Experience rows */}
        <motion.div
          role="list"
          variants={listVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="border-t border-ink/15"
        >
          {experiences.map((entry, idx) => (
            <ExperienceRow
              key={entry.id}
              entry={entry}
              index={idx + 1}
              variants={rowVariants}
              dimmed={activeId !== null && activeId !== entry.id}
              onActive={setActiveId}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ExperienceRow({
  entry,
  index,
  variants,
  dimmed,
  onActive,
}: {
  entry: ExperienceEntry;
  index: number;
  variants: Variants;
  dimmed: boolean;
  onActive: (id: string | null) => void;
}) {
  const formattedIndex = String(index).padStart(2, "0");
  const titleId = `experience-${entry.id}`;
  const meta = [entry.org, entry.location, entry.dates]
    .filter(Boolean)
    .join(" · ");

  return (
    <motion.div role="listitem" variants={variants}>
      <div
        role="group"
        tabIndex={0}
        aria-labelledby={titleId}
        onMouseEnter={() => onActive(entry.id)}
        onMouseLeave={() => onActive(null)}
        onFocus={() => onActive(entry.id)}
        onBlur={() => onActive(null)}
        style={HOVER_TRANSITION}
        className={cn(
          "group relative w-full border-b border-ink/15 py-8 transition-opacity focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 sm:py-10",
          dimmed ? "opacity-55" : "opacity-100"
        )}
      >
        {/* Row background tint — ink at 4% */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-ink/[0.04] opacity-0 transition-opacity [@media(hover:hover)]:group-hover:opacity-100 group-focus-visible:opacity-100"
          style={HOVER_TRANSITION}
        />

        {/* 1px accent underline — scaleX 0 -> 1 from the left */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 bg-accent transition-transform [@media(hover:hover)]:group-hover:scale-x-100 group-focus-visible:scale-x-100"
          style={HOVER_TRANSITION}
        />

        <div className="relative z-10 flex items-baseline gap-6 lg:gap-8">
          {/* Index */}
          <span className="shrink-0 font-mono text-sm tabular-nums tracking-[0.04em] text-ink-dim">
            {formattedIndex}
          </span>

          <div className="min-w-0 flex-1">
            {/* Role */}
            <h3
              id={titleId}
              style={{
                fontWeight: 700,
                letterSpacing: "-0.015em",
                ...HOVER_TRANSITION,
              }}
              className="font-display text-ink text-[length:var(--text-h2)] leading-tight transition-all [@media(hover:hover)]:group-hover:translate-x-3 group-focus-visible:translate-x-3 [@media(hover:hover)]:group-hover:text-accent group-focus-visible:text-accent"
            >
              {entry.role}
            </h3>

            {/* Organisation + dates */}
            <p className="mt-3 font-mono text-sm tracking-[0.04em] text-ink-dim">{meta}</p>

            {/* Summary */}
            {entry.summary && (
              <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-ink">
                {entry.summary}
              </p>
            )}

            {/* Bullets — always visible */}
            <ul className="mt-6 space-y-2.5">
              {entry.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 text-sm leading-relaxed text-ink-dim"
                >
                  <span
                    aria-hidden="true"
                    className="mt-3 h-px w-3 shrink-0 bg-accent/70"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Stats */}
            {entry.stats && entry.stats.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-1.5">
                {entry.stats.map((stat) => (
                  <span
                    key={stat.label}
                    className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-sm tracking-[0.04em] text-accent"
                  >
                    {stat.label}
                  </span>
                ))}
              </div>
            )}

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-1.5">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-ink/15 bg-ink/[0.03] px-2.5 py-1 font-mono text-sm tracking-[0.04em] text-ink-dim"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
