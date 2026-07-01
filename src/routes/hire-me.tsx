import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  Check,
  Clock,
  Download,
  Globe2,
  Handshake,
  Mail,
  MapPin,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Reveal } from "@/components/common/Reveal";
import { Eyebrow, SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { site } from "@/content/site";
import { buildPageHead } from "@/lib/seo";

const meta = {
  path: "/hire-me",
  metaTitle: "Hire me — Dinesh Kumar V · Frontend Developer & Product Builder",
  description:
    "Open to internships, full-time frontend roles, and freelance engagements. React, TypeScript, and Tailwind specialist based in Chennai, India — available remote or hybrid.",
};

export const Route = createFileRoute("/hire-me")({
  head: buildPageHead({
    title: meta.metaTitle,
    description: meta.description,
    path: meta.path,
  }),
  component: HireMePage,
});

const availability = [
  {
    icon: Briefcase,
    label: "Internships",
    status: "Open",
    body: "Frontend / product engineering internships for 2026 cohorts.",
  },
  {
    icon: Sparkles,
    label: "Full-time roles",
    status: "Open · graduate 2029",
    body: "New-grad and early-career roles for 2029. Pipeline conversations welcome now.",
  },
  {
    icon: Handshake,
    label: "Freelance",
    status: "Open",
    body: "Short engagements, landing pages, and product UI sprints.",
  },
  {
    icon: MessageSquare,
    label: "Collaborations",
    status: "Selective",
    body: "Building with founders and indie teams who care about craft.",
  },
];

const valueProps = [
  {
    title: "Ship-ready frontend",
    body: "Production React + TypeScript + Tailwind, accessible by default, responsive across every breakpoint.",
  },
  {
    title: "Product-minded engineering",
    body: "I ask why before I write the component. Scope, edge cases, and user reality come before pixels.",
  },
  {
    title: "Founder's ownership",
    body: "I run ALPHA CodeX as a multi-year studio. I show up with the same accountability inside other teams.",
  },
  {
    title: "Clear communication",
    body: "Async-friendly, written updates, predictable response times across timezones.",
  },
];

const idealMatch = [
  "Teams that value craft and accessibility",
  "Early-stage products that need a careful frontend",
  "Design systems and component library work",
  "AI-assisted product surfaces",
  "Long-term collaborations over one-shot gigs",
];

const notIdeal = [
  'Template-driven "build it cheap" sites',
  "Crypto or speculative gambling products",
  "Projects without a real problem statement",
];

const faqs = [
  {
    q: "Are you open to internships right now?",
    a: "Yes. I'm actively open to frontend, product, and AI-assisted internships in 2026 — remote, hybrid in Chennai, or fully on-site in India.",
  },
  {
    q: "Can you take freelance work alongside your degree?",
    a: "Yes, within scope. I keep client engagements focused so quality stays high and coursework doesn't suffer. I'm transparent about timelines before signing anything.",
  },
  {
    q: "What's your typical response time?",
    a: "Within 24–48 hours on weekdays for serious inquiries. Recruiter and founder messages get priority.",
  },
  {
    q: "Do you work async or sync?",
    a: "Async-first by default — written updates, recorded walkthroughs, clear docs. I block live time for kickoffs, reviews, and the moments where real-time conversation actually matters.",
  },
  {
    q: "Do you take equity-only work?",
    a: "Rarely. I'll consider mixed compensation for founder-shaped collaborations where I genuinely believe in the team.",
  },
];

function HireMePage() {
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
          <Breadcrumbs items={[{ label: "Hire me" }]} />
        </div>

        {/* Hero */}
        <Reveal>
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
            <div className="flex max-w-[64ch] flex-col gap-5">
              <Eyebrow tone="accent">
                <span
                  className="inline-block size-1.5 rounded-full bg-[var(--success)]"
                  aria-hidden
                />
                Currently accepting inquiries
              </Eyebrow>
              <h1 className="text-display-xl text-balance-tight text-foreground">
                Hire a frontend engineer who treats your product like their own.
              </h1>
              <p className="text-lede text-balance-pretty text-muted-foreground">
                I'm {site.name} — a frontend developer, product builder, and founder of ALPHA CodeX.
                Open to internships, full-time roles, and freelance engagements in React,
                TypeScript, and AI-assisted product work.
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                <Button asChild variant="primary" size="lg">
                  <Link to="/contact">
                    Start a conversation <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={site.resumeUrl} download>
                    <Download className="size-4" /> Download resume
                  </a>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <a href={`mailto:${site.email}`}>
                    <Mail className="size-4" /> {site.email}
                  </a>
                </Button>
              </div>
            </div>

            <div className="surface-card p-6">
              <div className="text-mono-label text-muted-foreground">Quick facts</div>
              <ul className="mt-5 space-y-4 text-[14.5px] text-foreground/90">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 text-[var(--brand)]" aria-hidden />
                  <span>{site.location} · IST (UTC+5:30)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Globe2 className="mt-0.5 size-4 text-[var(--brand)]" aria-hidden />
                  <span>Remote, hybrid, or on-site within India</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-4 text-[var(--brand)]" aria-hidden />
                  <span>Response within 24–48h on weekdays</span>
                </li>
                <li className="flex items-start gap-3">
                  <Briefcase className="mt-0.5 size-4 text-[var(--brand)]" aria-hidden />
                  <span>Internships · Freelance · 2029 grad roles</span>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Availability matrix */}
        <Reveal delay={0.04} className="mt-20">
          <SectionHeading
            size="md"
            eyebrow="What I'm open to"
            title="Engagement types, at a glance."
            description="Use this to decide whether a conversation makes sense before you write the message."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {availability.map((a, i) => {
            const Icon = a.icon;
            return (
              <Reveal key={a.label} delay={i === 0 ? 0 : 0.03}>
                <article className="surface-card flex h-full items-start gap-4 p-6">
                  <div className="grid size-10 flex-none place-items-center rounded-lg border border-[var(--border-strong)] bg-surface/60">
                    <Icon className="size-4 text-[var(--brand)]" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-h3 text-foreground">{a.label}</h3>
                      <span className="rounded-full border border-[var(--brand)]/30 bg-[var(--brand-soft)] px-2 py-0.5 text-mono-meta text-[var(--brand)]">
                        {a.status}
                      </span>
                    </div>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                      {a.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Value props */}
        <Reveal delay={0.04} className="mt-20">
          <SectionHeading size="md" eyebrow="Why work with me" title="What you actually get." />
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {valueProps.map((v, i) => (
            <Reveal key={v.title} delay={i === 0 ? 0 : 0.03}>
              <article className="surface-card h-full p-6">
                <h3 className="text-h3 text-foreground">{v.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{v.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Fit / not fit */}
        <Reveal delay={0.04} className="mt-20">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="surface-card p-7">
              <Eyebrow tone="accent">Great fit</Eyebrow>
              <h3 className="mt-5 text-h2 text-foreground">When I'm the right call</h3>
              <ul className="mt-5 space-y-2.5 text-[14.5px] text-foreground/90">
                {idealMatch.map((m) => (
                  <li key={m} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 text-[var(--brand)]" aria-hidden />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="surface-card p-7">
              <Eyebrow>Not a fit</Eyebrow>
              <h3 className="mt-5 text-h2 text-foreground">When to skip me</h3>
              <ul className="mt-5 space-y-2.5 text-[14.5px] text-muted-foreground">
                {notIdeal.map((m) => (
                  <li key={m} className="flex items-start gap-2.5">
                    <span
                      aria-hidden
                      className="mt-2 size-1 flex-none rounded-full bg-muted-foreground/60"
                    />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[13.5px] text-muted-foreground/80">
                I'd rather decline than over-promise. Transparency now saves both of us later.
              </p>
            </article>
          </div>
        </Reveal>

        {/* Process */}
        <Reveal delay={0.04} className="mt-20">
          <SectionHeading
            size="md"
            eyebrow="How it starts"
            title="From first message to working together."
          />
        </Reveal>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Reach out",
              body: "Send a short note via email or the contact page describing the work.",
            },
            {
              step: "02",
              title: "Quick alignment",
              body: "A 20–30 min call or async exchange to confirm fit, scope, and timeline.",
            },
            {
              step: "03",
              title: "Start small",
              body: "Defined first deliverable so we both have evidence before scaling up.",
            },
          ].map((s, i) => (
            <Reveal key={s.step} delay={i === 0 ? 0 : 0.04}>
              <li className="surface-card h-full p-6">
                <div className="text-mono-meta text-[var(--brand)]">{s.step}</div>
                <h3 className="mt-3 text-h3 text-foreground">{s.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        {/* FAQ */}
        <Reveal delay={0.04} className="mt-20">
          <SectionHeading size="md" eyebrow="FAQ" title="Common questions, answered upfront." />
        </Reveal>
        <Reveal delay={0.05} className="mt-8">
          <div className="surface-card p-2 md:p-4">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`q-${i}`}>
                  <AccordionTrigger className="px-4 text-left text-[15px] text-foreground">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 text-[14.5px] leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.05} className="mt-16">
          <div className="surface-card flex flex-wrap items-center justify-between gap-5 p-7 md:p-9">
            <div className="max-w-[52ch]">
              <Eyebrow tone="accent">Ready when you are</Eyebrow>
              <h3 className="mt-4 text-h1 text-balance-tight text-foreground">
                Let's see if there's a fit.
              </h3>
              <p className="mt-3 text-[15px] text-muted-foreground">
                One short message is enough. Tell me about the team, the work, and the timeline.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="primary" size="lg">
                <Link to="/contact">
                  Contact <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/services">View services</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
