import { reel } from "@/lib/data";
import { Reveal } from "./ui/reveal";
import { StrokeText } from "./ui/stroke-text";

export function Reel() {
  return (
    <section id="reel" className="container py-24 sm:py-32">
      <Reveal>
        <span className="eyebrow">005 — Reel</span>
        <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Frames I&apos;ve
          <br />
          <StrokeText>cut.</StrokeText>
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        {reel.map((item, i) => (
          <Reveal key={item.youtubeId} delay={i * 0.1}>
            <div className="group overflow-hidden rounded-2xl border border-line bg-surface-2">
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${item.youtubeId}`}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="h-full w-full"
                />
              </div>
            </div>
            <p className="mt-3 text-sm text-ink-dim">
              <span className="text-ink">{item.title}</span> — {item.meta}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}