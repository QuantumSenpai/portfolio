"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

const GRID_SIZE = "60px 60px";
const GRID_IMAGE = `
  linear-gradient(to right, var(--ink) 1px, transparent 1px),
  linear-gradient(to bottom, var(--ink) 1px, transparent 1px)
`;
/** Radius of the cursor glow and of the mask that reveals the brighter grid. */
const CURSOR_RADIUS = 360;
/** Maximum opacity of the soft cursor glow. */
const GLOW_MAX_OPACITY = 0.07;
/** Opacity of the brighter grid copy that follows the cursor. */
const CURSOR_GRID_OPACITY = 0.1;

const SPRING = { stiffness: 120, damping: 24, mass: 0.6 };

/**
 * Hero-only swiss grid. It is rendered inside the hero section, so the rest of
 * the page keeps a clean, flat background.
 */
export function SwissGridBackground() {
  const shouldReduceMotion = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(-1000);
  const pointerY = useMotionValue(-1000);

  // The cursor position is springy, so the grid and the glow trail slightly.
  const x = useSpring(pointerX, SPRING);
  const y = useSpring(pointerY, SPRING);

  const glowOpacity = useMotionValue(0);

  // The brighter grid copy is revealed around the cursor through this mask.
  const cursorMask = useMotionTemplate`radial-gradient(${CURSOR_RADIUS}px circle at ${x}px ${y}px, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.55) 42%, rgba(0, 0, 0, 0) 72%)`;
  const glowBackground = useMotionTemplate`radial-gradient(${CURSOR_RADIUS}px circle at ${x}px ${y}px, var(--accent) 0%, transparent 68%)`;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // No pointer effect on touch devices or when motion is reduced.
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (shouldReduceMotion) return;

    let bounds = host.getBoundingClientRect();
    let inView = true;
    let pageVisible = !document.hidden;

    const refreshBounds = () => {
      bounds = host.getBoundingClientRect();
    };

    const hide = () => {
      glowOpacity.set(0);
      pointerX.set(-1000);
      pointerY.set(-1000);
    };

    const onPointerMove = (event: PointerEvent) => {
      // Pause while the hero is off-screen or the tab is in the background.
      if (!inView || !pageVisible) return;
      pointerX.set(event.clientX - bounds.left);
      pointerY.set(event.clientY - bounds.top);
      glowOpacity.set(GLOW_MAX_OPACITY);
    };

    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      if (!pageVisible) hide();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (!inView) hide();
      },
      { threshold: 0 }
    );

    refreshBounds();
    observer.observe(host);
    window.addEventListener("scroll", refreshBounds, { passive: true });
    window.addEventListener("resize", refreshBounds, { passive: true });
    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", hide);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", refreshBounds);
      window.removeEventListener("resize", refreshBounds);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", hide);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [shouldReduceMotion, pointerX, pointerY, glowOpacity]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ contain: "strict" }}
    >
      {/* Base grid — very low contrast, fading out before the bottom of the hero */}
      <div
        className="absolute inset-0"
        style={{
          opacity: "var(--grid-line-opacity)",
          backgroundImage: GRID_IMAGE,
          backgroundSize: GRID_SIZE,
          maskImage:
            "radial-gradient(ellipse 120% 85% at 50% 28%, rgba(0, 0, 0, 1) 22%, rgba(0, 0, 0, 0) 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 120% 85% at 50% 28%, rgba(0, 0, 0, 1) 22%, rgba(0, 0, 0, 0) 78%)",
        }}
      />

      {/* Soft cursor glow */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: glowOpacity, background: glowBackground }}
      />

      {/* Brighter copy of the grid, revealed around the cursor */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: CURSOR_GRID_OPACITY,
          backgroundImage: GRID_IMAGE,
          backgroundSize: GRID_SIZE,
          maskImage: cursorMask,
          WebkitMaskImage: cursorMask,
        }}
      />
    </div>
  );
}
