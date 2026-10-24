"use client";

import type { ReactNode } from "react";
import { LazyMotion, domAnimation } from "framer-motion";

/**
 * Loads the framer-motion feature bundle exactly once (animation, exit,
 * inView, hover/tap/focus) so every `m.*` component in the tree can use it
 * without shipping the full `motion` engine. Layout projection (`layoutId`)
 * is NOT included here — the nav opts in with its own nested
 * `<LazyMotion features={domMax}>`.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
