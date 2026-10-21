"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { reelSection, videos, type ReelVideo } from "@/lib/data";
import { EASE, DURATION, STAGGER } from "@/lib/motion";

/**
 * Shared hover transition.
 * Duration + easing come from lib/motion.ts so every section animates the same.
 */
const HOVER_TRANSITION = {
  transitionDuration: `${DURATION.base}s`,
  transitionTimingFunction: `cubic-bezier(${EASE.join(", ")})`,
};

export function Reel() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
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

  // A video without an id is hidden.
  const items = videos.filter((video) => video.id && video.id.trim() !== "");

  return (
    <section id="reel" data-tone="invert" className="relative w-full py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1680px] px-6 md:px-10 lg:px-16">
        {/* Section heading */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, ease: EASE }}
          viewport={{ once: true, margin: "-60px" }}
          className="mb-14 sm:mb-20"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            {reelSection.eyebrow}
          </span>
          <h2
            style={{ fontWeight: 800, letterSpacing: "-0.04em" }}
            className="mt-4 font-display text-ink text-[length:var(--text-h2)] [text-wrap:balance]"
          >
            {reelSection.heading}
          </h2>
          {reelSection.description && (
            <p className="mt-4 max-w-xl text-base text-ink-dim sm:text-lg">
              {reelSection.description}
            </p>
          )}
        </motion.div>

        {/* Videos */}
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          {items.map((video) => (
            <motion.div key={video.id} variants={cardVariants}>
              <VideoCard video={video} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * YouTube facade — the thumbnail is a real button. No iframe is mounted
 * until the user activates it (click, Enter or Space).
 */
function VideoCard({ video }: { video: ReelVideo }) {
  const [playing, setPlaying] = useState(false);

  const thumbnail = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;

  return (
    <div>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-ink/15 bg-surface">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play: ${video.title}`}
            className="group/play absolute inset-0 flex h-full w-full items-center justify-center focus-visible:outline-2 focus-visible:outline-accent focus-visible:-outline-offset-2"
          >
            <Image
              src={thumbnail}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover transition-transform group-hover/play:scale-[1.03] group-focus-visible/play:scale-[1.03]"
              style={HOVER_TRANSITION}
            />

            {/* Circular play button */}
            <span
              aria-hidden="true"
              className="pointer-events-none relative flex h-16 w-16 items-center justify-center rounded-full bg-ink/90 text-bg transition-transform group-hover/play:scale-[1.08] group-focus-visible/play:scale-[1.08] group-focus-visible/play:ring-2 group-focus-visible/play:ring-accent"
              style={HOVER_TRANSITION}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 translate-x-[1px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.8-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
              </svg>
            </span>
          </button>
        )}
      </div>

      <p className="mt-4 text-sm text-ink-dim">
        <span className="text-ink">{video.title}</span>
        {video.caption ? ` — ${video.caption}` : null}
      </p>
    </div>
  );
}
