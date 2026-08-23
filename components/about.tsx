import { Reveal, RevealGroup, RevealItem } from "./ui/reveal";

export function About() {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <Reveal>
        <span className="eyebrow">003 — About</span>
        <h2 className="mt-4 max-w-lg text-4xl sm:text-5xl">
          Crafting digital experiences with code and motion.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <Reveal delay={0.05}>
          <div className="rounded-2xl border border-line bg-surface p-7">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              Background & Education
            </p>
            <h3 className="mt-2 text-xl font-medium text-ink">
              Krishnendu Adak (Kisu)
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-dim">
              CSE student, web developer, video editor and NLP/ML enthusiast from Ghatal, West Bengal. Blending technical engineering with cinematic storytelling and motion aesthetics.
            </p>

            <div className="mt-8 border-t border-line pt-6">
              <p className="font-mono text-xs uppercase tracking-wider text-ink-dim">Focus Areas</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Full-Stack Web", "Video Editing", "Motion Graphics", "NLP & ML", "Algorithms"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[0.65rem] text-ink-dim"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-ink-dim">
              Philosophy
            </h3>
            <p className="mt-3 text-base leading-relaxed text-ink-dim">
              I believe in clean design, performant code, and visual impact. Every interface should feel responsive, alive, and intuitive to navigate.
            </p>

            <h3 className="mt-8 font-mono text-xs uppercase tracking-wider text-ink-dim">
              Core Principles
            </h3>
            <RevealGroup className="mt-4 space-y-4" stagger={0.06}>
              {[
                { title: "Precision Engineering", desc: "Writing clean, modular, and maintainable code built to scale." },
                { title: "Visual Storytelling", desc: "Elevating concepts with smooth animations and cinematic editing." },
                { title: "Continuous Learning", desc: "Exploring machine learning, NLP, and modern web frameworks." },
              ].map((principle, i) => (
                <RevealItem key={i} className="flex gap-4">
                  <span className="mt-0.5 font-mono text-xs text-accent-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="text-sm font-medium text-ink">{principle.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-ink-dim">{principle.desc}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Reveal>
      </div>
    </section>
  );
}