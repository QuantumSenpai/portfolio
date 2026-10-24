"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  m,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  animate,
} from "framer-motion";
import { footer } from "@/lib/data";
import { useLenis } from "@/components/providers/smooth-scroll-provider";
import { EASE, SIGNATURE_DURATION, SIGNATURE_EASE } from "@/lib/motion";

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
      window.scrollTo({
        top: 0,
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
    }
  }

  return (
    <footer className="w-full border-t border-ink/15">
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10 lg:px-16">
        <div className="grid gap-8 pb-16 pt-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-x-16">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 min-[480px]:grid-cols-2 md:grid-cols-3 lg:max-w-2xl lg:gap-x-12">
            {footer.columns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-6 text-sm text-ink-dim">{column.title}</h3>
                <ul>
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}`}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="inline-flex min-h-[44px] items-center py-2 text-base text-ink transition-colors [@media(hover:hover)]:hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex justify-center lg:justify-end">
            <Signature hasSignature={hasSignature} />
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 border-t border-ink/10 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-8 sm:flex-row sm:items-center">
          <p
            suppressHydrationWarning
            className="text-[0.9375rem] text-ink-dim"
          >
            {copyright}
          </p>

          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="hidden text-[0.9375rem] text-ink-dim sm:inline"
            >
              Back to top
            </span>
            <button
              type="button"
              onClick={handleBackToTop}
              aria-label="Back to top"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors [@media(hover:hover)]:hover:border-accent [@media(hover:hover)]:hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
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

function Signature({ hasSignature }: { hasSignature: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const p = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    if (shouldReduceMotion) {
      p.set(100);
    } else {
      animate(p, 100, { duration: SIGNATURE_DURATION, ease: SIGNATURE_EASE });
    }
  }, [inView, p, shouldReduceMotion]);

  const mask = useMotionTemplate`linear-gradient(90deg, #000 0%, #000 calc(${p}%), transparent calc(${p}% + 12%))`;

  return (
    <div
      ref={ref}
      className="relative flex w-full max-w-[640px] flex-col justify-end overflow-visible min-h-[calc(clamp(3rem,14vw,8rem)*1.1)] sm:min-h-[calc(clamp(4rem,9vw,8rem)*1.1)]"
    >
      <m.div
        className="overflow-hidden"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
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
          <span className="block max-w-full select-none p-[0.12em] font-signature text-[clamp(3rem,14vw,8rem)] leading-[1.1] text-ink/[0.92] -rotate-3 sm:text-[clamp(4rem,9vw,8rem)]">
            {footer.signatureText}
          </span>
        )}
      </m.div>

      <svg
        aria-hidden="true"
        viewBox="0 0 420 24"
        fill="none"
        className="mt-1 h-6 w-full max-w-[420px] text-accent"
      >
        <m.path
          d="M6 15C84 5 168 2 248 8c62 5 116 9 166 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1,
            ease: EASE,
            delay: SIGNATURE_DURATION,
          }}
        />
      </svg>
    </div>
  );
}
