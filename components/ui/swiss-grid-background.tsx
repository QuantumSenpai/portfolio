"use client";

import { useEffect, useRef } from "react";

export function SwissGridBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let rafId: number;
    let targetX = -1000;
    let targetY = -1000;

    function onPointerMove(e: PointerEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (containerRef.current) {
            containerRef.current.style.setProperty("--mouse-x", `${targetX}px`);
            containerRef.current.style.setProperty("--mouse-y", `${targetY}px`);
            containerRef.current.style.setProperty("--glow-opacity", "1");
          }
          rafId = 0;
        });
      }
    }

    function onPointerLeave() {
      if (containerRef.current) {
        containerRef.current.style.setProperty("--glow-opacity", "0");
      }
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onPointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={
        {
          "--mouse-x": "-1000px",
          "--mouse-y": "-1000px",
          "--glow-opacity": "0",
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0 opacity-[0.45] dark:opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--line) 1px, transparent 1px),
            linear-gradient(to bottom, var(--line) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className="absolute inset-0 transition-opacity duration-300 ease-out"
        style={{
          opacity: "var(--glow-opacity)",
          backgroundImage: `
            linear-gradient(to right, var(--accent) 1px, transparent 1px),
            linear-gradient(to bottom, var(--accent) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: `
            radial-gradient(
              300px circle at var(--mouse-x) var(--mouse-y),
              rgba(0, 0, 0, 0.58) 0%,
              rgba(0, 0, 0, 0.32) 28%,
              rgba(0, 0, 0, 0.12) 58%,
              transparent 95%
            )
          `,
          WebkitMaskImage: `
            radial-gradient(
              300px circle at var(--mouse-x) var(--mouse-y),
              rgba(0, 0, 0, 0.58) 0%,
              rgba(0, 0, 0, 0.32) 28%,
              rgba(0, 0, 0, 0.12) 58%,
              transparent 95%
            )
          `,
        }}
      />
    </div>
  );
}
