import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Reveal } from "@/components/common/Reveal";
import { Eyebrow, SectionHeading } from "@/components/common/SectionHeading";
import { experience, type ExperienceEntry } from "@/content/experience";
import { buildPageHead } from "@/lib/seo";

const meta = {
  path: "/experience",
  metaTitle: "Experience — Dinesh Kumar V",
  description:
    "Founder work at ALPHA CodeX, freelance frontend engagements, and an active Computer Science degree — with context, responsibilities, and skills developed.",
};

export const Route = createFileRoute("/experience")({
  head: buildPageHead({
    title: meta.metaTitle,
    description: meta.description,
    path: meta.path,
  }),
  component: ExperiencePage,
});

type Detail = {
  context: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  skills: string[];
};

const DETAILS: Record<string, Detail> = {
  "Founder · ALPHA CodeX": {
    context:
      "ALPHA CodeX is a long-term, execution-focused technology ecosystem connecting learning, building, verification, and opportunity. I founded it in 2024 as a multi-year personal commitment.",
    responsibilities: [
      "Setting the mission, brand, and multi-year roadmap",
      "Designing the product end-to-end as a single founder",
      "Defining the engineering and design standards for the studio",
      "Documenting the journey publicly to attract aligned builders",
    ],
    technologies: ["TanStack Start", "TypeScript", "React", "Tailwind", "Supabase", "AI Gateway"],
    achievements: [
      "Published the official studio identity and mission",
      "Architected the long-term ecosystem across learning, building, and opportunity",
      "Shipped the first public surface of the studio (this site)",
    ],
    skills: [
      "Product thinking",
      "Strategy and roadmapping",
      "Brand and writing",
      "Full-stack engineering",
      "Self-leadership",
    ],
  },
  "Freelance Frontend Developer · Independent": {
    context:
      "Partnering with early-stage founders and small teams who need a frontend engineer that cares about craft, accessibility, and shipping on time.",
    responsibilities: [
      "Translating product requirements into clean, accessible React UIs",
      "Building responsive landing pages and product surfaces",
      "Setting up design systems and reusable component patterns",
      "Owning delivery from design hand-off to deployed URL",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Next.js", "Vercel", "Git"],
    achievements: [
      "Available for short engagements and longer-term contracts",
      "Modern React + TypeScript + Tailwind delivery as the baseline",
      "Accessibility and performance treated as defaults, not extras",
    ],
    skills: [
      "Client communication",
      "Scope shaping",
      "Component architecture",
      "Design system thinking",
      "Shipping under constraint",
    ],
  },
  "Computer Science Student · Undergraduate Program · Chennai": {
    context:
      "Pursuing B.E. in Computer Science and Engineering at Alpha College of Engineering under Anna University, expected 2025–2029. The degree provides depth; the parallel building provides momentum.",
    responsibilities: [
      "Studying programming, data structures, databases, OS, networks, AI, and software engineering",
      "Maintaining academic discipline alongside production project work",
      "Self-directing learning across modern web, AI, and product",
    ],
    technologies: ["C", "C++", "Java", "Python", "SQL", "Web stack"],
    achievements: [
      "100% attendance in Semester 1 and Semester 2",
      "Represented Alpha College of Engineering at Chess Zonals",
      "Shipping personal projects in parallel with coursework",
    ],
    skills: ["CS fundamentals", "Problem solving", "Self-directed learning", "Time management"],
  },
};

function ExperiencePage() {
  return (
    <section className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-spotlight"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-dot-grid opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <div className="container-page relative pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="mb-10">
          <Breadcrumbs items={[{ label: "Experience" }]} />
        </div>

        <Reveal>
          <div className="flex max-w-[64ch] flex-col gap-5">
            <Eyebrow>Experience</Eyebrow>
            <h1 className="text-display-xl text-balance-tight text-foreground">
              Roles, responsibilities, and what they shipped.
            </h1>
            <p className="text-lede text-balance-pretty text-muted-foreground">
              Founder work, freelance engagements, and an active Computer Science degree — described
              in the same shape so you can scan them in seconds.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 space-y-10">
          {experience.map((e, i) => {
            const key = `${e.role} · ${e.org}`;
            const d = DETAILS[key];
            return (
              <Reveal key={key} delay={i === 0 ? 0 : 0.04}>
                <Card entry={e} detail={d} />
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.05} className="mt-20">
          <SectionHeading
            size="md"
            eyebrow="Looking ahead"
            title="Open to internships, freelance, and serious collaborations."
            description="If you're hiring or building something with real ambition, I'd love to hear about it."
          />
          <ul className="mt-6 flex flex-wrap gap-2">
            {[
              { label: "Resume", href: "/resume" },
              { label: "Hire me", href: "/hire-me" },
              { label: "Contact", href: "/contact" },
              { label: "Projects", href: "/projects" },
              { label: "Skills", href: "/skills" },
            ].map((r) => (
              <li key={r.href}>
                <Link
                  to={r.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-surface/40 px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                >
                  {r.label} <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function Card({ entry, detail }: { entry: ExperienceEntry; detail?: Detail }) {
  return (
    <article className="surface-card p-7 md:p-9">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-[var(--border)] bg-surface/60 px-2 py-0.5 text-mono-meta text-muted-foreground">
              {entry.type}
            </span>
            <span className="text-mono-meta text-muted-foreground">
              {entry.start} — {entry.end}
            </span>
          </div>
          <h2 className="mt-3 text-h1 text-balance-tight text-foreground">{entry.role}</h2>
          <p className="mt-1 text-[15px] text-foreground/80">{entry.org}</p>
        </div>
      </div>

      <p className="mt-5 max-w-[68ch] text-[15.5px] leading-relaxed text-muted-foreground">
        {entry.summary}
      </p>

      {detail ? (
        <div className="mt-7 grid gap-6 md:grid-cols-2">
          <Block label="Context">{detail.context}</Block>
          <Block label="Responsibilities">
            <ul className="space-y-1.5">
              {detail.responsibilities.map((r) => (
                <li key={r} className="flex gap-2">
                  <span
                    aria-hidden
                    className="mt-2 size-1 flex-none rounded-full bg-[var(--brand)]/70"
                  />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Block>
          <Block label="Achievements">
            <ul className="space-y-1.5">
              {detail.achievements.map((r) => (
                <li key={r} className="flex gap-2">
                  <span
                    aria-hidden
                    className="mt-2 size-1 flex-none rounded-full bg-[var(--brand)]/70"
                  />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Block>
          <Block label="Skills developed">
            <div className="flex flex-wrap gap-1.5">
              {detail.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-[var(--border)] bg-surface/60 px-2.5 py-1 text-[13px] text-foreground/85"
                >
                  {s}
                </span>
              ))}
            </div>
          </Block>
          <div className="md:col-span-2">
            <div className="text-mono-label text-muted-foreground">Technologies</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {detail.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-[var(--brand)]/20 bg-[var(--brand-soft)] px-2.5 py-1 text-[13px] text-[var(--brand)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-mono-label text-muted-foreground">{label}</div>
      <div className="mt-3 text-[14.5px] leading-relaxed text-foreground/85">{children}</div>
    </div>
  );
}
