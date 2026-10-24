import { statSync } from "node:fs";
import { getGithubActivity } from "@/lib/github";
import { join } from "node:path";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Ticker } from "@/components/ticker";
import { Work } from "@/components/work";
import { Experience } from "@/components/experience";
import { About } from "@/components/about";
import { GitHubActivity } from "@/components/github-activity";
import { Reel } from "@/components/reel";
import { Contact } from "@/components/contact";

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
  const showGithub = !!process.env.GITHUB_TOKEN;

  return (
    <>
      <Nav showGithub={showGithub} />
      <main id="main">
        <Hero />
        <Ticker />
        <Work />
        <Experience />
        <About hasPortrait={portraitIsLoadable()} />
        {githubActivity ? <GitHubActivity activity={githubActivity} /> : null}
        <Reel />
        <Contact hasSignature={signatureExists()} />
      </main>
    </>
  );
}
