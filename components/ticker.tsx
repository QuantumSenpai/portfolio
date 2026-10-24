"use client";

import { useEffect, useRef } from "react";
import { skillGroups } from "@/lib/data";

export function Ticker() {
  const items = skillGroups.flatMap((group) => group.items.map((item) => item.name));
  const trackRef = useRef<HTMLDivElement>(null);

  // Pause the infinite marquee whenever it scrolls off-screen, so it does
  // zero compositor work while out of view. Resumes from where it paused.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        track.style.animationPlayState = entry.isIntersecting
          ? "running"
          : "paused";
      },
      { rootMargin: "80px" }
    );
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-hidden border-y border-line py-4" aria-hidden>
      <div
        ref={trackRef}
        className="flex w-max animate-marquee gap-6 whitespace-nowrap font-mono text-sm text-ink-dim"
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-6">
            <span>{item}</span>
            <span className="text-accent">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
