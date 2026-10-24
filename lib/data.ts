

export interface ContactSectionConfig {
  eyebrow: string;
  heading: string;
  subline: string;
}

export const contactSection: ContactSectionConfig = {
  eyebrow: "006 / Contact",
  heading: "Let's build something.",
  subline:
    "Open for freelance — video editing, motion design, web development and content writing. Whether you're a startup, creator or fellow student, let's talk.",
};

export interface ContactFormConfig {
  fields: string[];
  services: string[];
  submit: string;
  submitting: string;
  success: string;
  consentPrefix: string;
  consentLink: string;
  errors: {
    missingConsent: string;
    missingFields: string;
    invalidFields: string;
    invalidEmail: string;
    invalidRequest: string;
    rateLimited: string;
    sendFailed: string;
    fallbackEmail: string;
  };
}

export const contactForm: ContactFormConfig = {
  fields: ["Name", "Email", "Service", "Message"],
  services: [
    "Video Editing",
    "Motion Design / VFX",
    "Web Development",
    "Content Writing",
    "College Project Help",
    "Other",
  ],
  submit: "Send message",
  submitting: "Sending…",
  success: "Message sent — I'll get back to you soon ⚡",
  consentPrefix: "I agree to the",
  consentLink: "privacy policy",
  errors: {
    missingConsent: "Please agree to the privacy policy before sending.",
    missingFields: "Please fill in every field.",
    invalidFields: "Please check the details you entered and try again.",
    invalidEmail: "Please enter a valid email address.",
    invalidRequest:
      "Something went wrong — email itxkisu@gmail.com directly.",
    rateLimited: "Too many messages — please try later or email me directly.",
    sendFailed:
      "Network error — please email itxkisu@gmail.com directly.",
    fallbackEmail: "itxkisu@gmail.com",
  },
};

export const email = "work.krishnendu.dev@gmail.com";

export const heroCopy = {
  scrollLabel: "Scroll",
  headline: {
    first: "Building on screen,",
    second: "cutting on",
    accent: "timeline.",
  },
  subcopy:
    "CSE student and full-stack developer who also cuts cinematic video and motion. Exploring applied ML.",
};

export const heroLinks: { label: string; href: string }[] = [
  { label: "WEB", href: "#work" },
  { label: "MOTION", href: "#reel" },
  { label: "ML", href: "#experience" },
];

export interface GithubSectionConfig {
  eyebrow: string;
  heading: string;
  username: string;
  profileUrl: string;
  stats: {
    total: string;
    active: string;
    currentStreak: string;
    longestStreak: string;
  };
}

export const githubSection: GithubSectionConfig = {
  eyebrow: "004 / GitHub",
  heading: "Contributions on GitHub",
  username: "QuantumSenpai",
  profileUrl: "https://github.com/QuantumSenpai",
  stats: {
    total: "Contributions in the last year",
    active: "Active days",
    currentStreak: "Current streak",
    longestStreak: "Longest streak",
  },
};

// ─── EDIT HERE — Nav ──────────────────────────────────────────────────────────
// Links render in array order. `conditional: true` links are hidden unless a
// section with that id is actually on the page — the GitHub link only shows
// when the GitHub section renders (it needs data to appear).

export interface NavLink {
  href: string;
  label: string;
  /** Shown only when a section with this id exists in the DOM. */
  conditional?: boolean;
}

export const navLinks: NavLink[] = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#github", label: "GitHub" },
  { href: "#reel", label: "Reel" },
  { href: "#contact", label: "Contact" },
];

export const navCta: { href: string; label: string } = {
  href: "#contact",
  label: "Let's talk",
};

// ─── END EDIT HERE — Nav ──────────────────────────────────────────────────────

