"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  LazyMotion,
  domMax,
  m,
  useReducedMotion,
  useScroll,
  type Variants,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { email, navCta, navLinks, socials } from "@/lib/data";
import { EASE, STAGGER } from "@/lib/motion";
import { useLenis } from "./providers/smooth-scroll-provider";

/** No link is highlighted while the page is within this many px of the top. */
const TOP_ACTIVE_THRESHOLD = 120;

export function Nav({ showGithub = true }: { showGithub?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { stop, start, scrollTo } = useLenis();
  const activeCandidateRef = useRef("");
  const activeRef = useRef("");
  const scrolledRef = useRef(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  // Close menu WITH focus restore (for X button, Escape, backdrop, resize, hashchange)
  const closeMenu = useCallback(() => {
    setOpen(false);
    start();
    menuButtonRef.current?.focus();
  }, [start]);

  // Close menu WITHOUT focus restore (for link/CTA taps — avoids jump)
  const closeMenuNoFocus = useCallback(() => {
    setOpen(false);
    start();
  }, [start]);

  // Toggle function for the menu button
  const toggleMenu = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  // Scroll to hash after menu closes (one rAF so lenis.start() has taken effect)
  const scrollToHash = useCallback(
    (hash: string) => {
      requestAnimationFrame(() => {
        scrollTo(hash, { offset: -72, duration: 1.2 });
      });
    },
    [scrollTo]
  );

  // Handle link click in mobile menu
  const handleMobileLinkClick = useCallback(
    (href: string) => {
      closeMenuNoFocus();
      scrollToHash(href);
    },
    [closeMenuNoFocus, scrollToHash]
  );

  const { scrollYProgress } = useScroll();

  // Resolve the visible candidate against the top-of-page rule.
  // setState fires only when the resolved value actually changes — never per scroll event.
  const syncActive = useCallback(() => {
    const next =
      window.scrollY < TOP_ACTIVE_THRESHOLD ? "" : activeCandidateRef.current;
    if (next === activeRef.current) return;
    activeRef.current = next;
    setActive(next);
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
        const isScrolled = window.scrollY > 8;
        if (isScrolled !== scrolledRef.current) {
          scrolledRef.current = isScrolled;
          setScrolled(isScrolled);
        }
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
      menuButtonRef.current?.focus();
    }
  }, [open, stop, start]);

  // Unmount cleanup: ensure scroll is re-enabled if component unmounts while open
  useEffect(() => {
    return () => {
      start();
    };
  }, [start]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, closeMenu]);

  useEffect(() => {
    if (!open) return;
    window.addEventListener("hashchange", closeMenu);
    window.addEventListener("popstate", closeMenu);
    return () => {
      window.removeEventListener("hashchange", closeMenu);
      window.removeEventListener("popstate", closeMenu);
    };
  }, [open, closeMenu]);

  // Close on resize to desktop breakpoint
  useEffect(() => {
    if (!open) return;
    function handleResize() {
      if (window.innerWidth >= 1024) closeMenu();
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open, closeMenu]);

  useEffect(() => {
    if (!open) return;
    const panel = menuPanelRef.current;
    if (!panel) return;

    // Focus the overlay container (not the first link) so focus is visible but no jump
    panel.focus();

    function focusables() {
      const element = menuPanelRef.current;
      if (!element) return [];
      return Array.from(
        element.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
    }

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
    <LazyMotion features={domMax}>
      {/* Skip link — first focusable element */}
      <a
        href="#main"
        className="nav-cta sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:px-4"
      >
        Skip to content
      </a>

      {/* Bar */}
      <m.header
        className={cn(
          "nav-header fixed inset-x-0 top-0 z-[100]",
          "h-[72px] lg:h-[72px]",
          "lg:!h-[72px]",
          "[&.is-scrolled]:backdrop-blur-[8px]",
          open && !scrolled && "bg-[var(--bg)] border-b border-[var(--line)]",
          scrolled && "is-scrolled"
        )}
        style={{
          height: "64px",
          paddingTop: "env(safe-area-inset-top, 0px)",
        }}
      >
        <div className="relative mx-auto flex h-full w-full max-w-[1680px] items-center justify-between px-6 md:px-10 lg:px-16">
          {/* 1. Left: logo */}
          <a
            href="#top"
            className="flex min-h-11 items-center gap-1.5 rounded-full pl-1.5 lg:pl-1.5"
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
          <nav aria-label="Primary" className="hidden lg:flex">
            <ul className="items-center gap-[28px]">
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
                        <m.span
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

          {/* 3. Right: group (theme toggle + menu button) on mobile; theme + CTA on desktop */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Theme toggle - visible on all sizes */}
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

            {/* Mobile menu button - rightmost on mobile, hidden on desktop */}
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={toggleMenu}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink lg:hidden"
            >
              {open ? (
                <span className="flex flex-col gap-1.5" aria-hidden="true">
                  <span className="block h-px w-5 bg-ink rotate-45 translate-y-[5px]" />
                  <span className="block h-px w-5 bg-ink -rotate-45 -translate-y-[5px]" />
                </span>
              ) : (
                <span className="flex flex-col gap-1.5" aria-hidden="true">
                  <span className="block h-px w-4 bg-ink" />
                  <span className="block h-px w-4 bg-ink" />
                </span>
              )}
            </button>

            {/* Desktop CTA - hidden on mobile */}
            <a href={navCta.href} className="nav-cta hidden lg:inline-flex">
              Let&apos;s talk <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Scroll progress line (header bottom edge) */}
          <m.div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left bg-accent"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </m.header>

      {/* Mobile overlay — unmounted when closed */}
      <AnimatePresence>
        {open && (
          <m.div
            ref={menuPanelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            tabIndex={-1}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            variants={menuContainerVariants}
            transition={{ duration: 0.2, ease: EASE }}
            style={{
              background: "var(--bg)",
              overscrollBehavior: "contain",
              paddingTop: "calc(64px + env(safe-area-inset-top, 0px) + 16px)",
              paddingBottom: "calc(24px + env(safe-area-inset-bottom, 0px))",
            }}
            className="fixed inset-0 z-[90] flex h-[100dvh] flex-col overflow-y-auto px-6"
            data-lenis-prevent
            onClick={(e) => {
              if (e.target === e.currentTarget) closeMenu();
            }}
            key="mobile-menu"
          >
            <ul className="flex-1 overflow-y-auto space-y-0" role="list">
              {filteredNavLinks.map((link, index) => {
                const isActive = active === link.href;
                return (
                  <li key={link.href} className="relative">
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleMobileLinkClick(link.href);
                      }}
                      className={cn(
                        "flex min-h-[64px] items-baseline gap-4 px-2 py-4 border-b border-[var(--line)]",
                        isActive && "text-[var(--accent)]"
                      )}
                      style={{
                        fontSize: "clamp(2rem, 9vw, 2.75rem)",
                        lineHeight: 1.1,
                        fontWeight: 700,
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      <span className="font-mono text-[13px] text-[var(--ink-dim)] shrink-0">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{link.label}</span>
                    </a>
                    {/* Stagger animation for each link */}
                    <m.span
                      custom={index}
                      variants={menuItemVariants}
                      className="absolute inset-0 pointer-events-none"
                    />
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto border-t border-[var(--line)] pt-6 pb-4">
              {/* Single CTA button */}
              <a
                href={navCta.href}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleMobileLinkClick(navCta.href);
                }}
                className="nav-cta w-full justify-center"
                style={{ height: "52px" }}
              >
                Let&apos;s talk <span aria-hidden="true">↗</span>
              </a>

              {/* Email + socials row */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[14px]">
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
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}

const menuContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER,
    },
  },
};

const menuItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.15, ease: EASE },
  },
};
