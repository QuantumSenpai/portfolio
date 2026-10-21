"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { footer } from "@/lib/data";
import { useLenis } from "@/components/providers/smooth-scroll-provider";
import { EASE, DURATION } from "@/lib/motion";

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
    <footer className="relative w-full border-t border-ink/15">
      {/* Compact row — copyright + back to top */}
      <div className="mx-auto w-full max-w-[1680px] px-6 md:px-10 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-4 py-8 sm:flex-row sm:items-center">
          <p
            suppressHydrationWarning
            className="font-mono text-sm tracking-[0.04em] text-ink-dim"
          >
            {copyright}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-ink-dim transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
            >
              Privacy Policy
            </Link>
            <button
              type="button"
              onClick={handleBackToTop}
              className="font-mono text-sm tracking-[0.04em] text-ink-dim transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>

      {/* Signature watermark — clipped so the bottom is cropped by the viewport edge */}
      <div className="overflow-hidden">
        <div className="mx-auto w-full max-w-[1680px] px-6 md:px-10 lg:px-16">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.base, ease: EASE }}
            viewport={{ once: true, margin: "-60px" }}
          >
            {hasSignature ? (
              <Image
                src="/signature.svg"
                alt={footer.signatureAlt}
                width={1600}
                height={220}
                unoptimized
                className="h-auto w-full max-h-[220px] object-contain opacity-[0.08] transition-opacity duration-700 hover:opacity-[0.14]"
              />
            ) : (
              <p className="select-none whitespace-nowrap text-center font-display text-[clamp(6rem,24vw,22rem)] font-bold leading-[0.8] tracking-[-0.06em] text-ink/[0.08] transition-colors duration-700 hover:text-accent/[0.14]">
                {footer.signatureText}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
