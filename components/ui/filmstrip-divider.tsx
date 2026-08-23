export function FilmstripDivider() {
  return (
    <div
      aria-hidden
      className="h-[18px] w-full border-y border-line"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, var(--surface-2) 0 14px, transparent 14px 28px)",
      }}
    />
  );
}