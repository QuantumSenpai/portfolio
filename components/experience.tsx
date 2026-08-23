"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { experiences, type ExperienceItem } from "@/lib/data";
import { Reveal } from "./ui/reveal";
import { StrokeText } from "./ui/stroke-text";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 85%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="container py-24 sm:py-32">
      <Reveal>
        <span className="eyebrow">002 — Experience</span>
        <h2 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Where I&apos;ve <StrokeText>built &amp; worked.</StrokeText>
        </h2>
        <p className="mt-4 max-w-xl text-base text-ink-dim sm:text-lg">
          From ML research engineering in medical diagnostics to leading video post-production
          and motion design pipelines.
        </p>
      </Reveal>

      <div ref={containerRef} className="relative mt-16 pl-6 sm:pl-10">
        <div
          aria-hidden="true"
          className="absolute bottom-6 left-[11px] top-3 w-[2px] bg-line sm:left-[15px]"
        />

        <motion.div
          aria-hidden="true"
          style={{ scaleY }}
          className="absolute bottom-6 left-[11px] top-3 w-[2px] origin-top bg-accent sm:left-[15px]"
        />

        <div className="space-y-16 sm:space-y-20">
          {experiences.map((item, i) => (
            <TimelineEntry key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineEntry({ item, index }: { item: ExperienceItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-6 sm:pl-10"
    >
      <div
        aria-hidden="true"
        className="absolute -left-[18px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-line bg-surface shadow-sm transition-colors sm:-left-[24px] sm:h-8 sm:w-8"
      >
        <div className="h-2.5 w-2.5 rounded-full bg-accent sm:h-3 sm:w-3" />
      </div>

      <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8 transition-shadow duration-300 hover:shadow-md">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h3 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
              {item.role}
            </h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-accent">
              {item.organization} {item.location ? `· ${item.location}` : ""}
            </p>
          </div>
          <span className="inline-flex w-fit items-center rounded-full border border-line bg-surface-2 px-3 py-1 font-mono text-xs font-medium text-ink-dim">
            {item.period}
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-ink-dim sm:text-base">
          {item.summary}
        </p>

        {item.type === "detailed" && (
          <div className="mt-8 space-y-8 border-t border-line pt-6">
            {item.stats && item.stats.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {item.stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-lg font-bold text-ink sm:text-xl">
                      {s.value}
                    </p>
                    <p className="mt-0.5 font-mono text-[0.65rem] text-ink-dim sm:text-xs">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {item.problem && (
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-ink-dim">
                  The Problem
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                  {item.problem}
                </p>
              </div>
            )}

            {item.approach && item.approach.length > 0 && (
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-ink-dim">
                  Key Technical Deliverables
                </h4>
                <div className="mt-3 space-y-3">
                  {item.approach.map((step, idx) => (
                    <div key={idx} className="flex gap-3">
                      <span className="mt-0.5 font-mono text-xs font-bold text-accent">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm leading-relaxed text-ink">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {item.type === "compact" && item.highlights && item.highlights.length > 0 && (
          <div className="mt-6 space-y-2.5 border-t border-line pt-5">
            {item.highlights.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <p className="text-sm leading-relaxed text-ink">{bullet}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-1.5 pt-2">
          {item.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-surface-2 px-3 py-1 font-mono text-[0.7rem] text-ink-dim transition-colors hover:border-line hover:text-ink"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
