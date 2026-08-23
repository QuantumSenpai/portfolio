import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Ticker } from "@/components/ticker";
import { Work } from "@/components/work";
import { Experience } from "@/components/experience";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Reel } from "@/components/reel";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { FilmstripDivider } from "@/components/ui/filmstrip-divider";

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
        <About />
        <Skills />
        <FilmstripDivider />
        <Reel />
        <Contact />
      </main>
      <Footer />
    </>
  );
}