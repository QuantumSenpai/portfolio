"use client";

import dynamic from "next/dynamic";
import { githubSection } from "@/lib/data";
import type { GithubActivity } from "@/lib/github";

// Below-the-fold sections are code-split out of the main page chunk. The
// section ids (scroll targets for nav/hero anchors, nav IntersectionObserver
// nodes) live on these stable wrappers so they exist in the server HTML and
// never swap when a lazy chunk resolves. Each fallback reserves min-height
// to keep layout stable while the chunk loads.
const GitHubActivitySection = dynamic(
  () => import("@/components/github-activity").then((m) => m.GitHubActivity),
  { loading: () => <div className="min-h-[760px]" aria-hidden="true" /> }
);

const ReelSection = dynamic(() => import("@/components/reel").then((m) => m.Reel), {
  loading: () => <div className="min-h-[900px]" aria-hidden="true" />,
});

const ContactSection = dynamic(
  () => import("@/components/contact").then((m) => m.Contact),
  { loading: () => <div className="min-h-[720px]" aria-hidden="true" /> }
);

// Honest fallback when the contributions data could not be fetched (missing
// GITHUB_TOKEN or a GitHub API failure). Keeps the section shell, its id and
// the nav anchor alive instead of silently hiding everything. Shell markup is
// identical to the GitHubActivity section header.
function GithubActivityFallback() {
  return (
    <section className="relative w-full py-24 sm:py-32 scroll-mt-[72px]">
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10 lg:px-16">
        <span className="font-mono text-[13px] uppercase tracking-widest text-accent">
          {githubSection.eyebrow}
        </span>

        <div className="mt-4 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <h2
            style={{ fontWeight: 800, letterSpacing: "-0.04em" }}
            className="font-display text-ink text-[length:var(--text-h2)] [text-wrap:balance]"
          >
            {githubSection.heading}
          </h2>
          <a
            href={githubSection.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-base text-ink transition-colors [@media(hover:hover)]:hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
          >
            View on GitHub
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <p className="mt-12 text-base text-ink-dim">
          Contribution graph is unavailable right now.
        </p>
      </div>
    </section>
  );
}

export function BelowFold({
  githubActivity,
  hasSignature,
}: {
  githubActivity: GithubActivity | null;
  hasSignature: boolean;
}) {
  return (
    <>
      {/* The #github wrapper always renders (heatmap when data is available,
          honest fallback when it is not) so the nav anchor never dangles. */}
      <div id="github" className="scroll-mt-[72px]">
        {githubActivity ? (
          <GitHubActivitySection activity={githubActivity} />
        ) : (
          <GithubActivityFallback />
        )}
      </div>
      <div id="reel" className="scroll-mt-[72px]">
        <ReelSection />
      </div>
      <div id="contact" className="scroll-mt-[72px]">
        <ContactSection hasSignature={hasSignature} />
      </div>
    </>
  );
}
