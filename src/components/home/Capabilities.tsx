import { Code2, PenTool, Sparkles, Database, Cloud, Users } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";

const capabilities = [
  {
    icon: Code2,
    title: "Frontend engineering",
    body: "Production React, TypeScript, and TanStack Start work. Component systems, routing, performance, and accessibility as defaults — not afterthoughts.",
    tags: ["React", "TypeScript", "TanStack", "Tailwind"],
  },
  {
    icon: PenTool,
    title: "Product & UI design",
    body: "Designing in Figma and code together — interaction details, design tokens, and systems that scale beyond a single screen.",
    tags: ["Figma", "Design systems", "Accessibility"],
  },
  {
    icon: Sparkles,
    title: "AI-assisted products",
    body: "Wiring LLMs into real product flows — planning, summarising, structuring inputs — and shipping useful AI features instead of demos.",
    tags: ["AI Gateway", "OpenAI", "Prompt design"],
  },
  {
    icon: Database,
    title: "Backend & data",
    body: "Pragmatic full-stack work in Node, PostgreSQL, and Supabase. Schemas, auth, and APIs that the frontend actually wants to consume.",
    tags: ["Node.js", "PostgreSQL", "Supabase"],
  },
  {
    icon: Cloud,
    title: "Cloud & shipping",
    body: "Edge deploys on Cloudflare and Vercel, CI on GitHub Actions, and the boring discipline of measuring real-world performance.",
    tags: ["Cloudflare", "Vercel", "GitHub Actions"],
  },
  {
    icon: Users,
    title: "Founder craft",
    body: "Roadmapping, writing, brand, and documentation — the communication work that turns code into a product people can actually use.",
    tags: ["Product thinking", "Writing", "Mentoring"],
  },
];

export function Capabilities() {
  return (
    <section className="container-page section">
      <Reveal>
        <SectionHeading
          eyebrow="Capabilities"
          title="One builder, across the full product stack."
          description="The same person who designs the interface ships the code, owns the data layer, and writes the docs. That coherence is the point — and it&rsquo;s what makes small teams ship like big ones."
        />
      </Reveal>
      <div className="mt-14 grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {capabilities.map((c, i) => (
          <Reveal key={c.title} delay={0.04 * i}>
            <div className="surface-card hover-lift group flex h-full flex-col p-6 md:p-8 hover:border-[var(--border-strong)]">
              <div className="inline-flex size-10 items-center justify-center rounded-md border border-[var(--border-strong)] bg-surface text-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[var(--brand)]/40 group-hover:text-[var(--brand)]">
                <c.icon className="size-5" />
              </div>
              <h3 className="mt-7 text-h2 text-foreground">{c.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{c.body}</p>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-md border border-[var(--border)] bg-surface/60 px-2 py-0.5 text-mono-meta text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
