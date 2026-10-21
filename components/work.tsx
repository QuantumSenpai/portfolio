"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { projects, otherRepos, workSection, type Project } from "@/lib/data";
import { EASE, DURATION, STAGGER } from "@/lib/motion";
import { useLenis } from "@/components/providers/smooth-scroll-provider";
import { cn } from "@/lib/utils";

export function Work() {
  const lenis = useLenis();
  const shouldReduceMotion = useReducedMotion();

  // Sort projects by order, featured only in main list
  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);
  const featuredProjects = sortedProjects.filter((p) => p.featured);

  // Active project for sticky preview panel (default = row 1)
  const [activeSlug, setActiveSlug] = useState<string>(
    featuredProjects[0]?.slug ?? ""
  );
  const [hoveredRowSlug, setHoveredRowSlug] = useState<string | null>(null);

  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleRowHover = (slug: string) => {
    setHoveredRowSlug(slug);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setActiveSlug(slug);
    }, 60);
  };

  const handleRowLeave = () => {
    setHoveredRowSlug(null);
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const handleRowFocus = (slug: string) => {
    setHoveredRowSlug(slug);
    setActiveSlug(slug);
  };

  const activeProject =
    featuredProjects.find((p) => p.slug === activeSlug) || featuredProjects[0];

  const activeIndex =
    featuredProjects.findIndex((p) => p.slug === activeProject.slug) + 1;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: STAGGER,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATION.base,
        ease: EASE,
      },
    },
  };

  return (
    <section
      id="work"
      data-tone="invert"
      className="relative w-full py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[1680px] px-6 md:px-10 lg:px-16">
        {/* Section Heading */}
        <div className="mb-14 sm:mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            {workSection.eyebrow}
          </span>
          <h2
            style={{ fontWeight: 800, letterSpacing: "-0.04em" }}
            className="mt-4 font-display text-ink text-[length:var(--text-h2)] [text-wrap:balance]"
          >
            {workSection.heading}
          </h2>
        </div>

        {/* Desktop View: Two Columns (Left = Rows, Right = Sticky Panel) */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 items-start">
          {/* Left Column (cols 1-8): Project rows */}
          <div className="lg:col-span-8">
            <motion.div
              variants={containerVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="border-t border-ink/15"
            >
              {featuredProjects.map((project, idx) => {
                const targetUrl =
                  project.liveUrl ||
                  project.repoUrl ||
                  project.caseStudyHref ||
                  "#";
                const isAnchor = targetUrl.startsWith("#");
                const formattedIndex = String(idx + 1).padStart(2, "0");

                return (
                  <motion.div variants={rowVariants} key={project.slug}>
                    <a
                      href={targetUrl}
                      target={isAnchor ? undefined : "_blank"}
                      rel={isAnchor ? undefined : "noopener noreferrer"}
                      onClick={(e) => {
                        if (isAnchor) {
                          e.preventDefault();
                          const targetEl = document.querySelector(targetUrl);
                          if (targetEl) {
                            if (lenis?.scrollTo) {
                              lenis.scrollTo(targetUrl);
                            } else {
                              targetEl.scrollIntoView({ behavior: "smooth" });
                            }
                          }
                        }
                      }}
                      onMouseEnter={() => handleRowHover(project.slug)}
                      onMouseLeave={handleRowLeave}
                      onFocus={() => handleRowFocus(project.slug)}
                      onBlur={handleRowLeave}
                      className={cn(
                        "group relative flex min-h-[120px] w-full items-center justify-between border-b border-ink/15 py-7 xl:py-8 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4",
                        hoveredRowSlug && hoveredRowSlug !== project.slug
                          ? "opacity-55"
                          : "opacity-100",
                        "transition-opacity duration-[0.7s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      )}
                    >
                      {/* Row background tint via absolute layer (ink at 4%) */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -mx-4 rounded-lg bg-ink/[0.04] opacity-0 px-4 transition-opacity duration-[0.7s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-focus-visible:opacity-100"
                      />

                      {/* 1px accent underline scales scaleX 0 -> 1 from left */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-[0.7s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                      />

                      {/* Left: Index + Title (translateX 12px & accent on hover) + Role */}
                      <div className="flex items-baseline gap-6 lg:gap-8 min-w-0 pr-6 relative z-10">
                        <span className="font-mono text-xs tabular-nums text-ink-dim shrink-0">
                          {formattedIndex}
                        </span>
                        <div className="flex flex-col min-w-0">
                          <h3
                            style={{
                              fontWeight: 700,
                              letterSpacing: "-0.015em",
                            }}
                            className="font-display text-ink text-[length:var(--text-h2)] leading-tight truncate transition-all duration-[0.7s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-focus-visible:translate-x-3 group-hover:text-accent group-focus-visible:text-accent"
                          >
                            {project.title}
                          </h3>
                          <p className="mt-1.5 text-sm text-ink-dim truncate font-normal tracking-normal">
                            {project.role}
                          </p>
                        </div>
                      </div>

                      {/* Right: Year + Arrow (rotates 45deg -> 0deg and fills accent) */}
                      <div className="flex items-center gap-6 shrink-0 font-mono text-xs text-ink-dim pl-6 relative z-10">
                        <span className="tabular-nums">{project.year}</span>
                        <span
                          aria-hidden="true"
                          className="inline-block text-lg leading-none transition-all duration-[0.7s] ease-[cubic-bezier(0.16,1,0.3,1)] transform rotate-45 group-hover:rotate-0 group-focus-visible:rotate-0 text-ink-dim group-hover:text-accent group-focus-visible:text-accent"
                        >
                          ↗
                        </span>
                      </div>
                    </a>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column (cols 9-12): ONE sticky preview panel */}
          <div className="lg:col-span-4 sticky top-[112px]">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-ink/15 bg-surface shadow-md">
              <AnimatePresence mode="sync">
                <motion.div
                  key={activeProject.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    transition: { duration: DURATION.base, ease: EASE },
                  }}
                  transition={{ duration: DURATION.base, ease: EASE }}
                  className="absolute inset-0 h-full w-full"
                >
                  <ProjectMediaView
                    project={activeProject}
                    index={activeIndex}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Under the panel: small mono line with Live / Repo links */}
            <div className="mt-4 flex items-center justify-between px-1 font-mono text-xs text-ink-dim">
              <div className="flex items-center gap-4">
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-ink transition-colors hover:text-accent"
                  >
                    Live ↗
                  </a>
                )}
                {activeProject.repoUrl && (
                  <a
                    href={activeProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-ink-dim transition-colors hover:text-accent"
                  >
                    Repo ↗
                  </a>
                )}
                {activeProject.caseStudyHref &&
                  !activeProject.liveUrl &&
                  !activeProject.repoUrl && (
                    <a
                      href={activeProject.caseStudyHref}
                      onClick={(e) => {
                        e.preventDefault();
                        if (lenis?.scrollTo) {
                          lenis.scrollTo(activeProject.caseStudyHref!);
                        } else {
                          document
                            .querySelector(activeProject.caseStudyHref!)
                            ?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="inline-flex items-center gap-1 font-medium text-ink transition-colors hover:text-accent"
                    >
                      Case study ↗
                    </a>
                  )}
              </div>
              <span className="tabular-nums text-ink-dim/70">
                {activeProject.year}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile / Touch View (<1024px or pointer: coarse): Stacked cards */}
        <div className="flex flex-col gap-8 lg:hidden">
          <motion.div
            variants={containerVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="flex flex-col gap-8"
          >
            {featuredProjects.map((project, idx) => (
              <MobileProjectCard
                key={project.slug}
                project={project}
                index={idx + 1}
              />
            ))}
          </motion.div>
        </div>

        {/* All Repositories Section */}
        <div className="mt-20 sm:mt-28 border-t border-ink/15 pt-10 sm:pt-14">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-baseline">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-dim">
              {workSection.allReposLabel}
            </span>
            <a
              href={workSection.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-xs text-ink-dim transition-colors hover:text-accent focus-visible:outline-accent"
            >
              <span>View all on GitHub</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </div>

          <div className="divide-y divide-ink/10 border-y border-ink/10 font-mono text-xs">
            {otherRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-4 text-ink-dim transition-colors hover:text-ink focus-visible:outline-accent"
              >
                <span className="font-medium text-ink transition-colors group-hover:text-accent">
                  {repo.name}
                </span>
                <div className="flex items-center gap-6">
                  <span className="text-ink-dim">{repo.language}</span>
                  <span className="text-sm leading-none transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent">
                    ↗
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Shared image-or-placeholder component for both desktop panel and mobile cards
 */
function ProjectMediaView({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const formattedIndex = String(index).padStart(2, "0");

  if (project.image) {
    return (
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  // Designed Placeholder: surface gradient, faint grid pattern, large index number, bottom-left caption
  return (
    <div className="relative h-full w-full overflow-hidden bg-surface select-none">
      {/* Surface gradient built from the accent at 8-14% opacity */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 120% at 85% 15%, color-mix(in srgb, var(--accent) 12%, var(--surface)), var(--surface))`,
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

      {/* Large index number in Cabinet Grotesk at ink 12% opacity */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-3 -right-2 font-display text-8xl lg:text-9xl font-bold tracking-tighter text-ink/[0.12] tabular-nums"
      >
        {formattedIndex}
      </span>

      {/* Bottom-left caption: title + tags in mono 12px */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-1 pointer-events-none">
        <span className="font-mono text-xs font-semibold text-ink tracking-tight line-clamp-1">
          {project.title}
        </span>
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-ink-dim">
          {project.tags.slice(0, 3).map((tag, i) => (
            <span key={tag} className="flex items-center gap-1.5">
              <span>{tag}</span>
              {i < project.tags.slice(0, 3).length - 1 && (
                <span className="opacity-40">/</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const lenis = useLenis();
  const formattedIndex = String(index).padStart(2, "0");

  return (
    <div className="flex flex-col rounded-2xl border border-ink/15 bg-surface/30 p-5 sm:p-6 transition-colors">
      {/* Image area (16/10) using the same image-or-placeholder component */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line">
        <ProjectMediaView project={project} index={index} />
      </div>

      {/* Meta: Index + Year */}
      <div className="mt-5 flex items-baseline justify-between font-mono text-xs text-ink-dim">
        <span className="tabular-nums font-semibold text-accent">
          {formattedIndex}
        </span>
        <span className="tabular-nums">{project.year}</span>
      </div>

      {/* Title */}
      <h3
        style={{ fontWeight: 700, letterSpacing: "-0.015em" }}
        className="mt-2 font-display text-ink text-[clamp(1.75rem,5vw,2.25rem)] leading-tight"
      >
        {project.title}
      </h3>

      {/* Role */}
      <p className="mt-1.5 text-sm text-ink-dim font-normal">
        {project.role}
      </p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-line bg-surface-2/60 px-3 py-1 font-mono text-[11px] text-ink-dim"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="mt-6 flex items-center gap-4 border-t border-ink/10 pt-4 font-mono text-xs">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-accent hover:underline focus-visible:outline-accent"
          >
            Live ↗
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-ink-dim transition-colors hover:text-ink focus-visible:outline-accent"
          >
            GitHub ↗
          </a>
        )}
        {project.caseStudyHref && !project.liveUrl && !project.repoUrl && (
          <a
            href={project.caseStudyHref}
            onClick={(e) => {
              e.preventDefault();
              if (lenis?.scrollTo) {
                lenis.scrollTo(project.caseStudyHref!);
              } else {
                document
                  .querySelector(project.caseStudyHref!)
                  ?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="inline-flex items-center gap-1 font-semibold text-accent hover:underline focus-visible:outline-accent"
          >
            Case study ↗
          </a>
        )}
      </div>
    </div>
  );
}