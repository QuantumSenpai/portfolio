"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { m, useReducedMotion, type Variants } from "framer-motion";
import { reelSection, videos, type ReelVideo } from "@/lib/data";
import { EASE, DURATION, STAGGER } from "@/lib/motion";

const HOVER_TRANSITION = {
  transitionDuration: `${DURATION.base}s`,
  transitionTimingFunction: `cubic-bezier(${EASE.join(", ")})`,
};

const PLAY_PILL =
  "pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 font-mono text-sm tracking-[0.04em] text-bg opacity-0 transition-opacity group-hover/play:opacity-100 group-focus-visible/play:opacity-100 [@media(pointer:coarse)]:opacity-100";

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


  const playable = videos.filter((video) => video.id && video.id.trim() !== "");
  const edits = playable.filter((video) => video.kind !== "short");
  const shorts = playable.filter((video) => video.kind === "short");

  return (
    <section className="relative w-full py-24 sm:py-32 scroll-mt-[72px]">
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10 lg:px-16">

        <m.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, ease: EASE }}
          viewport={{ once: true, margin: "-60px" }}
        >
          <span className="font-mono text-[13px] uppercase tracking-widest text-accent">
            {reelSection.eyebrow}
          </span>
          <h2
            style={{ fontWeight: 800, letterSpacing: "-0.04em" }}
            className="mt-4 font-display text-ink text-[length:var(--text-h2)] [text-wrap:balance]"
          >
            {reelSection.heading}
          </h2>
          {reelSection.description && (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-dim sm:text-lg">
              {reelSection.description}
            </p>
          )}
          {reelSection.channelUrl && (
            <a
              href={reelSection.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 font-mono text-sm tracking-[0.04em] text-ink-dim transition-colors [@media(hover:hover)]:hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
            >
              <span>YouTube</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </m.div>


        {edits.length > 0 && (
          <m.div
            variants={containerVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3"
          >
            {edits.map((video) => (
              <m.div key={video.id} variants={cardVariants}>
                <EditCard video={video} />
              </m.div>
            ))}
          </m.div>
        )}


        {shorts.length > 0 && <ShortsRail shorts={shorts} />}
      </div>
    </section>
  );
}

function EditCard({ video }: { video: ReelVideo }) {
  const [playing, setPlaying] = useState(false);

  const thumbnail = video.thumb ?? `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;

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
            <span className={PLAY_PILL} style={HOVER_TRANSITION}>
              <span aria-hidden="true" className="text-sm leading-none">
                ▶
              </span>
              Play
            </span>
          </button>
        )}
      </div>

      <h3
        style={{ fontWeight: 700, letterSpacing: "-0.015em" }}
        className="mt-4 font-display text-xl leading-tight text-ink"
      >
        {video.title}
      </h3>
      {video.caption && (
        <p className="mt-1 text-sm text-ink-dim">{video.caption}</p>
      )}
    </div>
  );
}

function ShortsRail({ shorts }: { shorts: ReelVideo[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const lastCanPrevRef = useRef(false);
  const lastCanNextRef = useRef(false);

  useEffect(() => {
    setIsFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    // rAF-throttled: at most one layout read (scrollWidth/clientWidth) per frame.
    let ticking = false;
    function update() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const element = railRef.current;
        if (!element) return;
        const max = element.scrollWidth - element.clientWidth;
        const nextCanPrev = element.scrollLeft > 4;
        const nextCanNext = element.scrollLeft < max - 4;
        if (nextCanPrev !== lastCanPrevRef.current) {
          lastCanPrevRef.current = nextCanPrev;
          setCanPrev(nextCanPrev);
        }
        if (nextCanNext !== lastCanNextRef.current) {
          lastCanNextRef.current = nextCanNext;
          setCanNext(nextCanNext);
        }
      });
    }

    update();
    rail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      rail.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function scrollByCard(direction: -1 | 1) {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-short-card]");
    const amount = card ? card.offsetWidth + 16 : 240;
    rail.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <div className="mt-14">
      <div className="flex items-center justify-between gap-6">
        <h3
          style={{ fontWeight: 700, letterSpacing: "-0.015em" }}
          className="font-display text-2xl leading-tight text-ink"
        >
          Shorts
        </h3>

        {isFinePointer && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              aria-label="Previous short"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors [@media(hover:hover)]:hover:border-accent [@media(hover:hover)]:hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 disabled:opacity-40 disabled:[@media(hover:hover)]:hover:border-ink/20 disabled:[@media(hover:hover)]:hover:text-ink"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              aria-label="Next short"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors [@media(hover:hover)]:hover:border-accent [@media(hover:hover)]:hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 disabled:opacity-40 disabled:[@media(hover:hover)]:hover:border-ink/20 disabled:[@media(hover:hover)]:hover:text-ink"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </div>

      <div
        ref={railRef}
        data-lenis-prevent
        className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {shorts.map((short) => (
          <div
            key={short.id}
            data-short-card
            className="w-[clamp(200px,22vw,280px)] shrink-0 snap-start"
          >
            <ShortCard video={short} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ShortCard({ video }: { video: ReelVideo }) {
  const [playing, setPlaying] = useState(false);

  const thumbnail =
    video.thumb ?? `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;

  return (
    <div>
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl border border-ink/15 bg-surface">
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
              sizes="(min-width: 1024px) 22vw, 200px"
              className="scale-[1.4] object-cover"
            />
            <span className={PLAY_PILL} style={HOVER_TRANSITION}>
              <span aria-hidden="true" className="text-sm leading-none">
                ▶
              </span>
              Play
            </span>
          </button>
        )}
      </div>

      <h4
        style={{ fontWeight: 700, letterSpacing: "-0.015em" }}
        className="mt-3 font-display text-base leading-tight text-ink"
      >
        {video.title}
      </h4>
      {video.caption && (
        <p className="mt-1 text-sm text-ink-dim">{video.caption}</p>
      )}
    </div>
  );
}
