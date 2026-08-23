import { research } from "@/lib/data";
import { Reveal, RevealGroup, RevealItem } from "./ui/reveal";

export function Research() {
  return (
    <section id="research" className="container py-24 sm:py-32">
      <Reveal>
        <span className="eyebrow">002 — Research</span>
        <h2 className="mt-4 max-w-lg text-4xl sm:text-5xl">{research.title}</h2>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <Reveal delay={0.05}>
          <div className="rounded-2xl border border-line bg-surface p-7">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              {research.eyebrow}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-dim">{research.summary}</p>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
              {research.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-lg">{s.value}</p>
                  <p className="mt-1 font-mono text-[0.65rem] text-ink-dim">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-1.5">
              {research.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[0.65rem] text-ink-dim"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-ink-dim">
              The problem
            </h3>
            <p className="mt-3 text-base leading-relaxed text-ink-dim">{research.problem}</p>

            <h3 className="mt-8 font-mono text-xs uppercase tracking-wider text-ink-dim">
              What I built
            </h3>
            <RevealGroup className="mt-4 space-y-4" stagger={0.06}>
              {research.approach.map((step, i) => (
                <RevealItem key={i} className="flex gap-4">
                  <span className="mt-0.5 font-mono text-xs text-accent-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-ink">{step}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Reveal>
      </div>
    </section>
  );
}