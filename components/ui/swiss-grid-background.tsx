export function SwissGridBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ contain: "strict" }}
    >
      <div
        className="absolute inset-0"
        style={{
          opacity: "var(--grid-line-opacity)",
          backgroundImage: `
            linear-gradient(to right, var(--ink) 1px, transparent 1px),
            linear-gradient(to bottom, var(--ink) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 120% 85% at 50% 28%, rgba(0, 0, 0, 1) 22%, rgba(0, 0, 0, 0) 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 120% 85% at 50% 28%, rgba(0, 0, 0, 1) 22%, rgba(0, 0, 0, 0) 78%)",
        }}
      />
    </div>
  );
}
