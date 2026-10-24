"use client";

import { useState } from "react";
import { m, useReducedMotion, type Variants } from "framer-motion";
import {
  experienceSection,
  experiences,
  type ExperienceEntry,
} from "@/lib/data";
import { EASE, DURATION } from "@/lib/motion";
import { cn } from "@/lib/utils";

const HOVER_TRANSITION = {
  transitionDuration: `${DURATION.base}s`,
  transitionTimingFunction: `cubic-bezier(${EASE.join(", ")})`,
};

export function Experience() {
  const shouldReduceMotion = useReducedMotion();

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
      transition: { staggerChildren: 0.05 },
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
    <section id="experience" className="relative w-full py-24 sm:py-32 scroll-mt-[72px]">
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10 lg:px-16">

        <m.div
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
        </m.div>


        <m.div
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
        </m.div>
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
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false); // Always start collapsed per requirement 9

  const formattedIndex = String(index).padStart(2, "0");
  const titleId = `experience-${entry.id}`;
  const panelId = `experience-panel-${entry.id}`;
  const meta = [entry.org, entry.location, entry.dates]
    .filter(Boolean)
    .join(" · ");

  const expandTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: DURATION.base, ease: EASE };

  // Render bullet — shows ALL bullets when expanded, none when collapsed
  const renderBullet = (bullet: string, bulletIndex: number) => (
    <li
      key={`${bulletIndex}-${bullet}`}
      className="flex items-start gap-3 text-[16px] leading-[1.65] text-ink-dim max-w-[78ch]"
    >
      <span
        aria-hidden="true"
        className="mt-3 h-px w-3 shrink-0 bg-accent/70"
      />
      <span>{bullet}</span>
    </li>
  );

  return (
    <m.div role="listitem" variants={variants}>
      <div
        role="group"
        aria-labelledby={titleId}
        onMouseEnter={() => onActive(entry.id)}
        onMouseLeave={() => onActive(null)}
        onFocus={() => onActive(entry.id)}
        onBlur={() => onActive(null)}
        className={cn(
          "group relative w-full border-b border-ink/15 py-8 transition-opacity sm:py-10",
          dimmed ? "opacity-55" : "opacity-100"
        )}
      >

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-ink/[0.04] opacity-0 transition-opacity [@media(hover:hover)]:group-hover:opacity-100 group-has-[:focus-visible]:opacity-100"
          style={HOVER_TRANSITION}
        />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 bg-accent transition-transform [@media(hover:hover)]:group-hover:scale-x-100 group-has-[:focus-visible]:scale-x-100"
          style={HOVER_TRANSITION}
        />

        <div className="relative z-10">

          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
            className="flex w-full items-baseline gap-6 text-left lg:gap-8"
          >
            <span
              className="shrink-0 font-mono text-sm tabular-nums tracking-[0.04em] transition-colors align-baseline"
              style={{ verticalAlign: "baseline" }}
            >
              {formattedIndex}
            </span>

            <span className="min-w-0 flex-1">
              <h3
                id={titleId}
                style={{
                  fontWeight: 700,
                  letterSpacing: "-0.015em",
                  ...HOVER_TRANSITION,
                }}
                className="font-display text-ink text-[clamp(1.5rem,2.6vw,2.5rem)] leading-tight transition-all [@media(hover:hover)]:group-hover:translate-x-3 group-has-[:focus-visible]:translate-x-3 [@media(hover:hover)]:group-hover:text-[var(--ink)] group-has-[:focus-visible]:text-[var(--ink)]"
              >
                {entry.role}
              </h3>

              <p className="mt-2 mb-4 font-mono text-[15px] tracking-[0.04em] text-ink-dim">
                {meta}
              </p>
            </span>

            <span
              aria-hidden="true"
              className="shrink-0 self-center font-mono text-2xl leading-none text-ink-dim transition-colors [@media(hover:hover)]:group-hover:text-[var(--accent)]"
              style={HOVER_TRANSITION}
            >
              {open ? "×" : "+"}
            </span>
          </button>

          <m.div
            id={panelId}
            role="region"
            aria-labelledby={titleId}
            initial={false}
            animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
            transition={expandTransition}
            inert={!open}
            className="overflow-hidden contain-content"
          >
            <div className="pt-1">
              {entry.summary && (
                <p className="mb-6 max-w-[68ch] text-[18px] leading-relaxed text-ink/85">
                  {entry.summary}
                </p>
              )}

              <ul className="space-y-3">
                {entry.bullets.map(renderBullet)}
              </ul>


              {(entry.stats?.length ?? 0) + entry.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {entry.stats?.map((stat) => (
                    <span
                      key={stat.label}
                      className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-sm tracking-[0.04em] text-accent"
                    >
                      {stat.label}
                    </span>
                  ))}
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-ink/15 bg-ink/[0.03] px-2.5 py-1 font-mono text-sm tracking-[0.04em] text-ink-dim"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </m.div>
        </div>
      </div>
    </m.div>
  );
}