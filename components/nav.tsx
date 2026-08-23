"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Magnetic } from "./ui/magnetic-button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#reel", label: "Reel" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive("#" + entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 transition-all duration-300 sm:px-8",
          scrolled && "border-b border-line bg-bg/80 py-3.5 backdrop-blur-md"
        )}
      >
        <a href="#top" className="group flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface p-1.5 text-ink shadow-sm transition-transform duration-200 group-hover:scale-105">
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

        <nav className="hidden items-center gap-8 text-sm md:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "relative text-ink-dim transition-colors hover:text-ink",
                active === link.href && "text-ink font-medium"
              )}
            >
              {link.label}
              {active === link.href && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute -bottom-1.5 left-0 h-px w-full bg-accent"
                />
              )}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle theme={resolvedTheme} setTheme={setTheme} mounted={mounted} />
          <Magnetic>
            <a
              href="#contact"
              className="rounded-full border border-line-strong px-4 py-2 text-sm transition-colors hover:border-accent hover:bg-accent/10"
            >
              Let&apos;s talk
            </a>
          </Magnetic>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle theme={resolvedTheme} setTheme={setTheme} mounted={mounted} />
          <button
            aria-label="Toggle navigation menu"
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border border-line-strong"
          >
            <span
              className={cn(
                "h-px w-4 bg-ink transition-transform duration-200",
                open && "translate-y-[3px] rotate-45"
              )}
            />
            <span
              className={cn(
                "h-px w-4 bg-ink transition-transform duration-200",
                open && "-translate-y-[3px] -rotate-45"
              )}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-bg"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-bold text-ink"
              >
                {link.label}
              </a>
            ))}
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
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line-strong transition-colors hover:border-accent"
    >
      {mounted && (
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
          className="text-sm"
        >
          {theme === "dark" ? "☾" : "☀"}
        </motion.span>
      )}
    </button>
  );
}