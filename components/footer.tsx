import { socials } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface py-12 transition-colors">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <p className="font-display text-base font-medium text-ink">
            Krishnendu Adak
          </p>
          <p className="font-mono text-xs text-ink-dim">
            © {currentYear} — Built with Next.js & Tailwind CSS
          </p>
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
