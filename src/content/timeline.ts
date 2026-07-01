export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
  category: "education" | "project" | "founder" | "career" | "future";
  href?: string;
};

export const timeline: TimelineEntry[] = [
  {
    year: "2023",
    title: "Completed Secondary Education (Class X)",
    description:
      "Finished schooling at Vailankanni Matriculation Higher Secondary School with full attendance and a foundation in disciplined, consistent learning.",
    category: "education",
  },
  {
    year: "2024 — 2025",
    title: "Transition from Biology to Computer Science",
    description:
      "Discovered a deep interest in programming, software, and emerging technologies. Began self-learning web development alongside Higher Secondary studies.",
    category: "career",
  },
  {
    year: "2024",
    title: "First production frontend project — Weatherly Wave",
    description:
      "Designed and shipped a responsive weather application with real-time API integration. First end-to-end ownership of design, development, and deployment.",
    category: "project",
    href: "/projects/weatherly-wave",
  },
  {
    year: "2024",
    title: "Founded ALPHA CodeX",
    description:
      "Started ALPHA CodeX as a long-term technology ecosystem to connect learning, building, verification, and opportunity for the next generation of builders.",
    category: "founder",
    href: "/alpha-codex",
  },
  {
    year: "2025",
    title: "Completed Higher Secondary (Biology stream)",
    description:
      "Finished Class XII with 100% attendance and made the formal pivot from Biology to Computer Science and Engineering.",
    category: "education",
  },
  {
    year: "2025",
    title: "Started B.E. in Computer Science and Engineering",
    description:
      "Joined Alpha College of Engineering under Anna University to pursue a four-year degree while continuing to build products and grow the studio.",
    category: "education",
  },
  {
    year: "2025",
    title: "Opened freelance frontend practice",
    description:
      "Began partnering with early-stage founders and small teams on landing pages, product UI, and design-system work in React and TypeScript.",
    category: "career",
  },
  {
    year: "2025 — 2026",
    title: "ZentraTask AI and ZenoKart in development",
    description:
      "Designing and building an AI-assisted productivity platform and a modern e-commerce platform to deepen full-stack and AI integration experience.",
    category: "project",
  },
  {
    year: "2026",
    title: "Launched the official personal site",
    description:
      "Shipped this site as the long-term home for projects, writing, and the ALPHA CodeX studio — built with TanStack Start, TypeScript, and Tailwind.",
    category: "project",
  },
  {
    year: "2027 — 2029",
    title: "Internships, open-source, and ALPHA CodeX v1",
    description:
      "Plan: secure meaningful internships, contribute to open source, and ship the first public version of the ALPHA CodeX platform.",
    category: "future",
  },
  {
    year: "Beyond",
    title: "Scale ALPHA CodeX into a global studio",
    description:
      "Grow ALPHA CodeX into a recognized technology studio building products, learning experiences, and opportunities for builders worldwide.",
    category: "future",
  },
];
