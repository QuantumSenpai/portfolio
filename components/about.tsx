"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  aboutSection,
  skillGroups,
  services,
  type SkillGroup,
} from "@/lib/data";
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

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
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
          <span className="font-mono text-[13px] uppercase tracking-widest text-accent">
            {aboutSection.eyebrow}
          </span>
          <h2
            style={{ fontWeight: 800, letterSpacing: "-0.04em" }}
            className="mt-4 font-display text-ink text-[length:var(--text-h2)] [text-wrap:balance]"
          >
            {aboutSection.heading}
          </h2>

          <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-x-8 lg:gap-x-12 xl:gap-x-16">
            {/* Left: portrait + name */}
            <div className="max-w-[240px] md:col-span-4 md:max-w-none">
              <Portrait hasPortrait={hasPortrait} />

              {/* Name block — "Krishnendu Adak" + "(Kisu)" */}
              <p
                style={{ fontWeight: 700, letterSpacing: "-0.015em" }}
                className="mt-6 font-display text-[clamp(1.5rem,2.2vw,2.25rem)] leading-tight text-ink"
              >
                {aboutSection.portrait.name}{" "}
                <span className="text-ink-dim">
                  {`(${aboutSection.portrait.nickname})`}
                </span>
              </p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-dim">
                {aboutSection.portrait.role}
              </p>
            </div>

            {/* Right: bio, skills, services */}
            <div className="md:col-span-7 md:col-start-6">
              {/* Bio */}
              <div className="max-w-[60ch] space-y-6">
                {aboutSection.bio.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[clamp(1.0625rem,1.3vw,1.25rem)] leading-[1.7] text-ink-dim"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Education */}
              <p className="mt-6 max-w-[60ch] border-t border-ink/10 pt-6 text-[0.9375rem] leading-relaxed text-ink-dim">
                {aboutSection.education.line}
              </p>

              {/* Skills — bento cards */}
              <motion.div
                variants={groupVariants}
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="bento-grid mt-12"
              >
                {skillGroups.map((group) => (
                  <motion.div
                    key={group.label}
                    variants={cardVariants}
                    className={
                      group.items.length >= 5 ? "bento-wide" : undefined
                    }
                  >
                    <SkillCard group={group} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Services */}
              <div className="mt-12 border-t border-ink/15 pt-8">
                <div className="grid gap-8 sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-3">
                  {services.map((service, i) => (
                    <div key={service.title}>
                      <span className="font-mono text-sm tabular-nums tracking-[0.04em] text-ink-dim">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h4
                        style={{
                          fontWeight: 700,
                          letterSpacing: "-0.015em",
                        }}
                        className="mt-3 font-display text-[1.375rem] leading-tight text-ink sm:text-[1.5rem]"
                      >
                        {service.title}
                      </h4>
                      <p className="mt-2 text-base leading-relaxed text-ink-dim">
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

/**
 * One bento card. The spotlight follows the pointer with motion values, so
 * moving the cursor never triggers a React re-render.
 */
function SkillCard({ group }: { group: SkillGroup }) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);

  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, color-mix(in srgb, var(--accent) 10%, transparent), transparent 70%)`;

  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const labelId = `skill-group-${group.label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}`;

  function track(e: MouseEvent<HTMLDivElement>) {
    const rect = rectRef.current;
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  function handleMouseEnter(e: MouseEvent<HTMLDivElement>) {
    if (isTouch || shouldReduceMotion) return;
    rectRef.current = e.currentTarget.getBoundingClientRect();
    track(e);
  }

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (isTouch || shouldReduceMotion) return;
    track(e);
  }

  function handleMouseLeave() {
    rectRef.current = null;
    mouseX.set(-400);
    mouseY.set(-400);
  }

  function handleFocus() {
    if (isTouch) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(rect.width / 2);
    mouseY.set(rect.height / 2);
  }

  function handleBlur() {
    mouseX.set(-400);
    mouseY.set(-400);
  }

  return (
    <div
      ref={cardRef}
      role="group"
      tabIndex={0}
      aria-labelledby={labelId}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/15 bg-surface/40 p-6 transition-colors duration-700 hover:border-ink/40 focus-visible:border-ink/40 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
    >
      {/* Spotlight that follows the pointer */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
      />

      <h3
        id={labelId}
        style={{ fontWeight: 700, letterSpacing: "-0.015em" }}
        className="relative font-display text-2xl leading-tight text-ink"
      >
        {group.label}
      </h3>

      {group.blurb && (
        <p className="relative mt-2 text-[0.9375rem] leading-relaxed text-ink-dim">
          {group.blurb}
        </p>
      )}

      <ul className="relative mt-5 grid grid-cols-2 gap-x-4 gap-y-2">
        {group.items.map((item) => (
          <li
            key={item.name}
            className="flex items-start gap-2 text-base leading-snug text-ink"
          >
            <span
              aria-hidden="true"
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
            />
            <span className="flex flex-wrap items-baseline gap-x-2">
              {item.name}
              {item.status === "learning" && (
                <span className="font-mono text-[0.875rem] uppercase tracking-wider text-accent">
                  {item.status}
                </span>
              )}
              {item.note && (
                <span className="text-[0.875rem] text-ink-dim">{item.note}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
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
