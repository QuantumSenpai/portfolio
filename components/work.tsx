"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { projects, filters, type Project, type ProjectCategory } from "@/lib/data";
import { Reveal } from "./ui/reveal";
import { StrokeText } from "./ui/stroke-text";
import { cn } from "@/lib/utils";

export function Work() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const visible = projects.filter((p) => filter === "all" || p.category === filter);

  return (
    <section id="work" className="container py-24 sm:py-32">
      <Reveal>
        <span className="eyebrow">001 — Selected work</span>
        <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Things I&apos;ve
          <br />
          <StrokeText>shipped.</StrokeText>
        </h2>
      </Reveal>

      <LayoutGroup id="work-section">
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  "relative rounded-full border border-line px-4 py-2 font-mono text-xs text-ink-dim transition-colors",
                  filter === f.value && "text-white"
                )}
              >
                {filter === f.value && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{f.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 space-y-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  function handleMouseLeave() {
    setCoords(null);
  }

  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.16 } }}
      transition={{
        layout: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.2 },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative block overflow-hidden rounded-2xl border border-line bg-surface/60 p-6 sm:p-7 transition-colors duration-300 hover:border-line-strong hover:bg-surface hover:shadow-md"
    >
      {coords && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, var(--accent-soft), transparent 75%)`,
            opacity: 0.08,
            mixBlendMode: "screen",
          }}
        />
      )}

      <div className="relative grid grid-cols-[36px_1fr] items-start gap-4 sm:grid-cols-[54px_1fr_auto] sm:items-center sm:gap-6">
        <span className="font-mono text-sm font-semibold text-accent-soft sm:text-base">
          {project.index}
        </span>

        <div>
          <div className="flex items-center gap-3">
            <h3 className="font-display text-xl font-bold tracking-tight text-ink transition-colors group-hover:text-accent sm:text-2xl">
              {project.title}
            </h3>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-dim sm:text-base">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line bg-surface-2 px-3 py-1 font-mono text-[0.68rem] text-ink-dim transition-colors group-hover:border-accent/40 group-hover:text-ink"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <span className="col-span-2 mt-2 inline-flex w-fit items-center gap-1 font-mono text-xs text-ink-dim transition-all group-hover:translate-x-1 group-hover:text-accent sm:col-span-1 sm:mt-0 sm:justify-self-end">
          {project.linkLabel} <span className="text-base leading-none">↗</span>
        </span>
      </div>
    </motion.a>
  );
}