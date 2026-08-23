"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skillGroups } from "@/lib/data";
import { Reveal } from "./ui/reveal";
import { StrokeText } from "./ui/stroke-text";

export function Skills() {
  return (
    <section id="skills" className="container py-24 sm:py-32">
      <Reveal>
        <span className="eyebrow">004 — Toolkit</span>
        <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          What I
          <br />
          <StrokeText>work with.</StrokeText>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-12 sm:grid-cols-3 sm:gap-8">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.title} delay={gi * 0.08}>
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent">
              {group.title}
            </h3>
            <div className="mt-6 space-y-4">
              {group.skills.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="grid grid-cols-[100px_1fr] items-center gap-3 text-sm">
      <span className="text-ink-dim">{name}</span>
      <div className="h-[3px] overflow-hidden rounded-full bg-line">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-accent"
        />
      </div>
    </div>
  );
}