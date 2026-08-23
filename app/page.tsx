import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Ticker } from "@/components/ticker";
import { Work } from "@/components/work";
import { Research } from "@/components/research";
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
        <Research />
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