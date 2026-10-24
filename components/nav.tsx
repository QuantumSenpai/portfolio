"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { email, navCta, navLinks, socials } from "@/lib/data";
import { EASE } from "@/lib/motion";
import { useLenis } from "./providers/smooth-scroll-provider";

export function Nav({ showGithub = true }: { showGithub?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { stop, start } = useLenis();

  const { scrollYProgress } = useScroll();

  // Set initial active from location hash
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (hash && navLinks.some((l) => l.href === hash)) {
      setActive(hash);
    }
  }, []);

  // IntersectionObserver for active section
  useEffect(() => {
    if (shouldReduceMotion) {
      setActive("");
      return;
    }

    const elements = navLinks.map((link) =>
      document.getElementById(link.href.slice(1))
    ).filter(Boolean) as HTMLElement[];

    if (elements.length === 0) {
      setActive("");
      return;
    }

    const intersecting = new Map<string, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) intersecting.set(entry.target.id, entry);
          else intersecting.delete(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    // Initial evaluation: find section whose rect contains the band center
    const bandCenter = typeof window !== "undefined" ? window.innerHeight * 0.425 : 0;
    intersecting.forEach((entry, id) => {
      const rect = entry.boundingClientRect;
      if (rect.top <= bandCenter && rect.bottom >= bandCenter) {
        setActive(`#${id}`);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [shouldReduceMotion]);

  // Scroll-driven scrolled state
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu effect
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

  // Filter out GitHub link if showGithub is false
  const filteredNavLinks = showGithub
    ? navLinks
    : navLinks.filter((link) => link.href !== "#github");

  return (
    <>
      {/* Skip link — first focusable element */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus-rounded-full focus:bg-[color:var(--ink)] focus:px-4 focus:py-2 focus:text-sm focus:text-[color:var(--bg)]"
      >
        Skip to content
      </a>

      {/* Floating bar */}
      <div className="pointer-events-none fixed inset-x-0 top-0 right-0 z-[100]">
        <motion.header
          className={cn(
            "fixed inset-x-0 top-0 z-[100] h-[72px] lg:h-[72px] transition-[background-color,backdrop-filter] duration-300",
            scrolled
              ? "bg-[color-mix(in srgb, var(--bg) 85%, transparent)] backdrop-blur-lg border-t border-[color:var(--ink)]/10"
              : "bg-transparent border-t border-0"
          )}
        >
          <div className="nav-container relative w-full max-w-[1680px] mx-auto h-full flex items-center justify-between px-6 md:px-10 lg:px-16">
            {/* 1. Left: Logo link */}
            <a
              href="#top"
              className="flex min-h-11 items-center gap-1.5 rounded-full pl-1.5"
              onClick={(e) => {
                e.preventDefault();
                if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
              }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-1.5">
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
              <span className="font-display text-base font-bold tracking-tight text-[color:var(--ink)]">
                Kisu
              </span>
            </a>

            {/* 2. Center: Navigation links - ONE row, ALL links (GitHub filtered by showGithub) */}
            <nav>
              <ul className="hidden lg:flex items-center gap-8">
                {filteredNavLinks.map((link, index) => {
                  const isActive = active === link.href;
                  return (
                    <li key={link.href} className="group">
                      <a
                        href={link.href}
                        className={cn(
                          "relative inline-flex items-center gap-2 h-11 px-1 text-[15px] font-medium transition-colors",
                          isActive
                            ? "text-[color:var(--ink)] [@media(hover:hover)]:hover-text-[color:var(--accent)]"
                            : "text-[color:var(--ink-dim)] [@media(hover:hover)]:hover-text-[color:var(--accent)]"
                        )}
                      >
                        <span className="font-mono text-[13px] text-[color:var(--ink-dim)] tracking-[0.04em]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <motion.span
                        layoutId="nav-underline"
                          className="absolute inset-x-0 -bottom-0.5 h-[2px] bg-[color:var(--accent)]"
                        />
                        <span className="relative z-10">{link.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* 3. Right: Theme toggle + CTA */}
            <div className="flex items-center gap-3">
              {/* Theme toggle - uses .dark class on <html>, CSS-only icon visibility */}
              <button
                aria-label="Toggle theme"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    const html = document.documentElement;
                    html.classList.toggle("dark");
                    try {
                      localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
                    } catch {}
                  }
                }}
                className="relative h-10 w-10 rounded-full border border-[color:var(--line)] flex items-center justify-center"
              >
                <span>
                  <span className="hidden dark:block text-[color:var(--ink)]">☀</span>
                  <span className="dark:hidden text-[color:var(--ink)]">☾</span>
                </span>
              </button>

              {/* CTA with ↗ arrow */}
              <a
                href={navCta.href}
                className="inline-flex h-11 items-center gap-2 rounded-full px-5 bg-[color:var(--ink)] text-[color:var(--bg)] text-[15px] font-medium transition-opacity [@media(hover:hover)]:hover:opacity-90"
              >
                Let&apos;s talk ↗
              </a>
            </div>
          </div>
        </motion.header>
      </div>

      {/* Scroll progress line: inside header, absolute bottom */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[color:var(--accent)] transition-none"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Mobile menu overlay */}
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
            className="fixed inset-0 z-[90] flex flex-col overflow-y-auto h-[100dvh] bg-[color:var(--bg)] px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-16 backdrop-blur-lg"
          >
            <div className="flex flex-col h-full">
              {/* Logo + close button */}
              <div className="flex items-center justify-between px-6 py-4">
                <a
                  href="#top"
                  className="flex min-h-11 items-center gap-1.5 rounded-full pl-1.5"
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
                  }}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-1.5">
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
                  <span className="font-display text-base font-bold tracking-tight text-[color:var(--ink)]">Kisu</span>
                </a>

                <button
                  ref={menuButtonRef}
                  aria-label="Close navigation menu"
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                  onClick={() => setOpen(false)}
                  className="relative h-10 w-10 rounded-full border border-[color:var(--line)] flex items-center justify-center"
                >
                  <span className="absolute h-px w-4 bg-[color:var(--ink)] transition-transform duration-200 transform" />
                  <span className="absolute h-px w-4 bg-[color:var(--ink)] transition-transform duration-200 transform" />
                </button>
              </div>

              {/* Links - hidden on desktop, shown on mobile */}
              <ul className="flex-1 overflow-y-auto px-6 pb-8 hidden lg:block">
                {filteredNavLinks.map((link, index) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="flex min-h-11 items-baseline gap-2 py-1 text-[color:var(--ink)] transition-colors [@media(hover:hover)]:hover-text-[color:var(--accent)] font-display text-[clamp(2rem,9vw,3rem)] font-bold leading-none"
                    >
                      <span className="font-mono text-sm text-[color:var(--ink-dim)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* CTA + email/socials */}
              <div className="mt-auto pt-8 border-t border-[color:var(--line)]/20">
                <a
                  href={navCta.href}
                  className="w-full inline-flex h-11 items-center justify-center rounded-full bg-[color:var(--ink)] px-6 text-sm font-medium text-[color:var(--bg)] mb-4"
                >
                  Let&apos;s talk
                </a>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                  <a
                    href={`mailto:${email}`}
                    className="text-[color:var(--ink-dim)] transition-colors [@media(hover:hover)]:hover-text-[color:var(--ink)]"
                  >
                    {email}
                  </a>
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[color:var(--ink-dim)] transition-colors [@media(hover:hover)]:hover-text-[color:var(--ink)]"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
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