export const socials: { label: string; url: string }[] = [
  { label: "GitHub", url: "https://github.com/QuantumSenpai" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/krishnendu158" },
  { label: "Instagram", url: "https://instagram.com/kyzenn.raw" },
];

export const availability: { text: string } = {
  text: "Available for freelance",
};

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const footer: {
  copyright: string;
  signatureAlt: string;
  signatureText: string;
  columns: FooterColumn[];
} = {
  copyright: "© {year} — Built with Next.js & Tailwind CSS",
  signatureAlt: "Krishnendu Adak signature",
  signatureText: "Krishnendu",
  columns: [
    {
      title: "Navigate",
      links: [
        { label: "Work", href: "#work" },
        { label: "Experience", href: "#experience" },
        { label: "About", href: "#about" },
        { label: "GitHub", href: "https://github.com/QuantumSenpai" },
        { label: "Reel", href: "#reel" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Elsewhere",
      links: socials.map((social) => ({
        label: social.label,
        href: social.url,
        external: true,
      })),
    },
    {
      title: "Legal",
      links: [{ label: "Privacy Policy", href: "/privacy" }],
    },
  ],
};

export interface PrivacySection {
  heading: string;
  paragraphs: string[];
}

export interface PrivacyConfig {
  updated: string;
  sections: PrivacySection[];
}

export const privacy: PrivacyConfig = {
  updated: "22 October 2026",
  sections: [
    {
      heading: "What the contact form collects",
      paragraphs: [
        "If you use the contact form on this site, four things are sent to this site's server: your name, your email address, the service you picked from the dropdown and your message. The only other value sent is a consent flag, which is set to true when you tick the privacy policy checkbox.",
        "Two technical values travel with the form as well: the time the page was opened, which is used to turn away submissions that are sent almost instantly, and a hidden field that should stay empty. If that hidden field is filled in, the submission is quietly discarded and nothing reaches my inbox.",
        "Your details are used for one reason: so I can reply to your enquiry.",
      ],
    },
    {
      heading: "Where your message goes",
      paragraphs: [
        "The form posts to the contact endpoint on this site. The server checks that the consent flag is true, that the request came from this site, and that every field is filled in, then forwards the submission to Formspree, which delivers it to my email address.",
        "The Formspree form id is kept as a server-side environment variable. It is never included in the page or sent to your browser.",
        "Formspree is the only third party that receives what you typed in the form. I do not pass your message to any other service.",
      ],
    },
    {
      heading: "Rate limiting",
      paragraphs: [
        "So the form cannot be used as a spam relay, the server counts submissions per client. Before it is used as a key, the client's IP address is hashed with SHA-256, so the address itself is never stored, logged or sent anywhere.",
        "The limits are 3 submissions per hour and 10 submissions per day from the same address, and 25 submissions per day from every visitor combined, which protects the quota on the mail service. A request over any of those limits is refused with a 429 response.",
        "Where those counters are kept depends on the deployment. When an Upstash Redis database is configured, the counters are stored there and Upstash acts as a processor of the hashed address. When it is not configured, the counters are kept in the server's own memory, which is emptied whenever the server restarts.",
      ],
    },
    {
      heading: "Cookies and analytics",
      paragraphs: [
        "This site sets no cookies. There is no analytics or tracking package, tag manager or tracking script in the code, so nothing about your visit is measured, profiled or shared.",
        "Two things are stored in your browser's localStorage, and neither is ever sent to me: your light or dark theme choice, under the key 'theme', and the time of your last successful contact form submission, under the key 'contact:cooldown', which is used to stop the form being sent again straight away.",
      ],
    },
    {
      heading: "Fonts and the reel",
      paragraphs: [
        "The typefaces are downloaded when this site is built and served from this domain, so your browser never contacts a font provider.",
        "The reel thumbnails are fetched by the server and re-served from this domain, so no request for them reaches YouTube. Only when you press play on a reel does the video load from youtube-nocookie.com, and YouTube then receives that request in the ordinary way. It happens after you click, not before.",
      ],
    },
    {
      heading: "How long it is kept",
      paragraphs: [
        "Your enquiry stays in my inbox until I delete it. I do not keep a second copy of it in a database, an analytics tool or a mailing list.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        "You can ask me to correct anything that is wrong, or to delete the details I hold about you. Email me and I will do it.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        "For anything about this page or about the form, email me at work.krishnendu.dev@gmail.com.",
      ],
    },
  ],
};

export interface WorkSectionConfig {
  eyebrow: string;
  heading: string;
}

export const workSection: WorkSectionConfig = {
  eyebrow: "001 / Work",
  heading: "Selected work",
};

export type ProjectCategory = "web" | "dsa" | "ml" | "game";

export interface Project {
  slug: string;
  title: string;
  year: string;
  role: string;
  description: string;
  tags: string[];
  featured: boolean;
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
  caseStudyHref?: string;
  category?: ProjectCategory;
}

export const projects: Project[] = [
  {
    slug: "alzheimers-mri-classifier",
    title: "Alzheimer's MRI Classifier",
    year: "2026",
    role: "Research Intern — ML & Medical Imaging",
    description:
      "Clinical Decision Support System that classifies Alzheimer's stages from MRI scans and auto-generates structured diagnostic reports.",
    tags: ["PyTorch", "FastAPI", "PostgreSQL"],
    featured: true,
    caseStudyHref: "#experience",
    category: "ml",
  },
  // TODO add screenshot
  {
    slug: "fraudlens",
    title: "FraudLens",
    year: "2026",
    role: "Solo project · ML + backend",
    description:
      "Hybrid ML + rule-based fraud detection that scores transactions in real time, with SHAP explainability and a live transaction simulation. Trained on 280K+ real-world transactions.",
    tags: ["Python", "XGBoost", "FastAPI"],
    featured: true,
    repoUrl: "https://github.com/QuantumSenpai/fraudlens",
    liveUrl: "https://fraudlens-psi.vercel.app",
  },
  // TODO add screenshot
  {
    slug: "desulpherisers-site",
    title: "DESILFHURIZERS",
    year: "2026",
    role: "Frontend developer · SIH 2026",
    description:
      "Cinematic scroll-driven 3D landing page for DESILFHURIZERS, a passive colorimetric H2S exposure dosimeter wristband built for SIH 2026.",
    tags: ["React Three Fiber", "GSAP", "TypeScript"],
    featured: true,
    repoUrl: "https://github.com/QuantumSenpai/desulpherisers-site",
    liveUrl: "https://desulpherisers-site.vercel.app",
  },
  // TODO add screenshot
  {
    slug: "ghostwash",
    title: "Ghostwash",
    year: "2026",
    role: "Solo project · Developer",
    description:
      "Local-first tool that cleans up AI-sounding text: strips invisible characters, flags cliché phrases and rewrites only the weak lines. Supports txt, docx and pdf and runs fully on your own machine.",
    tags: ["TypeScript"],
    featured: true,
    repoUrl: "https://github.com/QuantumSenpai/ghostwash",
  },
  // TODO add screenshot
  {
    slug: "usage-meter-for-claude",
    title: "Usage Meter for Claude",
    year: "2026",
    role: "Developer (fork of claude-counter)",
    description:
      "Unofficial browser extension for claude.ai that shows conversation token count, a prompt-cache timer, and session and weekly usage bars.",
    tags: ["JavaScript", "Browser extension"],
    featured: true,
    repoUrl: "https://github.com/QuantumSenpai/usage-meter-for-claude",
  },
  // TODO add screenshot
  {
    slug: "ern-expiry-rescue-network",
    title: "ERN — Expiry Rescue Network",
    year: "2026",
    role: "Developer",
    description:
      "Platform connecting supermarkets, pharmacies and shops with buyers, NGOs and orphanages to sell near-expiry food, medicines and essentials at low prices.",
    tags: ["TypeScript"],
    featured: true,
    repoUrl: "https://github.com/QuantumSenpai/ERN---Expiry-Rescue-Network",
  },
  {
    slug: "sakura-timer",
    title: "Sakura Timer",
    year: "2024",
    role: "Frontend Developer & Designer",
    description:
      "Anime lofi pomodoro study timer with falling sakura petals, ambient mood and focus tracking.",
    tags: ["HTML", "CSS", "JS"],
    featured: false,
    repoUrl: "https://github.com/QuantumSenpai/sakura-timer",
    category: "web",
  },
  {
    slug: "sort-anime",
    title: "SortAnime",
    year: "2024",
    role: "Creator & Developer",
    description:
      "Type numbers, watch them sort in real time — 10 algorithms, dual visualization mode.",
    tags: ["JavaScript", "DSA", "UI"],
    featured: false,
    liveUrl: "https://quantumsenpai.github.io/Sort-Visualizer",
    repoUrl: "https://github.com/QuantumSenpai/Sort-Visualizer",
    category: "dsa",
  },
  {
    slug: "sentiment-analysis",
    title: "Sentiment Analysis",
    year: "2024",
    role: "ML Engineer",
    description:
      "NLP-powered customer review insight extraction using Python, NLTK, TextBlob and Flask.",
    tags: ["Python", "NLP", "Flask"],
    featured: false,
    repoUrl: "https://github.com/QuantumSenpai/Sentiment-Analysis-Mini-Project",
    category: "ml",
  },
  {
    slug: "cyber-type",
    title: "CyberType",
    year: "2024",
    role: "Frontend Developer",
    description:
      "Neon cyberpunk typing speed test — live WPM, rank system from Recruit to Cyber God.",
    tags: ["HTML", "CSS", "JS"],
    featured: false,
    liveUrl: "https://quantumsenpai.github.io/Cyber-Type",
    repoUrl: "https://github.com/QuantumSenpai/Cyber-Type",
    category: "web",
  },
  {
    slug: "midsem-rush",
    title: "MidSem Rush",
    year: "2024",
    role: "Game Developer",
    description:
      "Dodge deadlines, slow your HOD and strike with an anime thunder sword. A student runner game.",
    tags: ["HTML", "JS", "Game"],
    featured: false,
    liveUrl: "https://quantumsenpai.github.io/Midsem-Rush",
    repoUrl: "https://github.com/QuantumSenpai/Midsem-Rush",
    category: "game",
  },
  {
    slug: "wraith",
    title: "Wraith",
    year: "2024",
    role: "Creative Developer",
    description:
      "A dark, cinematic web project built with precision and a haunting aesthetic.",
    tags: ["HTML", "CSS", "JS"],
    featured: false,
    repoUrl: "https://github.com/QuantumSenpai/wraith",
    category: "web",
  },
  {
    slug: "dev-card",
    title: "Dev Card",
    year: "2024",
    role: "Frontend Developer",
    description:
      "Anime lofi developer card — spinning gradient ring, live clock and 3D tilt.",
    tags: ["HTML", "CSS", "JS"],
    featured: false,
    liveUrl: "https://quantumsenpai.github.io/dev-card",
    repoUrl: "https://github.com/QuantumSenpai/dev-card",
    category: "web",
  },
];

// ─── EDIT HERE — Repositories ────────────────────────────────────────────────
// Array position = display order. Only repos listed in `repos` are shown —
// nothing is auto-fetched from GitHub and nothing is random.
// TODO: the entries below replace the old placeholder trio — keep them in
// sync with the pinned repositories (see docs/HOW-TO-EDIT.md for the template).
export interface RepoItem {
  name: string;
  url: string;
  language?: string;
  description?: string;
  stars?: number;
}

export interface ReposSectionConfig {
  eyebrow?: string;
  heading: string;
  maxVisible: number;
  viewAllUrl: string;
  viewAllLabel: string;
  repos: RepoItem[];
}

export const reposSection: ReposSectionConfig = {
  heading: "All repositories",
  maxVisible: 6,
  viewAllUrl: "https://github.com/QuantumSenpai?tab=repositories",
  viewAllLabel: "View all on GitHub",
  repos: [
    {
      name: "triocore",
      language: "TypeScript",
      url: "https://github.com/QuantumSenpai/triocore",
      description: "Startup site",
    },

    {
      name: "Sentiment-Analysis-Mini-Project",
      language: "Python",
      url: "https://github.com/QuantumSenpai/Sentiment-Analysis-Mini-Project",
    },

    {
      name: "gesture-volume-control",
      language: "Python",
      url: "https://github.com/QuantumSenpai/gesture-volume-control",
    },

    {
      name: "viva-tracker",
      url: "https://github.com/QuantumSenpai/viva-tracker",
    },

    {
      name: "Cyber-Type",
      language: "HTML",
      url: "https://github.com/QuantumSenpai/Cyber-Type",
    },

    {
      name: "Midsem-Rush",
      language: "HTML",
      url: "https://github.com/QuantumSenpai/Midsem-Rush",
    },

    {
      name: "Competitive-Programming-Lab",
      language: "C",
      url: "https://github.com/QuantumSenpai/Competitive-Programming-Lab",
    },

    {
      name: "kisu-business-card",
      language: "CSS",
      url: "https://github.com/QuantumSenpai/kisu-business-card",
    },
  ],
};

export interface ExperienceSectionConfig {
  eyebrow: string;
  heading: string;
  description: string;
}

export const experienceSection: ExperienceSectionConfig = {
  eyebrow: "002 / Experience",
  heading: "Where I've built & worked.",
  description:
    "From ML research engineering in medical diagnostics to leading video post-production and motion design pipelines.",
};

export interface ExperienceEntry {
  id: string;
  role: string;
  org: string;
  location?: string;
  dates: string;
  summary?: string;
  bullets: string[];
  stats?: { label: string }[];
  tags: string[];
  defaultOpen?: boolean;
  visibleBullets?: number;
}

export const experiences: ExperienceEntry[] = [
  {
    id: "nit-durgapur",
    role: "Research Intern — ML & Medical Imaging",
    org: "National Institute of Technology",
    location: "Durgapur, WB",
    dates: "July 2026 – August 2026",
    defaultOpen: true,
    summary:
      "Built a Clinical Decision Support System that classifies Alzheimer's stages from MRI scans and auto-generates a structured diagnostic report — from raw scan to a doctor-readable PDF.",
    bullets: [
      "Trained a ResNet50 classifier (PyTorch, mixed-precision AMP) across four Alzheimer's stages on MRI scan data.",
      "Found and fixed a data-leakage issue between train/test splits using perceptual-hash deduplication — a detail that quietly inflated early accuracy numbers.",
      "Built a FastAPI backend with PostgreSQL (SQLAlchemy + Alembic migrations) to serve predictions and persist patient records.",
      "Auto-generated structured PDF diagnostic reports with ReportLab, and shipped a lightweight frontend for clinicians to upload scans and review results.",
      "Deployed and configured the full stack on a supervisor's machine, including a one-click batch startup script for a non-technical end user.",
    ],
    stats: [{ label: "4-stage" }, { label: "ResNet50" }, { label: "Mixed precision" }],
    tags: [
      "PyTorch",
      "ResNet50",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "ReportLab",
    ],
  },
  {
    id: "investor-insights",
    role: "Senior Video Editor & YouTube Manager",
    org: "Investor Insights",
    location: "Remote",
    dates: "2023 – 2025",
    summary:
      "Led end-to-end video post-production and channel growth strategy for high-impact financial and tech content.",
    bullets: [
      "Produced and edited 50+ high-retention long-form finance & equity analysis videos featuring custom motion graphics in After Effects and Premiere Pro.",
      "Designed dynamic soundscapes, kinetic typography, and data visualization overlays that drove a 35% increase in average viewer watch time.",
      "Managed complete publishing pipeline, content calendar, thumbnail A/B testing, and audience retention analytics.",
    ],
    tags: [
      "Premiere Pro",
      "After Effects",
      "Motion Design",
      "YouTube Strategy",
      "Sound Design",
    ],
  },
  {
    id: "freelance-editor",
    role: "Freelance Video Editor & Motion Designer",
    org: "Independent / Creator Studio",
    location: "Remote",
    dates: "2023 – 2025",
    summary:
      "Delivering bespoke cinematic edits, anime AMVs, and social media reels for digital creators and brands worldwide.",
    bullets: [
      "Delivered 30+ bespoke cinematic edits, anime motion pieces, and promotional reels with 100% on-time project completion.",
      "Implemented custom 3D camera tracking, complex mask transitions, speed ramps, and precision audio sync in DaVinci Resolve & After Effects.",
      "Collaborated directly with creators from initial storyboard concepts to final 4K rendering and color grading.",
    ],
    tags: [
      "DaVinci Resolve",
      "After Effects",
      "VFX",
      "Anime Edits",
      "Color Grading",
    ],
  },
];

export interface AboutSectionConfig {
  eyebrow: string;
  heading: string;
  bio: string[];
  education: { line: string };
  portrait: {
    src: string;
    alt: string;
    caption: string;
    name: string;
    nickname: string;
    role: string;
  };

  legacy: {
    cardLabel: string;
    focusAreasLabel: string;
    principlesLabel: string;
    focusAreas: string[];
    principles: { title: string; desc: string }[];
    skillsEyebrow: string;
    skillsHeading: string;
    skillGroupLabels: string[];
  };
}

export const aboutSection: AboutSectionConfig = {
  eyebrow: "003 / About",
  heading: "Crafting digital experiences with code and motion.",
  bio: [
    "CSE student, web developer, video editor and NLP/ML enthusiast from Ghatal, West Bengal. Blending technical engineering with cinematic storytelling and motion aesthetics.",
    "I believe in clean design, performant code, and visual impact. Every interface should feel responsive, alive, and intuitive to navigate.",
  ],
  education: {
    line: "B.Tech CSE, Adamas University, Barasat · 2026–2028",
  },
  portrait: {
    src: "/profile.jpg",
    alt: "Krishnendu Adak",
    caption: "Krishnendu Adak (Kisu)",
    name: "Krishnendu Adak",
    nickname: "Kisu",
    role: "CSE student · web developer · video editor",
  },
  legacy: {
    cardLabel: "Background & Education",
    focusAreasLabel: "Focus Areas",
    principlesLabel: "Core Principles",
    focusAreas: [
      "Full-Stack Web",
      "Video Editing",
      "Motion Graphics",
      "NLP & ML",
      "Algorithms",
    ],
    principles: [
      {
        title: "Precision Engineering",
        desc: "Writing clean, modular, and maintainable code built to scale.",
      },
      {
        title: "Visual Storytelling",
        desc: "Elevating concepts with smooth animations and cinematic editing.",
      },
      {
        title: "Continuous Learning",
        desc: "Exploring machine learning, NLP, and modern web frameworks.",
      },
    ],
    skillsEyebrow: "004 — Toolkit",
    skillsHeading: "What I work with.",
    skillGroupLabels: ["Development", "Creative", "AI / ML — learning"],
  },
};

export interface SkillItem {
  name: string;
  status?: "core" | "learning";
  note?: string;
}

export interface SkillGroup {
  label: string;
  blurb?: string;
  items: SkillItem[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: [
      { name: "Java" },
      { name: "C / C++" },
      { name: "Python" },
      { name: "TypeScript" },
      { name: "PHP" },
      { name: "Go" },
    ],
  },
  {
    label: "Web & Frameworks",
    items: [
      { name: "Web & App Development" },
      { name: "HTML / CSS / JS" },
      { name: "React" },
      { name: "Next.js" },
      { name: "Node.js" },
      { name: "MERN Stack" },
      { name: "Flask", status: "learning" },
    ],
  },
  {
    label: "Styling & UI",
    items: [
      { name: "Tailwind CSS" },
      { name: "shadcn/ui" },
    ],
  },
  {
    label: "Web Animation",
    items: [
      { name: "Framer Motion" },
      { name: "GSAP" },
      { name: "Lenis" },
      { name: "Anime.js" },
    ],
  },
  {
    label: "Databases",
    items: [
      { name: "MongoDB" },
      { name: "Drizzle ORM" },
    ],
  },
  {
    label: "CS Fundamentals",
    items: [
      { name: "DSA" },
      { name: "OOP" },
      { name: "DBMS" },
    ],
  },
  {
    label: "Cloud & Systems",
    items: [
      { name: "Cloud Computing" },
      { name: "Linux" },
    ],
  },
  {
    label: "ML / Data",
    items: [
      { name: "Machine Learning", status: "learning" },
      { name: "NLP", status: "learning" },
    ],
  },
  {
    label: "Video / Motion",
    items: [
      { name: "After Effects" },
      { name: "Premiere Pro" },
      { name: "DaVinci Resolve" },
      { name: "Photoshop" },
    ],
  },
];

export interface Service {
  title: string;
  line: string;
}

export const services: Service[] = [
  {
    title: "Web",
    line: "Frontend pages and interactive tools in HTML, CSS and JavaScript.",
  },
  {
    title: "Motion",
    line: "Motion graphics and animation design in After Effects.",
  },
  {
    title: "Editing",
    line: "Video editing, color grading and VFX in Premiere Pro and DaVinci Resolve.",
  },
];

export interface ReelSectionConfig {
  eyebrow: string;
  heading: string;
  description?: string;

  channelUrl?: string;
}

export const reelSection: ReelSectionConfig = {
  eyebrow: "005 / Reel",
  heading: "Frames I've cut.",
  channelUrl: "https://www.youtube.com/@KyzennFxx",
};

export interface ReelVideo {
  id: string;
  title: string;
  caption?: string;
  kind: "video" | "short";
  thumb?: string;
}

export const videos: ReelVideo[] = [
  {
    id: "RSFbZIeSGmg",
    title: "JJK · Yuta Edit",
    caption: "After Effects · Anime Edit",
    kind: "video",
  },
  {
    id: "zp42sJYuLP8",
    title: "Royalty · Solo Leveling",
    caption: "Motion Design",
    kind: "video",
  },
  {
    id: "PMZbuAV5hYQ",
    title: "JJK S2 Edit",
    caption: "After Effects · Premiere Pro",
    kind: "video",
  },
  {
    id: "o_C3w5IU_xY",
    title: "TODO",
    kind: "short",
  },
  {
    id: "IFQmWkVhSLo",
    title: "TODO",
    kind: "short",
  },
  {
    id: "mOgmeADzdDg",
    title: "TODO",
    kind: "short",
  },
  {
    id: "793Zsf_N4ZE",
    title: "TODO",
    kind: "short",
  },
  {
    id: "6dqUzpzvaNM",
    title: "TODO",
    kind: "short",
  },
  {
    id: "0QLfE0aSg0Q",
    title: "TODO",
    kind: "short",
  },
  {
    id: "2jwkAPswmuk",
    title: "TODO",
    kind: "short",
  },
  {
    id: "gW8NMGo72TI",
    title: "TODO",
    kind: "short",
  },
];

export const stats = [
  { label: "Projects shipped", value: 7 },
  { label: "Years building", value: 2 },
  { label: "Edits delivered", value: 30 },
];

if (process.env.NODE_ENV !== "production" && typeof window === "undefined") {
  void import("./validate-data").then((module) => module.validateData());
}
