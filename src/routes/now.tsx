import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Circle } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Reveal } from "@/components/common/Reveal";
import { Eyebrow, SectionHeading } from "@/components/common/SectionHeading";
import { site } from "@/content/site";
import { buildPageHead } from "@/lib/seo";

const meta = {
  path: "/now",
  metaTitle: "Now — Dinesh Kumar V",
  description:
    "What I'm building, learning, and prioritizing right now — plus current availability. Updated regularly. Inspired by Derek Sivers' /now movement.",
};

const LAST_UPDATED = "June 2026";

export const Route = createFileRoute("/now")({
  head: buildPageHead({
    title: meta.metaTitle,
    description: meta.description,
    path: meta.path,
  }),
  component: NowPage,
});

const building = [
  {
    title: "ALPHA CodeX — public surface and identity",
    why: "It's the studio I'm committing the next decade to. Getting the public-facing layer right is the foundation everything else builds on.",
  },
  {
    title: "ZentraTask AI — productivity platform prototype",
    why: "I want to learn AI integration the only way that sticks: by shipping a real product whose recommendations have to be useful, not just demo-pretty.",
  },
  {
    title: "ZenoKart — modern e-commerce platform",
    why: "A clean storefront teaches full-stack trade-offs you can't learn from tutorials: auth, carts, orders, performance under real flows.",
  },
  {
    title: "This personal site",
    why: "The long-term home for projects, writing, and the studio. Built with TanStack Start, TypeScript, and Tailwind, and treated as a real product.",
  },
];

const learning = [
  {
    title: "TypeScript depth",
    why: "Levelling from comfortable to fluent. Generics, inference, and type-driven design make every project I touch more reliable.",
  },
  {
    title: "Next.js and TanStack Start (SSR / RSC)",
    why: "Modern rendering models are where serious frontend work is going. I want to ship with them, not just read about them.",
  },
  {
    title: "AI integration and prompt design",
    why: "AI is becoming a core layer of products, not a side feature. I'm learning to design with LLMs as a first-class capability.",
  },
  {
    title: "CS fundamentals (DSA, OS, DBMS, Networks)",
    why: "Coursework I take seriously — they make me a better engineer, not just a degree holder.",
  },
];

const focus = [
  {
    title: "Become an excellent frontend engineer",
    why: "Frontend is the front door to everything I want to ship. Depth here multiplies every later move.",
  },
  {
    title: "Ship ALPHA CodeX v1",
    why: "Turning the studio from a brand into a usable product is the milestone I'm building toward.",
  },
  {
    title: "Build in public",
    why: "Documenting the journey is how I attract the right collaborators and create accountability for the standard of work.",
  },
];

const goals = [
  "Land a high-quality internship with a team that takes craft seriously",
  "Ship the first public version of ALPHA CodeX",
  "Contribute consistently to open source projects I respect",
  "Strengthen full-stack and AI capabilities through real product work",
  "Maintain academic discipline alongside building",
];

function NowPage() {
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
          <Breadcrumbs items={[{ label: "Now" }]} />
        </div>

        <Reveal>
          <div className="flex max-w-[64ch] flex-col gap-5">
            <Eyebrow>
              <Circle className="size-2.5 fill-emerald-500 text-emerald-500" aria-hidden />
              Currently active
            </Eyebrow>
            <h1 className="text-display-xl text-balance-tight text-foreground">
              What I'm working on, right now.
            </h1>
            <p className="text-lede text-balance-pretty text-muted-foreground">
              A snapshot of where my time and attention go this season — what I'm building, what I'm
              learning, and what I'm saying yes (and no) to.
            </p>
            <p className="text-mono-meta text-muted-foreground">Last updated · {LAST_UPDATED}</p>
          </div>
        </Reveal>

        {/* Building */}
        <Reveal delay={0.05} className="mt-16">
          <SectionHeading size="md" eyebrow="Building" title="What I'm building" />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {building.map((b) => (
              <Item key={b.title} title={b.title} body={b.why} />
            ))}
          </div>
        </Reveal>

        {/* Learning */}
        <Reveal delay={0.05} className="mt-16">
          <SectionHeading size="md" eyebrow="Learning" title="What I'm learning" />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {learning.map((b) => (
              <Item key={b.title} title={b.title} body={b.why} />
            ))}
          </div>
        </Reveal>

        {/* Focus */}
        <Reveal delay={0.05} className="mt-16">
          <SectionHeading size="md" eyebrow="Focus" title="Current focus" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {focus.map((b) => (
              <Item key={b.title} title={b.title} body={b.why} />
            ))}
          </div>
        </Reveal>

        {/* Goals + availability */}
        <Reveal delay={0.05} className="mt-16 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="surface-card p-7">
            <Eyebrow>Goals</Eyebrow>
            <h3 className="mt-4 text-h2 text-foreground">Career goals — this year</h3>
            <ul className="mt-5 space-y-2 text-[15px] text-foreground/85">
              {goals.map((g) => (
                <li key={g} className="flex gap-2.5">
                  <span
                    aria-hidden
                    className="mt-2 size-1 flex-none rounded-full bg-[var(--brand)]/70"
                  />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="surface-card flex flex-col justify-between gap-6 p-7">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-mono-label text-emerald-500">
                <Circle className="size-2 fill-emerald-500" aria-hidden /> Available
              </div>
              <h3 className="mt-4 text-h2 text-foreground">Availability</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {site.availability}. Best fit: frontend / product roles, AI-assisted product work,
                and founder-led teams that take craft seriously.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/hire-me"
                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--brand)] px-3.5 py-1.5 text-sm text-white hover:opacity-90"
              >
                Hire me <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-surface/40 px-3.5 py-1.5 text-sm text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Inspired by */}
        <Reveal delay={0.05} className="mt-16">
          <p className="text-mono-meta text-muted-foreground">
            Inspired by{" "}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--brand)] hover:underline"
            >
              the /now page movement
            </a>
            . Updated whenever the answer to "what are you focused on right now?" meaningfully
            changes.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Item({ title, body }: { title: string; body: string }) {
  return (
    <article className="surface-card p-6">
      <h3 className="text-h3 text-foreground">{title}</h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
        <span className="text-mono-label text-[var(--brand)]">Why · </span>
        {body}
      </p>
    </article>
  );
}
