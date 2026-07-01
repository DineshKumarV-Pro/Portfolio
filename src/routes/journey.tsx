import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Reveal } from "@/components/common/Reveal";
import { Eyebrow, SectionHeading } from "@/components/common/SectionHeading";
import { buildPageHead } from "@/lib/seo";

const meta = {
  path: "/journey",
  metaTitle: "Journey — Dinesh Kumar V",
  description:
    "A founder's story, chapter by chapter — from a Biology background to Computer Science, the first lines of code, the first shipped project, and the founding of ALPHA CodeX.",
};

export const Route = createFileRoute("/journey")({
  head: buildPageHead({
    title: meta.metaTitle,
    description: meta.description,
    path: meta.path,
  }),
  component: JourneyPage,
});

type Chapter = {
  index: string;
  year: string;
  title: string;
  body: string[];
};

const chapters: Chapter[] = [
  {
    index: "01",
    year: "Before",
    title: "Curiosity, in a Biology classroom.",
    body: [
      "I grew up curious — about how things work, why people behave the way they do, and what made one solution better than another. Higher Secondary School placed me in the Biology stream, and for a while, that felt like the path: medicine, sciences, the predictable arc.",
      "But the questions I kept asking weren't about cells. They were about systems — about software, about how websites and apps actually got built, about who designed the interfaces I was using every day.",
    ],
  },
  {
    index: "02",
    year: "2023 — 2025",
    title: "Discovering technology — and choosing it.",
    body: [
      "I finished Class X in 2023 and Class XII in 2025 at Vailankanni Matriculation Higher Secondary School with full attendance through both years. Outside the classroom, the interest had become impossible to ignore. I started exploring programming, watching how websites were structured, and tinkering with HTML, CSS, and JavaScript.",
      "Each small experiment turned into a bigger one. A page became a layout. A layout became a small project. Somewhere in there, the decision made itself: I wasn't going to study Biology in college. I was going to study Computer Science.",
    ],
  },
  {
    index: "03",
    year: "2024",
    title: "First shipped project — Weatherly Wave.",
    body: [
      "Weatherly Wave was the first project I designed, built, and deployed end-to-end. It's a responsive weather application built with React, JavaScript, and Tailwind, pulling live data from a weather API and rendering it through a clean, focused interface.",
      "It wasn't just an exercise. Shipping it taught me what tutorials couldn't: how to read API documentation, handle async state, design for mobile and desktop in parallel, recover from broken inputs, and put a real URL in front of real users. The moment the site went live, the way I thought about my work changed.",
    ],
  },
  {
    index: "04",
    year: "2024",
    title: "Founding ALPHA CodeX.",
    body: [
      "The more I built, the more I noticed a pattern in everyone around me trying to learn technology. The information was everywhere — courses, videos, blogs, certifications — but the bridge between learning and meaningful achievement was almost nowhere. Smart, hard-working people were stuck.",
      "ALPHA CodeX started as my answer. Not a course platform, not a freelance shop — a long-term technology ecosystem that connects learning, building, verification, and opportunity. It's a multi-year commitment, and 2024 was the year I committed to it publicly.",
    ],
  },
  {
    index: "05",
    year: "2025",
    title: "Engineering school, freelance, and a public practice.",
    body: [
      "I joined Alpha College of Engineering under Anna University to pursue B.E. in Computer Science and Engineering, expected 2025–2029. Inside the program, I focus on the fundamentals — data structures, databases, operating systems, networks, AI, software engineering. Outside it, I keep shipping.",
      "I opened a freelance frontend practice, started partnering with early-stage founders on landing pages and product UI, and made writing and building in public a non-negotiable habit. The first two semesters carried 100% attendance.",
    ],
  },
  {
    index: "06",
    year: "2025 — 2026",
    title: "Going deeper: AI, full-stack, and ZentraTask.",
    body: [
      "The current chapter is depth. I'm building ZentraTask AI — an AI-assisted productivity platform — and ZenoKart, a modern e-commerce platform. Both push me beyond pure frontend into product thinking, AI integration, full-stack architecture, and the kind of trade-offs that only show up when you take a project all the way through.",
      "This site is part of that chapter too: the long-term home for my work, the ALPHA CodeX studio, and the writing that will document the path forward.",
    ],
  },
  {
    index: "07",
    year: "Next",
    title: "Internships, open source, and ALPHA CodeX v1.",
    body: [
      "The near future is clear. Land meaningful internships with teams that take craft seriously. Contribute to open source projects whose code I respect. Ship the first public version of the ALPHA CodeX platform. Keep raising the bar on the standard of work I publish.",
      "Long term, the goal is to grow into a globally respected technology entrepreneur — known for products that solve real problems and for creating opportunities that help others do the same. This is the start of that story, not the end of it.",
    ],
  },
];

function JourneyPage() {
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
          <Breadcrumbs items={[{ label: "Journey" }]} />
        </div>

        <Reveal>
          <div className="flex max-w-[64ch] flex-col gap-5">
            <Eyebrow>The journey</Eyebrow>
            <h1 className="text-display-xl text-balance-tight text-foreground">
              From curiosity to a long-term commitment.
            </h1>
            <p className="text-lede text-balance-pretty text-muted-foreground">
              The story of how I got here — Biology to Computer Science, first shipped project,
              founding ALPHA CodeX, and what's next. Told in chapters, not bullet points.
            </p>
          </div>
        </Reveal>

        {/* Chapters */}
        <div className="mt-20 space-y-16 md:space-y-20">
          {chapters.map((c, i) => (
            <Reveal key={c.index} delay={i === 0 ? 0 : 0.05}>
              <article className="grid gap-8 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-12">
                <div className="md:sticky md:top-28 md:self-start">
                  <div className="text-mono-label text-[var(--brand)]">Chapter {c.index}</div>
                  <div className="mt-2 text-mono-meta text-muted-foreground">{c.year}</div>
                </div>
                <div className="max-w-[68ch]">
                  <h2 className="text-h1 text-balance-tight text-foreground">{c.title}</h2>
                  <div className="mt-5 space-y-5 text-[16.5px] leading-[1.75] text-foreground/85">
                    {c.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Related */}
        <Reveal delay={0.05} className="mt-24">
          <SectionHeading
            size="md"
            eyebrow="Keep reading"
            title="See the work, not just the words."
          />
          <ul className="mt-6 flex flex-wrap gap-2">
            {[
              { label: "Visual timeline", href: "/timeline" },
              { label: "Experience", href: "/experience" },
              { label: "Projects", href: "/projects" },
              { label: "ALPHA CodeX", href: "/alpha-codex" },
              { label: "Vision", href: "/vision" },
              { label: "Now", href: "/now" },
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
