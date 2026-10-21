import type { Metadata } from "next";
import Link from "next/link";
import { email, privacy } from "@/lib/data";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What this site collects, what it does not, and how to ask for anything to be corrected or deleted.",
};

export default function PrivacyPage() {
  return (
    <>
      <main className="relative w-full py-24 sm:py-32">
        <div className="mx-auto w-full max-w-[1680px] px-6 md:px-10 lg:px-16">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-sm tracking-[0.04em] text-ink-dim transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
          >
            <span aria-hidden="true">←</span>
            <span>Back</span>
          </Link>

          <span className="mt-8 block font-mono text-[13px] uppercase tracking-widest text-accent">
            Legal
          </span>

          <h1
            style={{ fontWeight: 800, letterSpacing: "-0.04em" }}
            className="mt-4 font-display text-ink text-[length:var(--text-h2)] [text-wrap:balance]"
          >
            Privacy Policy
          </h1>

          <p className="mt-3 font-mono text-sm tracking-[0.04em] text-ink-dim">
            Last updated: {privacy.updated}
          </p>

          <div className="mt-14 max-w-[70ch] space-y-12">
            {privacy.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-mono text-[13px] uppercase tracking-widest text-accent">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-relaxed text-ink-dim"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-14 max-w-[70ch] font-mono text-sm tracking-[0.04em] text-ink-dim">
            <a
              href={`mailto:${email}`}
              className="underline underline-offset-4 transition-colors hover:text-accent focus-visible:text-accent"
            >
              {email}
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
