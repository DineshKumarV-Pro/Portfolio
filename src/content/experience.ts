export type ExperienceEntry = {
  role: string;
  org: string;
  start: string;
  end: string | "Present";
  summary: string;
  highlights?: string[];
  type: "Internship" | "Freelance" | "Founder" | "Open Source" | "Volunteer" | "Education";
  placeholder?: boolean;
};

export const experience: ExperienceEntry[] = [
  {
    role: "Founder",
    org: "ALPHA CodeX",
    start: "2024",
    end: "Present",
    type: "Founder",
    summary:
      "Building a long-term technology ecosystem connecting learning, building, and opportunity. Owning product direction, design, and engineering.",
    highlights: [
      "Defined mission, brand, and multi-year roadmap",
      "Designing the platform end-to-end as a single founder",
      "Setting the engineering and design standards for the studio",
    ],
  },
  {
    role: "Freelance Frontend Developer",
    org: "Independent",
    start: "2024",
    end: "Present",
    type: "Freelance",
    summary:
      "Partnering with early-stage founders and small teams on landing pages, product UI, and design-system work in React and TypeScript.",
    highlights: [
      "Modern React + TypeScript + Tailwind delivery",
      "Accessibility and performance held as defaults",
      "Available for short and long-engagement contracts",
    ],
  },
  {
    role: "Computer Science Student",
    org: "Undergraduate Program · Chennai",
    start: "2024",
    end: "Present",
    type: "Education",
    summary:
      "Pursuing a Bachelor's in Computer Science while building production projects, contributing on GitHub, and studying systems beyond the classroom.",
    highlights: [
      "Self-directed learning across web, AI, and product",
      "Open to internships and co-op roles for 2026",
    ],
  },
];
