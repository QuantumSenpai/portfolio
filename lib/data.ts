export const socials = {
  github: "https://github.com/QuantumSenpai",
  linkedin: "https://www.linkedin.com/in/krishnendu158",
  instagram: "https://instagram.com/kyzenn.raw",
  email: "work.krishnendu.dev@gmail.com",
};

// ============================================================================
// EDIT HERE — all Work text, links and images
// ============================================================================

export interface WorkSectionConfig {
  eyebrow: string;
  heading: string;
  allReposLabel: string;
  allReposHref: string;
  githubUrl: string;
}

export const workSection: WorkSectionConfig = {
  eyebrow: "001 / Work",
  heading: "Selected work",
  allReposLabel: "All repositories",
  allReposHref: "https://github.com/QuantumSenpai?tab=repositories",
  githubUrl: "https://github.com/QuantumSenpai?tab=repositories",
};

export type ProjectCategory = "web" | "dsa" | "ml" | "game";

export interface Project {
  slug: string;
  title: string;
  year: string;
  role: string;
  description: string; // one line
  tags: string[]; // max 3
  featured: boolean;
  image?: string; // optional string: either "/work/x.webp" OR full https URL, e.g. Cloudinary
  liveUrl?: string;
  repoUrl?: string;
  caseStudyHref?: string; // internal anchor like "#experience"
  order: number;
  category?: ProjectCategory;
}

export const projects: Project[] = [
  {
    order: 1,
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
  {
    order: 2,
    slug: "sakura-timer",
    title: "Sakura Timer",
    year: "2024",
    role: "Frontend Developer & Designer",
    description:
      "Anime lofi pomodoro study timer with falling sakura petals, ambient mood and focus tracking.",
    tags: ["HTML", "CSS", "JS"],
    featured: true,
    repoUrl: "https://github.com/QuantumSenpai/sakura-timer",
    category: "web",
  },
  {
    order: 3,
    slug: "sort-anime",
    title: "SortAnime",
    year: "2024",
    role: "Creator & Developer",
    description:
      "Type numbers, watch them sort in real time — 10 algorithms, dual visualization mode.",
    tags: ["JavaScript", "DSA", "UI"],
    featured: true,
    liveUrl: "https://quantumsenpai.github.io/Sort-Visualizer",
    repoUrl: "https://github.com/QuantumSenpai/Sort-Visualizer",
    category: "dsa",
  },
  {
    order: 4,
    slug: "sentiment-analysis",
    title: "Sentiment Analysis",
    year: "2024",
    role: "ML Engineer",
    description:
      "NLP-powered customer review insight extraction using Python, NLTK, TextBlob and Flask.",
    tags: ["Python", "NLP", "Flask"],
    featured: true,
    repoUrl: "https://github.com/QuantumSenpai/Sentiment-Analysis-Mini-Project",
    category: "ml",
  },
  {
    order: 5,
    slug: "cyber-type",
    title: "CyberType",
    year: "2024",
    role: "Frontend Developer",
    description:
      "Neon cyberpunk typing speed test — live WPM, rank system from Recruit to Cyber God.",
    tags: ["HTML", "CSS", "JS"],
    featured: true,
    liveUrl: "https://quantumsenpai.github.io/Cyber-Type",
    repoUrl: "https://github.com/QuantumSenpai/Cyber-Type",
    category: "web",
  },
  {
    order: 6,
    slug: "midsem-rush",
    title: "MidSem Rush",
    year: "2024",
    role: "Game Developer",
    description:
      "Dodge deadlines, slow your HOD and strike with an anime thunder sword. A student runner game.",
    tags: ["HTML", "JS", "Game"],
    featured: true,
    liveUrl: "https://quantumsenpai.github.io/Midsem-Rush",
    repoUrl: "https://github.com/QuantumSenpai/Midsem-Rush",
    category: "game",
  },
  {
    order: 7,
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
    order: 8,
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

export interface OtherRepo {
  name: string;
  language: string;
  url: string;
}

export const otherRepos: OtherRepo[] = [
  // TODO replace
  {
    name: "wraith",
    language: "JavaScript",
    url: "https://github.com/QuantumSenpai/wraith",
  },
  // TODO replace
  {
    name: "dev-card",
    language: "CSS",
    url: "https://github.com/QuantumSenpai/dev-card",
  },
  // TODO replace
  {
    name: "Sort-Visualizer",
    language: "JavaScript",
    url: "https://github.com/QuantumSenpai/Sort-Visualizer",
  },
];

export const filters: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "DSA", value: "dsa" },
  { label: "ML / AI", value: "ml" },
  { label: "Game", value: "game" },
];

// ============================================================================
// EDIT HERE — Experience
// ============================================================================

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
  bullets: string[]; // up to 5 — the first entry uses 5, the rest use 3
  stats?: { label: string }[];
  tags: string[];
}

export const experiences: ExperienceEntry[] = [
  {
    id: "nit-durgapur",
    role: "Research Intern — ML & Medical Imaging",
    org: "National Institute of Technology",
    location: "Durgapur, WB",
    dates: "July 2026 – August 2026",
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

// ============================================================================
// EDIT HERE — About / Skills / Services
// ============================================================================

export interface AboutSectionConfig {
  eyebrow: string;
  heading: string;
  bio: string[]; // max 3 short paragraphs
  education: { line: string };
  portrait: { src: string; alt: string; caption: string };
  /** Original About / Skills copy with no slot in the merged layout — kept so nothing is lost. */
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

export interface SkillGroup {
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { label: "Languages & CS", items: ["Java", "C / C++", "DSA", "Python"] },
  { label: "Web", items: ["HTML / CSS / JS", "Flask"] },
  { label: "ML / Data", items: ["Machine Learning", "NLP"] },
  {
    label: "Video / Motion",
    items: ["After Effects", "Premiere Pro", "DaVinci Resolve", "Photoshop"],
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

export interface ReelItem {
  title: string;
  meta: string;
  youtubeId: string;
}

export const reel: ReelItem[] = [
  {
    title: "JJK · Yuta Edit",
    meta: "After Effects · Anime Edit",
    youtubeId: "RSFbZIeSGmg",
  },
  {
    title: "Royalty · Solo Leveling",
    meta: "Motion Design",
    youtubeId: "zp42sJYuLP8",
  },
  {
    title: "JJK S2 Edit",
    meta: "After Effects · Premiere Pro",
    youtubeId: "PMZbuAV5hYQ",
  },
];

export const stats = [
  { label: "Projects shipped", value: 7 },
  { label: "Years building", value: 2 },
  { label: "Edits delivered", value: 30 },
];