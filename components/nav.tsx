"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  type Variants,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { email, navCta, navLinks, socials } from "@/lib/data";
import { EASE } from "@/lib/motion";
import { useLenis } from "./providers/smooth-scroll-provider";

/** No link is highlighted while the page is within this many px of the top. */
const TOP_ACTIVE_THRESHOLD = 120;

export function Nav({ showGithub = true }: { showGithub?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { stop, start } = useLenis();
  const activeCandidateRef = useRef("");

  const { scrollYProgress } = useScroll();

  // Resolve the visible candidate against the top-of-page rule.
  const syncActive = useCallback(() => {
    setActive(
      window.scrollY < TOP_ACTIVE_THRESHOLD ? "" : activeCandidateRef.current
    );
  }, []);

  // Initial active from location hash (respects the top-of-page rule).
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && navLinks.some((l) => l.href === hash)) {
      activeCandidateRef.current = hash;
      syncActive();
    }
  }, [syncActive]);

  // IntersectionObserver picks the active section while scrolling.
  useEffect(() => {
    const elements = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        // First nav link (in order) whose section is inside the band wins.
        const next = navLinks.find((link) =>
          visible.has(link.href.slice(1))
        );
        activeCandidateRef.current = next ? next.href : "";
        syncActive();
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [syncActive]);

  // Scrolled surface + top-of-page active gate (rAF-throttled).
  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        setScrolled(window.scrollY > 8);
        syncActive();
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [syncActive]);

  // Mobile menu open/close lifecycle.
  useEffect(() => {
    if (open) {
      stop();
    } else {
      start();
      if (menuButtonRef.current) {
        menuButtonRef.current.focus();
      }
    }
  }, [open, stop, start]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function close() {
      setOpen(false);
    }
    window.addEventListener("hashchange", close);
    window.addEventListener("popstate", close);
    return () => {
      window.removeEventListener("hashchange", close);
      window.removeEventListener("popstate", close);
    };
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

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  function toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle("dark");
    try {
      localStorage.setItem(
        "theme",
        html.classList.contains("dark") ? "dark" : "light"
      );
    } catch {}
  }

  // Filter out GitHub link if showGithub is false.
  const filteredNavLinks = showGithub
    ? navLinks
    : navLinks.filter((link) => link.href !== "#github");

  return (
    <>
      {/* Skip link — first focusable element */}
      <a
        href="#main"
        className="nav-cta sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:px-4"
      >
        Skip to content
      </a>

      {/* Bar */}
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] h-[72px] transition-[background-color,backdrop-filter] duration-300",
          scrolled && "backdrop-blur-lg"
        )}
        style={
          scrolled
            ? {
                background: "color-mix(in srgb, var(--bg) 85%, transparent)",
                borderBottom:
                  "1px solid color-mix(in srgb, var(--ink) 10%, transparent)",
              }
            : undefined
        }
      >
        <div className="relative mx-auto flex h-full w-full max-w-[1680px] items-center justify-between px-6 md:px-10 lg:px-16">
          {/* 1. Left: logo */}
          <a
            href="#top"
            className="flex min-h-11 items-center gap-1.5 rounded-full pl-1.5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface p-1.5">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                className="h-full w-full fill-current"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M22 18C22 14.6863 24.6863 12 28 12H34C37.3137 12 40 14.6863 40 18V82C40 85.3137 37.3137 88 34 88H28C24.6863 88 22 85.3137 22 82V18Z" />
                <path d="M47.5 45.2L74.8 17.9C76.8 15.9 80 17.3 80 20.1V34C80 35.6 79.2 37.1 77.9 38L62 50L77.9 62C79.2 62.9 80 64.4 80 66V79.9C80 82.7 76.8 84.1 74.8 82.1L47.5 54.8C44.8 52.1 44.8 47.9 47.5 45.2Z" />
              </svg>
            </span>
            <span className="font-display text-base font-bold tracking-tight text-ink">
              Kisu
            </span>
          </a>

          {/* 2. Center: links (desktop only, GitHub filtered by showGithub) */}
          <nav aria-label="Primary">
            <ul className="hidden items-center gap-[28px] lg:flex">
              {filteredNavLinks.map((link, index) => {
                const isActive = active === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="nav-link"
                      aria-current={isActive ? "location" : undefined}
                    >
                      <span className="idx">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId={
                            shouldReduceMotion ? undefined : "nav-underline"
                          }
                          className="nav-underline"
                        />
                      )}
                      <span>{link.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* 3. Right: menu button (mobile), theme toggle, CTA */}
          <div className="flex items-center gap-3">
            <button
              ref={menuButtonRef}
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink lg:hidden"
            >
              <span className="flex flex-col gap-1.5" aria-hidden="true">
                <span className="block h-px w-4 bg-ink" />
                <span className="block h-px w-4 bg-ink" />
              </span>
            </button>

            <button
              type="button"
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink"
            >
              <span className="hidden dark:block" aria-hidden="true">
                ☀
              </span>
              <span className="dark:hidden" aria-hidden="true">
                ☾
              </span>
            </button>

            <a href={navCta.href} className="nav-cta">
              Let&apos;s talk <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Scroll progress line (header bottom edge) */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left bg-accent"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </motion.header>

      {/* Mobile overlay — unmounted when closed */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuPanelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            variants={menuItemVariants}
            transition={{ duration: 0.2, ease: EASE }}
            style={{ background: "var(--bg)" }}
            className="fixed inset-0 z-[90] flex h-[100dvh] flex-col overflow-y-auto px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-24 backdrop-blur-lg"
          >
            <ul className="flex-1 overflow-y-auto px-6 pb-8">
              {filteredNavLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex min-h-11 items-baseline gap-2 py-1 font-display text-[clamp(2rem,9vw,3rem)] font-bold leading-none"
                  >
                    <span className="font-mono text-sm text-ink-dim">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-auto border-t border-line/20 pt-8">
              <a href={navCta.href} className="nav-cta mb-4 w-full justify-center">
                Let&apos;s talk <span aria-hidden="true">↗</span>
              </a>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <a href={`mailto:${email}`} className="nav-dim">
                  {email}
                </a>
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-dim"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const menuItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.15, ease: EASE },
  },
};
