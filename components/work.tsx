"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { projects, filters, type ProjectCategory } from "@/lib/data";
import { Reveal } from "./ui/reveal";
import { cn } from "@/lib/utils";

export function Work() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const visible = projects.filter((p) => filter === "all" || p.category === filter);

  return (
    <section id="work" className="container py-24 sm:py-32">
      <Reveal>
        <span className="eyebrow">001 — Selected work</span>
        <h2 className="mt-4 text-4xl sm:text-5xl">
          Things I&apos;ve
          <br />
          shipped.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <LayoutGroup>
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
        </LayoutGroup>
      </Reveal>

      <div className="mt-6">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="group grid grid-cols-[40px_1fr] items-center gap-4 border-b border-line py-6 transition-[padding] duration-300 hover:pl-3 sm:grid-cols-[60px_1fr_auto] sm:gap-6"
            >
              <span className="font-mono text-sm text-accent-soft">{project.index}</span>

              <div>
                <h3 className="text-xl transition-colors group-hover:text-accent sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-1.5 max-w-xl text-sm text-ink-dim">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.65rem] text-ink-dim"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <span className="col-span-2 mt-2 text-sm text-ink-dim underline-offset-4 transition-colors group-hover:text-accent group-hover:underline sm:col-span-1 sm:mt-0 sm:justify-self-end">
                {project.linkLabel} ↗
              </span>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}