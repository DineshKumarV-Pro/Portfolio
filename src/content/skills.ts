export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

export type Skill = { name: string; level?: SkillLevel };

export type SkillGroup = {
  label: string;
  description: string;
  items: Skill[] | string[];
};

/**
 * Source of truth: personal skills inventory (2026).
 * Levels reflect self-assessed proficiency, not certification.
 */
export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend Engineering",
    description:
      "Day-to-day craft. Building accessible, responsive product interfaces in modern React and TypeScript.",
    items: [
      { name: "HTML5", level: "Advanced" },
      { name: "CSS3", level: "Advanced" },
      { name: "Responsive Web Design", level: "Advanced" },
      { name: "JavaScript (ES6+)", level: "Intermediate" },
      { name: "TypeScript", level: "Beginner" },
      { name: "React.js", level: "Intermediate" },
      { name: "Next.js", level: "Beginner" },
      { name: "Tailwind CSS", level: "Intermediate" },
      { name: "Bootstrap", level: "Intermediate" },
      { name: "REST API Integration", level: "Intermediate" },
      { name: "Web Accessibility (A11y)", level: "Beginner" },
    ],
  },
  {
    label: "Programming Languages",
    description: "Core languages used across coursework, problem solving, and product work.",
    items: [
      { name: "C", level: "Intermediate" },
      { name: "C++", level: "Intermediate" },
      { name: "JavaScript", level: "Intermediate" },
      { name: "TypeScript", level: "Beginner" },
      { name: "Java", level: "Beginner" },
      { name: "Python", level: "Beginner" },
      { name: "SQL", level: "Beginner" },
    ],
  },
  {
    label: "Backend Development",
    description:
      "Server-side fundamentals I am actively growing into through full-stack project work.",
    items: [
      { name: "Node.js", level: "Beginner" },
      { name: "Express.js", level: "Beginner" },
      { name: "REST API Development", level: "Beginner" },
      { name: "Authentication (JWT / OAuth)", level: "Beginner" },
    ],
  },
  {
    label: "Databases",
    description: "Relational and document data systems used across personal and learning projects.",
    items: [
      { name: "MySQL", level: "Beginner" },
      { name: "PostgreSQL", level: "Beginner" },
      { name: "MongoDB", level: "Beginner" },
      { name: "Firebase", level: "Beginner" },
      { name: "Supabase", level: "Beginner" },
    ],
  },
  {
    label: "AI & Developer Productivity",
    description:
      "AI tools and workflows that accelerate research, design, and shipping. Treated as leverage, not a replacement for thinking.",
    items: [
      { name: "ChatGPT", level: "Advanced" },
      { name: "AI-assisted Development", level: "Advanced" },
      { name: "Prompt Engineering", level: "Intermediate" },
      { name: "DeepSeek", level: "Intermediate" },
      { name: "Blackbox AI", level: "Intermediate" },
      { name: "GitHub Copilot", level: "Beginner" },
      { name: "Claude", level: "Beginner" },
      { name: "Gemini", level: "Beginner" },
    ],
  },
  {
    label: "Tools & Workflow",
    description: "The everyday workbench — editor, version control, design, and debugging.",
    items: [
      { name: "VS Code", level: "Advanced" },
      { name: "Git", level: "Intermediate" },
      { name: "GitHub", level: "Intermediate" },
      { name: "npm", level: "Intermediate" },
      { name: "pnpm", level: "Beginner" },
      { name: "Chrome DevTools", level: "Intermediate" },
      { name: "Figma", level: "Beginner" },
      { name: "Postman", level: "Beginner" },
      { name: "Docker", level: "Beginner" },
      { name: "Linux", level: "Beginner" },
    ],
  },
  {
    label: "Deployment & Hosting",
    description: "Where projects ship and live in production.",
    items: [
      { name: "GitHub Pages", level: "Intermediate" },
      { name: "Vercel", level: "Intermediate" },
      { name: "Netlify", level: "Beginner" },
      { name: "Render", level: "Beginner" },
    ],
  },
  {
    label: "Development Practices",
    description: "How I work day-to-day — design and engineering habits.",
    items: [
      { name: "Responsive Design", level: "Advanced" },
      { name: "Component-Based Architecture", level: "Intermediate" },
      { name: "Version Control", level: "Intermediate" },
      { name: "UI / UX Principles", level: "Intermediate" },
      { name: "Problem Solving", level: "Intermediate" },
      { name: "Debugging", level: "Intermediate" },
    ],
  },
  {
    label: "Founder & Human Skills",
    description: "The non-code work that turns projects into products and ideas into outcomes.",
    items: [
      "Product thinking",
      "Roadmapping",
      "Writing & documentation",
      "Brand & visual identity",
      "Communication",
      "Self-direction",
      "Mentoring",
    ],
  },
];
