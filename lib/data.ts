// ============================================================================
// EDIT HERE — Contact / Footer
// ============================================================================

export interface ContactSectionConfig {
  eyebrow: string;
  heading: string;
  subline: string;
}

export const contactSection: ContactSectionConfig = {
  eyebrow: "005 / Contact",
  heading: "Let's build something.",
  subline:
    "Open for freelance — video editing, motion design, web development and content writing. Whether you're a startup, creator or fellow student, let's talk.",
};

export interface ContactFormConfig {
  endpoint: string; // Formspree — the server forwards the submission here
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
    invalidEmail: string;
    invalidRequest: string;
    rateLimited: string;
    sendFailed: string;
    fallbackEmail: string;
  };
}

export const contactForm: ContactFormConfig = {
  endpoint: "https://formspree.io/f/xreydgqn",
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
    invalidEmail: "Please enter a valid email address.",
    invalidRequest:
      "Something went wrong — email itxkisu@gmail.com directly.",
    rateLimited:
      "Too many messages from this connection — please try again later.",
    sendFailed:
      "Network error — please email itxkisu@gmail.com directly.",
    fallbackEmail: "itxkisu@gmail.com",
  },
};

export const email = "work.krishnendu.dev@gmail.com";

export const socials: { label: string; url: string }[] = [
  { label: "GitHub", url: "https://github.com/QuantumSenpai" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/krishnendu158" },
  { label: "Instagram", url: "https://instagram.com/kyzenn.raw" },
];

export const availability: { text: string } = {
  text: "Available for freelance",
};

export const footer: {
  copyright: string;
  signatureAlt: string;
  signatureText: string;
} = {
  copyright: "© {year} — Built with Next.js & Tailwind CSS",
  signatureAlt: "Krishnendu Adak signature",
  signatureText: "Kisu",
};

// ============================================================================
// EDIT HERE — Privacy
// ============================================================================

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
        "Your details are used for one reason: so I can reply to your enquiry.",
      ],
    },
    {
      heading: "Where your message goes",
      paragraphs: [
        "The form posts to the contact endpoint on this site. The server checks that the consent flag is true and that every field is filled in, then forwards the submission to Formspree, which delivers it to my email address.",
        "Formspree is the only third party that receives what you typed in the form. I do not pass your message to any other service.",
      ],
    },
    {
      heading: "Rate limiting",
      paragraphs: [
        "So the form cannot be used as a spam relay, the server counts submissions per client. Before it is used as a key, the client's IP address is hashed with SHA-256, so the address itself is never stored, logged or sent anywhere.",
        "The counters live in server memory only, never on disk, and are thrown away when the server restarts. Expired windows are swept from memory on each request. A client is allowed 5 submissions per 10 minute window; anything over that is rejected with a 429 response.",
      ],
    },
    {
      heading: "Cookies and analytics",
      paragraphs: [
        "This site sets no cookies. There is no analytics package, tag manager or tracking script in the code, so nothing about your visit is measured, profiled or shared.",
        "If you switch between the light and dark theme, that choice is kept in your browser's localStorage under the key 'theme'. It stays on your device and is never sent to me.",
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

// ============================================================================
// EDIT HERE — Reel
// ============================================================================

export interface ReelSectionConfig {
  eyebrow: string;
  heading: string;
  description?: string;
}

export const reelSection: ReelSectionConfig = {
  eyebrow: "004 / Reel",
  heading: "Frames I've cut.",
};

export interface ReelVideo {
  id: string; // YouTube video id — a video without an id is hidden
  title: string;
  caption?: string;
}

export const videos: ReelVideo[] = [
  {
    id: "RSFbZIeSGmg",
    title: "JJK · Yuta Edit",
    caption: "After Effects · Anime Edit",
  },
  {
    id: "zp42sJYuLP8",
    title: "Royalty · Solo Leveling",
    caption: "Motion Design",
  },
  {
    id: "PMZbuAV5hYQ",
    title: "JJK S2 Edit",
    caption: "After Effects · Premiere Pro",
  },
];

export const stats = [
  { label: "Projects shipped", value: 7 },
  { label: "Years building", value: 2 },
  { label: "Edits delivered", value: 30 },
];