import { socials } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface py-12 transition-colors">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface-2 p-1.5 text-ink shadow-sm">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              className="h-full w-full fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22 18C22 14.6863 24.6863 12 28 12H34C37.3137 12 40 14.6863 40 18V82C40 85.3137 37.3137 88 34 88H28C24.6863 88 22 85.3137 22 82V18Z" />
              <path d="M47.5 45.2L74.8 17.9C76.8 15.9 80 17.3 80 20.1V34C80 35.6 79.2 37.1 77.9 38L62 50L77.9 62C79.2 62.9 80 64.4 80 66V79.9C80 82.7 76.8 84.1 74.8 82.1L47.5 54.8C44.8 52.1 44.8 47.9 47.5 45.2Z" />
            </svg>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="font-display text-base font-bold text-ink">
              Krishnendu Adak
            </p>
            <p className="font-mono text-xs text-ink-dim">
              © {currentYear} — Built with Next.js &amp; Tailwind CSS
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 font-mono text-xs text-ink-dim">
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
          <a
            href={socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            Instagram
          </a>
          <a
            href={`mailto:${socials.email}`}
            className="transition-colors hover:text-accent"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
