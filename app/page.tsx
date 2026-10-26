import { statSync } from "node:fs";
import { getGithubActivity } from "@/lib/github";
import { join } from "node:path";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Ticker } from "@/components/ticker";
import { Work } from "@/components/work";
import { Experience } from "@/components/experience";
import { About } from "@/components/about";
import { BelowFold } from "@/components/below-fold";

function portraitIsLoadable() {
  try {
    return statSync(join(process.cwd(), "public", "profile.jpg")).size > 0;
  } catch {
    return false;
  }
}

function signatureExists() {
  try {
    return statSync(join(process.cwd(), "public", "signature.svg")).size > 0;
  } catch {
    return false;
  }
}

export default async function Home() {
  const githubActivity = await getGithubActivity();

  return (
    <>
      {/* The GitHub section always renders (heatmap or honest fallback), so the
          nav link is unconditional — it no longer depends on GITHUB_TOKEN. */}
      <Nav showGithub />
      <main id="main">
        <Hero />
        <Ticker />
        <Work />
        <Experience />
        <About hasPortrait={portraitIsLoadable()} />
        <BelowFold
          githubActivity={githubActivity}
          hasSignature={signatureExists()}
        />
      </main>
    </>
  );
}
