export interface NavItemData {
  id: string;
  number: string;
  title: string;
  descriptor: string;
  category: string;
  tags: string[];
  href: string;
  previewImage: string;
  previewMetadata: {
    headline: string;
    caption: string;
    metrics: string;
    accent: string;
  };
}

export const NAV_ITEMS: NavItemData[] = [
  {
    id: "about",
    number: "01",
    title: "About",
    descriptor: "Creative Identity & Founder Vision",
    category: "BACKGROUND & MINDSET",
    tags: ["Frontend Dev", "Founder", "Creative Technologist"],
    href: "#about",
    previewImage: "/images/nav/about.svg",
    previewMetadata: {
      headline: "Engineering with Editorial Intent",
      caption: "Bridging architectural discipline with experimental motion systems and minimalist product craft.",
      metrics: "CHENNAI // CS STUDENT & BUILDER",
      accent: "#9563FF",
    },
  },
  {
    id: "works",
    number: "02",
    title: "Works",
    descriptor: "Selected Production Systems & Labs",
    category: "FEATURED ARCHITECTURE",
    tags: ["Next.js 16", "GSAP Motion", "Creative Engineering"],
    href: "#works",
    previewImage: "/images/nav/works.svg",
    previewMetadata: {
      headline: "High Performance Digital Artifacts",
      caption: "Bespoke web applications, fluid generative UI, and high-framerate brand experiences.",
      metrics: "60 FPS // SUB-MS FLUIDITY",
      accent: "#7040D8",
    },
  },
  {
    id: "resume",
    number: "03",
    title: "Resume",
    descriptor: "Technical Capabilities & Credentials",
    category: "EXPERIENCE & TRAJECTORY",
    tags: ["Full Stack", "System Architecture", "Leadership"],
    href: "#resume",
    previewImage: "/images/nav/resume.svg",
    previewMetadata: {
      headline: "Engineering Trajectory",
      caption: "Computer science foundations applied to modern product building, client work, and OSS.",
      metrics: "FOUNDER @ ALPHA CODEX // 2024+",
      accent: "#C2A8FF",
    },
  },
  {
    id: "blog",
    number: "04",
    title: "Blog",
    descriptor: "ALPHA CodeX Dispatches & Essays",
    category: "DISPATCHES & WRITING",
    tags: ["Design Engineering", "Startups", "Articles"],
    href: "#blog",
    previewImage: "/images/nav/blog.svg",
    previewMetadata: {
      headline: "ALPHA CodeX Chronicles",
      caption: "Explorations on software craftsmanship, animation physics, and building startup experiments.",
      metrics: "TECHNICAL DISPATCHES // ESSAYS",
      accent: "#9563FF",
    },
  },
  {
    id: "contact",
    number: "05",
    title: "Contact",
    descriptor: "Direct Transmissions & Collaborations",
    category: "GLOBAL INQUIRIES",
    tags: ["Selective Projects", "Advisory", "Transmissions"],
    href: "#contact",
    previewImage: "/images/nav/contact.svg",
    previewMetadata: {
      headline: "Initiate Dialogue",
      caption: "Open for selective high-impact creative engineering roles, founding collaborations, and advisory.",
      metrics: "AVAILABLE // RESPONSE < 24H",
      accent: "#C2A8FF",
    },
  },
];

export const PORTFOLIO_META = {
  name: "Dinesh Kumar",
  title: "Frontend Developer • Founder of ALPHA CodeX",
  location: "Chennai, India",
  coordinates: "13.0827° N, 80.2707° E",
  timezone: "Asia/Kolkata",
  socials: [
    { label: "GitHub", href: "https://github.com", icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
    { label: "ALPHA CodeX", href: "#blog", icon: "alpha" },
  ],
};

