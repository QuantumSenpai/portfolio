"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { footer } from "@/lib/data";
import { useLenis } from "@/components/providers/smooth-scroll-provider";
import {
  EASE,
  SIGNATURE_DURATION,
  SIGNATURE_EASE,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Footer({ hasSignature = false }: { hasSignature?: boolean }) {
  const { lenis } = useLenis();
  const shouldReduceMotion = useReducedMotion();

  const year = new Date().getFullYear();
  const copyright = footer.copyright.replace("{year}", String(year));

  function handleBackToTop() {
    if (lenis) {
      lenis.scrollTo(0, { offset: 0, duration: 1.2 });
      return;
    }
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
    }
  }

  return (
    <footer className="w-full border-t border-ink/15">
      <div className="mx-auto w-full max-w-[1680px] px-6 md:px-10 lg:px-16">
        {/* Link columns */}
        <div className="grid gap-10 py-14 sm:grid-cols-3 sm:gap-8">
          {footer.columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-mono text-sm tracking-[0.04em] text-ink-dim">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-base text-ink transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Signature */}
        <div className="flex justify-center pb-2 md:justify-start">
          <Signature hasSignature={hasSignature} />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-6 py-8 sm:flex-row sm:items-center">
          <p
            suppressHydrationWarning
            className="font-mono text-sm tracking-[0.04em] text-ink-dim"
          >
            {copyright}
          </p>

          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="hidden text-sm tracking-[0.04em] text-ink-dim sm:inline"
            >
              Back to top
            </span>
            <button
              type="button"
              onClick={handleBackToTop}
              aria-label="Back to top"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
            >
              <span aria-hidden="true" className="text-lg leading-none">
                ↑
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * The signature. The text (or the SVG file) is revealed with a soft-edged
 * linear wipe, and an underline flourish draws itself straight after.
 */
function Signature({ hasSignature }: { hasSignature: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const wipe = cn(
    "signature-wipe",
    inView && !shouldReduceMotion && "signature-wipe-run"
  );

  return (
    <div
      ref={ref}
      className="relative flex h-[200px] w-full max-w-[640px] flex-col justify-end overflow-hidden"
    >
      <div
        className={wipe}
        style={{
          "--signature-duration": `${SIGNATURE_DURATION}s`,
          "--signature-ease": `cubic-bezier(${SIGNATURE_EASE.join(",")})`,
        } as React.CSSProperties}
      >
        {hasSignature ? (
          <Image
            src="/signature.svg"
            alt={footer.signatureAlt}
            width={1280}
            height={320}
            unoptimized
            className="h-auto w-full object-contain"
          />
        ) : (
          <span className="block select-none whitespace-nowrap font-signature text-[clamp(4.5rem,12vw,10rem)] leading-[0.85] text-ink/[0.92] -rotate-3">
            {footer.signatureText}
          </span>
        )}
      </div>

      {/* Underline flourish — draws right after the wipe */}
      <svg
        aria-hidden="true"
        viewBox="0 0 420 24"
        fill="none"
        className="mt-1 h-6 w-full max-w-[420px] text-accent"
      >
        <motion.path
          d="M6 15C84 5 168 2 248 8c62 5 116 9 166 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={
            shouldReduceMotion || inView ? { pathLength: 1 } : { pathLength: 0 }
          }
          transition={{
            duration: 1,
            ease: EASE,
            delay: shouldReduceMotion ? 0 : SIGNATURE_DURATION,
          }}
        />
      </svg>
    </div>
  );
}
