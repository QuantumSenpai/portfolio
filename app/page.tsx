import { statSync } from "node:fs";
import { join } from "node:path";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Ticker } from "@/components/ticker";
import { Work } from "@/components/work";
import { Experience } from "@/components/experience";
import { About } from "@/components/about";
import { Reel } from "@/components/reel";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { FilmstripDivider } from "@/components/ui/filmstrip-divider";

/** public/profile.jpg must be a real image — an empty/0-byte file is treated as missing. */
function portraitIsLoadable() {
  try {
    return statSync(join(process.cwd(), "public", "profile.jpg")).size > 0;
  } catch {
    return false;
  }
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <FilmstripDivider />
        <Work />
        <FilmstripDivider />
        <Experience />
        <About hasPortrait={portraitIsLoadable()} />
        <Reel />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
