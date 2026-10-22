import { skillGroups } from "@/lib/data";

export function Ticker() {
  const items = skillGroups.flatMap((group) => group.items.map((item) => item.name));

  return (
    <div className="overflow-hidden border-y border-line py-4" aria-hidden>
      <div className="flex w-max animate-marquee gap-6 whitespace-nowrap font-mono text-sm text-ink-dim">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-6">
            <span>{item}</span>
            <span className="text-accent">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
