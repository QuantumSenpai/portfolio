export const socials = {
  github: "https://github.com/QuantumSenpai",
  linkedin: "https://www.linkedin.com/in/krishnendu158",
  instagram: "https://instagram.com/kyzenn.raw",
  email: "itxkisu@gmail.com",
};

export type ProjectCategory = "web" | "dsa" | "ml" | "game";

export interface Project {
  index: string;
  title: string;
  description: string;
  tags: string[];
  category: ProjectCategory;
  href: string;
  linkLabel: "Code" | "Live" | "Play";
}

export const projects: Project[] = [
  {
    index: "01",
    title: "Sakura Timer",
    description:
      "Anime lofi pomodoro study timer with falling sakura petals, ambient mood and focus tracking.",
    tags: ["HTML", "CSS", "JS"],
    category: "web",
    href: "https://github.com/QuantumSenpai/sakura-timer",
    linkLabel: "Code",
  },
  {
    index: "02",
    title: "Wraith",
    description:
      "A dark, cinematic web project built with precision and a haunting aesthetic.",
    tags: ["HTML", "CSS", "JS"],
    category: "web",
    href: "https://github.com/QuantumSenpai/wraith",
    linkLabel: "Code",
  },
  {
    index: "03",
    title: "SortAnime",
    description:
      "Type numbers, watch them sort in real time — 10 algorithms, dual visualization mode.",
    tags: ["JS", "DSA", "UI"],
    category: "dsa",
    href: "https://quantumsenpai.github.io/Sort-Visualizer",
    linkLabel: "Live",
  },
  {
    index: "04",
    title: "Sentiment Analysis",
    description:
      "NLP-powered customer review insight extraction using Python, NLTK, TextBlob and Flask.",
    tags: ["Python", "NLP", "Flask"],
    category: "ml",
    href: "https://github.com/QuantumSenpai/Sentiment-Analysis-Mini-Project",
    linkLabel: "Code",
  },
  {
    index: "05",
    title: "Dev Card",
    description:
      "Anime lofi developer card — spinning gradient ring, live clock and 3D tilt.",
    tags: ["HTML", "CSS", "JS"],
    category: "web",
    href: "https://quantumsenpai.github.io/dev-card",
    linkLabel: "Live",
  },
  {
    index: "06",
    title: "CyberType",
    description:
      "Neon cyberpunk typing speed test — live WPM, rank system from Recruit to Cyber God.",
    tags: ["HTML", "CSS", "JS"],
    category: "web",
    href: "https://quantumsenpai.github.io/Cyber-Type",
    linkLabel: "Live",
  },
  {
    index: "07",
    title: "MidSem Rush",
    description:
      "Dodge deadlines, slow your HOD and strike with an anime thunder sword. A student runner game.",
    tags: ["HTML", "CSS", "JS", "Game"],
    category: "game",
    href: "https://quantumsenpai.github.io/Midsem-Rush",
    linkLabel: "Play",
  },
];

export const filters: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "DSA", value: "dsa" },
  { label: "ML / AI", value: "ml" },
  { label: "Game", value: "game" },
];

export interface ResearchStat {
  label: string;
  value: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location?: string;
  type: "detailed" | "compact";
  summary: string;
  highlights?: string[];
  problem?: string;
  approach?: string[];
  stack: string[];
  stats?: ResearchStat[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "nit-durgapur",
    role: "Research Intern — ML & Medical Imaging",
    organization: "National Institute of Technology, Durgapur",
    period: "July 2026 – August 2026",
    location: "Durgapur, WB",
    type: "detailed",
    summary:
      "Built a Clinical Decision Support System that classifies Alzheimer's stages from MRI scans and auto-generates a structured diagnostic report — from raw scan to a doctor-readable PDF.",
    problem:
      "Manual MRI review for early-stage Alzheimer's is slow and inconsistent across radiologists. The brief was to prototype a CDSS that classifies scans into four clinical stages and produces a report a clinician can act on immediately.",
    approach: [
      "Trained a ResNet50 classifier (PyTorch, mixed-precision AMP) across four Alzheimer's stages on MRI scan data.",
      "Found and fixed a data-leakage issue between train/test splits using perceptual-hash deduplication — a detail that quietly inflated early accuracy numbers.",
      "Built a FastAPI backend with PostgreSQL (SQLAlchemy + Alembic migrations) to serve predictions and persist patient records.",
      "Auto-generated structured PDF diagnostic reports with ReportLab, and shipped a lightweight frontend for clinicians to upload scans and review results.",
      "Deployed and configured the full stack on a supervisor's machine, including a one-click batch startup script for a non-technical end user.",
    ],
    stack: [
      "PyTorch",
      "ResNet50",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "ReportLab",
    ],
    stats: [
      { label: "Classes", value: "4-stage" },
      { label: "Model", value: "ResNet50" },
      { label: "Training", value: "Mixed precision" },
    ],
  },
  {
    id: "investor-insights",
    role: "Senior Video Editor & YouTube Manager",
    organization: "Investor Insights",
    period: "2023 – 2025",
    location: "Remote",
    type: "compact",
    summary:
      "Led end-to-end video post-production and channel growth strategy for high-impact financial and tech content.",
    highlights: [
      "Produced and edited 50+ high-retention long-form finance & equity analysis videos featuring custom motion graphics in After Effects and Premiere Pro.",
      "Designed dynamic soundscapes, kinetic typography, and data visualization overlays that drove a 35% increase in average viewer watch time.",
      "Managed complete publishing pipeline, content calendar, thumbnail A/B testing, and audience retention analytics.",
    ],
    stack: [
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
    organization: "Independent / Creator Studio",
    period: "2023 – 2025",
    location: "Remote",
    type: "compact",
    summary:
      "Delivering bespoke cinematic edits, anime AMVs, and social media reels for digital creators and brands worldwide.",
    highlights: [
      "Delivered 30+ bespoke cinematic edits, anime motion pieces, and promotional reels with 100% on-time project completion.",
      "Implemented custom 3D camera tracking, complex mask transitions, speed ramps, and precision audio sync in DaVinci Resolve & After Effects.",
      "Collaborated directly with creators from initial storyboard concepts to final 4K rendering and color grading.",
    ],
    stack: [
      "DaVinci Resolve",
      "After Effects",
      "VFX",
      "Anime Edits",
      "Color Grading",
    ],
  },
];

export const research = experiences[0];

export interface SkillGroup {
  title: string;
  skills: { name: string; level: number }[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Development",
    skills: [
      { name: "Java", level: 85 },
      { name: "C / C++", level: 80 },
      { name: "DSA", level: 78 },
      { name: "HTML / CSS / JS", level: 82 },
      { name: "Python", level: 65 },
    ],
  },
  {
    title: "Creative",
    skills: [
      { name: "After Effects", level: 80 },
      { name: "Premiere Pro", level: 82 },
      { name: "DaVinci Resolve", level: 78 },
      { name: "Photoshop", level: 75 },
    ],
  },
  {
    title: "AI / ML — learning",
    skills: [
      { name: "Machine Learning", level: 40 },
      { name: "NLP", level: 35 },
      { name: "Flask", level: 60 },
    ],
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