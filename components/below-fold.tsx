"use client";

import dynamic from "next/dynamic";
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

export function BelowFold({
  githubActivity,
  hasSignature,
}: {
  githubActivity: GithubActivity | null;
  hasSignature: boolean;
}) {
  return (
    <>
      {githubActivity ? (
        <div id="github" className="scroll-mt-[72px]">
          <GitHubActivitySection activity={githubActivity} />
        </div>
      ) : null}
      <div id="reel" className="scroll-mt-[72px]">
        <ReelSection />
      </div>
      <div id="contact" className="scroll-mt-[72px]">
        <ContactSection hasSignature={hasSignature} />
      </div>
    </>
  );
}
