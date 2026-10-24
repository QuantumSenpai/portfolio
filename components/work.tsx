"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  projects,
  reposSection,
  workSection,
  type Project,
} from "@/lib/data";
import { EASE, DURATION, STAGGER } from "@/lib/motion";
import { useLenis } from "@/components/providers/smooth-scroll-provider";
import { cn } from "@/lib/utils";

export function Work() {
  const lenis = useLenis();
  const shouldReduceMotion = useReducedMotion();


  const featuredProjects = projects.filter((project) => project.featured);


  const [activeSlug, setActiveSlug] = useState<string>(
    featuredProjects[0]?.slug ?? ""
  );
  const [hoveredRowSlug, setHoveredRowSlug] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

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
      className="relative w-full py-24 sm:py-32 scroll-mt-[72px]"
    >
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10 lg:px-16">

        <div className="mb-14 sm:mb-20">
          <span className="font-mono text-[13px] uppercase tracking-widest text-accent">
            {workSection.eyebrow}
          </span>
          <h2
            style={{ fontWeight: 800, letterSpacing: "-0.04em" }}
            className="mt-4 font-display text-ink text-[length:var(--text-h2)] [text-wrap:balance]"
          >
            {workSection.heading}
          </h2>
        </div>


        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 items-start">

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

                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -mx-4 rounded-lg bg-ink/[0.04] opacity-0 px-4 transition-opacity duration-[0.7s] ease-[cubic-bezier(0.16,1,0.3,1)] [@media(hover:hover)]:group-hover:opacity-100 group-focus-visible:opacity-100"
                      />


                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-[0.7s] ease-[cubic-bezier(0.16,1,0.3,1)] [@media(hover:hover)]:group-hover:scale-x-100 group-focus-visible:scale-x-100"
                      />


                      <div className="flex items-baseline gap-6 lg:gap-8 min-w-0 pr-6 relative z-10">
                        <span className="font-mono text-sm tabular-nums tracking-[0.04em] text-ink-dim shrink-0">
                          {formattedIndex}
                        </span>
                        <div className="flex flex-col min-w-0">
                          <h3
                            style={{
                              fontWeight: 700,
                              letterSpacing: "-0.015em",
                            }}
                            className="font-display text-ink text-[length:var(--text-h2)] leading-tight truncate transition-all duration-[0.7s] ease-[cubic-bezier(0.16,1,0.3,1)] [@media(hover:hover)]:group-hover:translate-x-3 group-focus-visible:translate-x-3 [@media(hover:hover)]:group-hover:text-accent group-focus-visible:text-accent"
                          >
                            {project.title}
                          </h3>
                          <p className="mt-1.5 text-sm text-ink-dim truncate font-normal tracking-normal">
                            {project.role}
                          </p>
                        </div>
                      </div>


                      <div className="flex items-center gap-6 shrink-0 font-mono text-sm tracking-[0.04em] text-ink-dim pl-6 relative z-10">
                        <span className="tabular-nums">{project.year}</span>
                        <span
                          aria-hidden="true"
                          className="inline-block text-lg leading-none transition-all duration-[0.7s] ease-[cubic-bezier(0.16,1,0.3,1)] transform rotate-45 [@media(hover:hover)]:group-hover:rotate-0 group-focus-visible:rotate-0 text-ink-dim [@media(hover:hover)]:group-hover:text-accent group-focus-visible:text-accent"
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


            <div className="mt-4 flex items-center justify-between px-1 font-mono text-sm tracking-[0.04em] text-ink-dim">
              <div className="flex items-center gap-4">
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-ink transition-colors [@media(hover:hover)]:hover:text-accent"
                  >
                    Live ↗
                  </a>
                )}
                {activeProject.repoUrl && (
                  <a
                    href={activeProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-ink-dim transition-colors [@media(hover:hover)]:hover:text-accent"
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
                      className="inline-flex items-center gap-1 font-medium text-ink transition-colors [@media(hover:hover)]:hover:text-accent"
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


        <div className="mt-20 sm:mt-28 border-t border-ink/15 pt-10 sm:pt-14">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-baseline">
            <span className="font-mono text-[13px] uppercase tracking-widest text-accent">
              {reposSection.eyebrow}
            </span>
            <span className="block font-mono text-[13px] uppercase tracking-widest text-ink-dim">
              {reposSection.heading}
            </span>
          </div>

          <div className="divide-y divide-ink/10 border-y border-ink/10 font-mono text-sm tracking-[0.04em]">
            {reposSection.repos.map((repo) => (
              <a
                key={repo.url}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between gap-6 py-4 [&>span]:text-ink-dim [&>span]:text-[15px] truncate [&>span]:line-clamp-1 border-b border-ink/10"
              >
                <span
                  className="pointer-events-none absolute inset-0 -mx-4 rounded-lg bg-ink/[0.04] opacity-0 transition-opacity duration-200 [@media(hover:hover)]:group-hover:opacity-100 group-focus-visible:opacity-100"
                />

                <span className="relative z-10 min-w-0">
                  <span className="block truncate font-mono text-[16px] font-medium text-ink">
                    {repo.name}
                  </span>
                  {repo.description && (
                    <span className="mt-0.5 block truncate text-[15px] text-ink-dim">
                      {repo.description}
                    </span>
                  )}
                </span>

                <div className="relative z-10 flex shrink-0 items-center gap-6 font-mono text-[14px] tracking-[0.04em] text-ink-dim">
                  {typeof repo.stars === "number" && (
                    <span className="tabular-nums">★ {repo.stars}</span>
                  )}
                  {repo.language && <span>{repo.language}</span>}
                  <span
                    className="relative group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:text-accent transition-transform duration-200"
                  >
                    ↗
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {reposSection.repos.length > 6 && (
          <div>
            <motion.div
              id="more-repos"
              initial={false}
              animate={{
                height: showAll ? "auto" : 0,
                opacity: showAll ? 1 : 0,
              }}
              transition={{ duration: DURATION.base, ease: EASE }}
              inert={!showAll}
              className="overflow-hidden"
            >
              {reposSection.repos.slice(6).map((repo) => (
                <a
                  key={repo.url}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between gap-6 py-4 [&>span]:text-ink-dim [&>span]:text-[15px] truncate [&>span]:line-clamp-1 border-b border-ink/10"
                >
                  <span
                    className="pointer-events-none absolute inset-0 -mx-4 rounded-lg bg-ink/[0.04] opacity-0 transition-opacity duration-200 [@media(hover:hover)]:group-hover:opacity-100 group-focus-visible:opacity-100"
                  />

                  <span className="relative z-10 min-w-0">
                    <span className="block truncate font-mono text-[16px] font-medium text-ink">
                      {repo.name}
                    </span>
                    {repo.description && (
                      <span className="mt-0.5 block truncate text-[15px] text-ink-dim">
                        {repo.description}
                      </span>
                    )}
                  </span>

                  <div className="relative z-10 flex shrink-0 items-center gap-6 font-mono text-[14px] tracking-[0.04em] text-ink-dim">
                    {typeof repo.stars === "number" && (
                      <span className="tabular-nums">★ {repo.stars}</span>
                    )}
                    {repo.language && <span>{repo.language}</span>}
                    <span
                      className="relative group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:text-accent transition-transform duration-200"
                    >
                      ↗
                    </span>
                  </div>
                </a>
              ))}
            </motion.div>

            <button
              type="button"
              aria-expanded={showAll}
              aria-controls="more-repos"
              onClick={() => setShowAll((value) => !value)}
              className="mt-6 inline-flex min-h-11 items-center font-mono text-sm tracking-[0.04em] text-ink-dim transition-colors [@media(hover:hover)]:hover:text-accent focus-visible:outline-accent"
            >
              {showAll ? "Show less" : `Show more (${reposSection.repos.length - 6})`}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

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


  return (
    <div className="relative h-full w-full overflow-hidden bg-surface select-none">

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 120% at 85% 15%, color-mix(in srgb, var(--accent) 12%, var(--surface)), var(--surface))`,
        }}
      />


      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(to right, var(--ink) 1px, transparent 1px), linear-gradient(to bottom, var(--ink) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />


      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-3 -right-2 font-display text-8xl lg:text-9xl font-bold tracking-tighter text-ink/[0.12] tabular-nums"
      >
        {formattedIndex}
      </span>


      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-1 pointer-events-none">
        <span className="font-mono text-sm font-semibold text-ink tracking-tight line-clamp-1">
          {project.title}
        </span>
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-sm tracking-[0.04em] text-ink-dim">
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

      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line">
        <ProjectMediaView project={project} index={index} />
      </div>


      <div className="mt-5 flex items-baseline justify-between font-mono text-sm tracking-[0.04em] text-ink-dim">
        <span className="tabular-nums font-semibold text-accent">
          {formattedIndex}
        </span>
        <span className="tabular-nums">{project.year}</span>
      </div>


      <h3
        style={{ fontWeight: 700, letterSpacing: "-0.015em" }}
        className="mt-2 font-display text-ink text-[clamp(1.75rem,5vw,2.25rem)] leading-tight"
      >
        {project.title}
      </h3>


      <p className="mt-1.5 text-sm text-ink-dim font-normal">
        {project.role}
      </p>


      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-line bg-surface-2/60 px-3 py-1 font-mono text-sm tracking-[0.04em] text-ink-dim"
          >
            {tag}
          </span>
        ))}
      </div>


      <div className="mt-6 flex items-center gap-4 border-t border-ink/10 pt-4 font-mono text-sm tracking-[0.04em]">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1 font-semibold text-accent [@media(hover:hover)]:hover:underline focus-visible:outline-accent"
          >
            Live ↗
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-ink-dim transition-colors [@media(hover:hover)]:hover:text-ink focus-visible:outline-accent"
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
            className="inline-flex min-h-11 items-center gap-1 font-semibold text-accent [@media(hover:hover)]:hover:underline focus-visible:outline-accent"
          >
            Case study ↗
          </a>
        )}
      </div>
    </div>
  );
}
