const items = [
  "Java",
  "C++",
  "Python",
  "DSA",
  "Flask",
  "After Effects",
  "Premiere Pro",
  "DaVinci Resolve",
  "NLP",
  "Machine Learning",
];

export function Ticker() {
  return (
    <div className="overflow-hidden border-y border-line py-4" aria-hidden>
      <div className="flex w-max animate-marquee gap-6 whitespace-nowrap font-mono text-sm text-ink-dim">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-6">
            {item}
            <span className="text-accent">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}