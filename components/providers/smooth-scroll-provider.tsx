"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import Lenis from "lenis";

import { LENIS_CONFIG } from "@/lib/motion";

interface LenisContextValue {
  lenis: Lenis | null;
  start: () => void;
  stop: () => void;
  scrollTo: (
    target: number | string | HTMLElement,
    options?: { offset?: number; duration?: number; immediate?: boolean }
  ) => void;
}

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  start: () => {},
  stop: () => {},
  scrollTo: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {


    if (typeof window === "undefined") return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || isReducedMotion) {
      return;
    }


    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }


    const instance = new Lenis({
      ...LENIS_CONFIG,
    });

    lenisRef.current = instance;
    setLenis(instance);


    function handleClick(e: MouseEvent) {
      const targetAnchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!targetAnchor) return;

      const href = targetAnchor.getAttribute("href");
      if (!href) return;

      if (href === "#" || href === "#top") {
        e.preventDefault();
        instance.scrollTo(0, { offset: 0, duration: 1.2 });
        if (history.pushState) {
          history.pushState(null, "", href);
        }
        return;
      }

      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        instance.scrollTo(targetEl as HTMLElement, { offset: -72, duration: 1.2 });
        if (history.pushState) {
          history.pushState(null, "", href);
        }
      }
    }

    document.addEventListener("click", handleClick, { passive: false });

    return () => {
      document.removeEventListener("click", handleClick);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
    document.documentElement.classList.remove("overflow-hidden");
  }, []);

  const stop = useCallback(() => {
    lenisRef.current?.stop();
    document.documentElement.classList.add("overflow-hidden");
  }, []);

  const scrollTo = useCallback(
    (
      target: number | string | HTMLElement,
      options?: { offset?: number; duration?: number; immediate?: boolean }
    ) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, {
          offset: options?.offset ?? -72,
          duration: options?.duration ?? 1.2,
          ...options,
        });
      } else if (typeof target === "string" && target.startsWith("#")) {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return (
    <LenisContext.Provider value={{ lenis, start, stop, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}
