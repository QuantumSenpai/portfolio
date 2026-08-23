"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Magnetic } from "./ui/magnetic";
import { cn } from "@/lib/utils";

const links = [
  { href: "#work", label: "Work" },
  { href: "#research", label: "Research" },
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

  const logoSrc =
    mounted && resolvedTheme === "dark" ? "/logo-mark-dark.png" : "/logo-mark-light.png";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 transition-all duration-300 sm:px-8",
          scrolled && "border-b border-line bg-bg/80 py-3.5 backdrop-blur-md"
        )}
      >
        <a href="#top" className="flex items-center gap-2.5">
          <Image src={logoSrc} alt="Kisu" width={28} height={28} priority className="rounded-md" />
          <span className="font-display text-lg">Kisu</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm md:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "relative text-ink-dim transition-colors hover:text-ink",
                active === link.href && "text-ink"
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
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col gap-[5px] p-2"
          >
            <span
              className={cn(
                "h-px w-5 bg-ink transition-transform duration-300",
                open && "translate-y-[3px] rotate-45"
              )}
            />
            <span
              className={cn(
                "h-px w-5 bg-ink transition-transform duration-300",
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
                className="font-display text-3xl text-ink"
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