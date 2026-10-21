"use client";

import { useEffect, useRef } from "react";

export function SwissGridBackground() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId: number = 0;
    let targetX = -1000;
    let targetY = -1000;

    function onPointerMove(e: PointerEvent) {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (glowRef.current) {
            // Constant radius (260px radius = 520px diameter), moves with transform only, never resize
            glowRef.current.style.transform = `translate3d(${targetX - 260}px, ${targetY - 260}px, 0)`;
            glowRef.current.style.opacity = "0.25";
          }
          rafId = 0;
        });
      }
    }

    function onPointerLeave() {
      if (glowRef.current) {
        glowRef.current.style.opacity = "0";
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
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Faint, even pattern across whole hero (opacity ~0.05) smoothly fading toward all edges with no visible rectangles */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--ink) 1px, transparent 1px),
            linear-gradient(to bottom, var(--ink) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 95%)",
        }}
      />

      {/* Subtle cursor glow: constant 260px radius, moves with transform only, never resizes */}
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[520px] w-[520px] rounded-full transition-opacity duration-500 ease-out"
        style={{
          opacity: 0,
          transform: "translate3d(-1000px, -1000px, 0)",
          backgroundImage: `
            linear-gradient(to right, var(--accent) 1px, transparent 1px),
            linear-gradient(to bottom, var(--accent) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: `
            radial-gradient(
              circle at 50% 50%,
              rgba(0, 0, 0, 0.4) 0%,
              rgba(0, 0, 0, 0.15) 45%,
              transparent 80%
            )
          `,
          WebkitMaskImage: `
            radial-gradient(
              circle at 50% 50%,
              rgba(0, 0, 0, 0.4) 0%,
              rgba(0, 0, 0, 0.15) 45%,
              transparent 80%
            )
          `,
        }}
      />
    </div>
  );
}
