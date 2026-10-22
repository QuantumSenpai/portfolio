"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { Magnetic } from "./ui/magnetic-button";
import { useLenis } from "./providers/smooth-scroll-provider";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/data";
import { EASE, DURATION } from "@/lib/motion";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const lenis = useLenis();

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);
  const wasAtHero = useRef(true);
  const scrolledRef = useRef(false);
  const heroHeightRef = useRef(0);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const targetActiveRef = useRef<string>("");
  const [pillHolder, setPillHolder] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (active) {
      setPillHolder(active);
      wasAtHero.current = false;
    } else {
      wasAtHero.current = true;
      const timer = setTimeout(() => {
        setPillHolder("");
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [active]);

  useEffect(() => {
    function onScroll() {
      const isScrolled = window.scrollY > 8;
      if (isScrolled !== scrolledRef.current) {
        scrolledRef.current = isScrolled;
        setScrolled(isScrolled);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function updateHeroHeight() {
      const heroEl = document.getElementById("top");
      heroHeightRef.current = heroEl ? heroEl.offsetHeight : window.innerHeight;
    }
    updateHeroHeight();
    window.addEventListener("resize", updateHeroHeight, { passive: true });

    const sectionIds = ["work", "experience", "about", "reel", "contact"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const intersectingMap = new Map<string, IntersectionObserverEntry>();

    function evaluateActive() {
      const threshold =
        heroHeightRef.current > 0
          ? heroHeightRef.current * 0.5
          : window.innerHeight * 0.5;

      if (window.scrollY < threshold) {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
          debounceTimerRef.current = null;
        }
        if (targetActiveRef.current !== "") {
          targetActiveRef.current = "";
          setActive("");
        }
        return;
      }

      if (intersectingMap.size === 0) {
        return;
      }

      const lineY = window.innerHeight * 0.475;
      let closestId: string | null = null;
      let minDistance = Infinity;

      intersectingMap.forEach((entry, id) => {
        const rect = entry.boundingClientRect;
        let dist: number;
        if (lineY >= rect.top && lineY <= rect.bottom) {
          const center = (rect.top + rect.bottom) / 2;
          dist = Math.abs(center - lineY) * 0.001;
        } else if (lineY < rect.top) {
          dist = rect.top - lineY;
        } else {
          dist = lineY - rect.bottom;
        }

        if (dist < minDistance) {
          minDistance = dist;
          closestId = "#" + id;
        }
      });

      if (closestId && closestId !== targetActiveRef.current) {
        targetActiveRef.current = closestId;
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        debounceTimerRef.current = setTimeout(() => {
          setActive(closestId!);
        }, 80);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingMap.set(entry.target.id, entry);
          } else {
            intersectingMap.delete(entry.target.id);
          }
        });
        evaluateActive();
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    function onWindowScroll() {
      const threshold =
        heroHeightRef.current > 0
          ? heroHeightRef.current * 0.5
          : window.innerHeight * 0.5;
      if (window.scrollY < threshold) {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
          debounceTimerRef.current = null;
        }
        if (targetActiveRef.current !== "") {
          targetActiveRef.current = "";
          setActive("");
        }
      }
    }

    window.addEventListener("scroll", onWindowScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeroHeight);
      window.removeEventListener("scroll", onWindowScroll);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (open) {
      lenis.stop();
      wasOpenRef.current = true;
    } else {
      lenis.start();
      if (wasOpenRef.current) {
        menuButtonRef.current?.focus();
        wasOpenRef.current = false;
      }
    }
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = menuPanelRef.current;
    if (!panel) return;

    function focusables() {
      const element = menuPanelRef.current;
      if (!element) return [];
      return Array.from(
        element.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
    }

    focusables()[0]?.focus();

    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const list = focusables();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    panel.addEventListener("keydown", handleTab);
    return () => panel.removeEventListener("keydown", handleTab);
  }, [open]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-accent pointer-events-none"
        style={{ scaleX: scrollYProgress, transformOrigin: "0 0" }}
      />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-bg/92 transition-[backdrop-filter] duration-300",
          scrolled ? "backdrop-blur-md" : "backdrop-blur-none"
        )}
      >
        <div className="mx-auto flex w-full max-w-[1680px] items-center justify-between px-5 py-5 md:px-10 lg:px-16">
          <a href="#top" className="group flex min-h-11 items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface p-1.5 text-ink shadow-sm transition-colors duration-200 [@media(hover:hover)]:group-hover:border-accent">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                className="h-full w-full fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 18C22 14.6863 24.6863 12 28 12H34C37.3137 12 40 14.6863 40 18V82C40 85.3137 37.3137 88 34 88H28C24.6863 88 22 85.3137 22 82V18Z" />
                <path d="M47.5 45.2L74.8 17.9C76.8 15.9 80 17.3 80 20.1V34C80 35.6 79.2 37.1 77.9 38L62 50L77.9 62C79.2 62.9 80 64.4 80 66V79.9C80 82.7 76.8 84.1 74.8 82.1L47.5 54.8C44.8 52.1 44.8 47.9 47.5 45.2Z" />
              </svg>
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-ink">Kisu</span>
          </a>

          <nav className="hidden items-center gap-1 text-sm md:flex" aria-label="Primary">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative inline-flex min-h-11 items-center rounded-full px-3.5 text-sm font-medium transition-colors"
                >
                  <span
                    className={cn(
                      "relative z-10 transition-colors duration-200",
                      isActive ? "text-[var(--bg)] font-semibold" : "text-ink-dim [@media(hover:hover)]:hover:text-ink"
                    )}
                  >
                    {link.label}
                  </span>
                  <div
                    className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-200 ease-out"
                    style={{ opacity: active ? 1 : 0 }}
                  >
                    {pillHolder === link.href && (
                      <motion.span
                        layoutId="nav-active-pill"
                        initial={
                          shouldReduceMotion
                            ? false
                            : wasAtHero.current
                            ? { opacity: 0 }
                            : false
                        }
                        animate={{ opacity: 1 }}
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : {
                                type: "spring",
                                stiffness: 380,
                                damping: 32,
                              }
                        }
                        className="absolute inset-0 rounded-full bg-[var(--ink)]"
                      />
                    )}
                  </div>
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle theme={resolvedTheme} setTheme={setTheme} mounted={mounted} />
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-4 text-sm transition-colors [@media(hover:hover)]:hover:border-accent [@media(hover:hover)]:hover:bg-accent/10"
              >
                Let&apos;s talk
              </a>
            </Magnetic>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle theme={resolvedTheme} setTheme={setTheme} mounted={mounted} />
            <button
              ref={menuButtonRef}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(!open)}
              className="flex h-11 w-11 min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1.5 rounded-full border border-line-strong transition-colors [@media(hover:hover)]:hover:border-accent"
            >
              <span
                className={cn(
                  "h-px w-4 bg-ink transition-transform duration-200",
                  open && "translate-y-[3.5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-px w-4 bg-ink transition-transform duration-200",
                  open && "-translate-y-[3.5px] -rotate-45"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuPanelRef}
            id="mobile-menu"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: DURATION.fast, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 overflow-y-auto bg-bg px-5 pb-[env(safe-area-inset-bottom)] pt-24"
          >
            <nav
              className="flex flex-col items-center gap-4"
              aria-label="Mobile"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-11 items-center font-display text-3xl font-bold text-ink transition-colors [@media(hover:hover)]:hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <ThemeToggle
                theme={resolvedTheme}
                setTheme={setTheme}
                mounted={mounted}
              />
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-5 text-sm text-ink transition-colors [@media(hover:hover)]:hover:border-accent [@media(hover:hover)]:hover:bg-accent/10"
              >
                Let&apos;s talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ThemeToggle({
  theme,
  setTheme,
  mounted,
}: {
  theme?: string;
  setTheme: (t: string) => void;
  mounted: boolean;
}) {
  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-line-strong transition-colors [@media(hover:hover)]:hover:border-accent"
    >
      {mounted && (
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: DURATION.fast, ease: EASE }}
          className="text-sm"
        >
          {theme === "dark" ? "☾" : "☀"}
        </motion.span>
      )}
    </button>
  );
}
