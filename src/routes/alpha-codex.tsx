import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Compass,
  Target,
  Layers,
  Rocket,
  Users,
  ShieldCheck,
  Network,
  Briefcase,
  FlaskConical,
  GraduationCap,
  Hammer,
  Eye,
  CheckCircle2,
  CircleDot,
  Circle,
  Github,
  Mail,
  Flag,
  Heart,
  Lightbulb,
  Wrench,
  Globe2,
} from "lucide-react";
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
  path: "/alpha-codex",
  metaTitle: "ALPHA CodeX — The studio behind Dinesh Kumar V",
  description:
    "ALPHA CodeX is a long-term technology ecosystem founded by Dinesh Kumar V to bridge the gap between human potential and real-world achievement — learning, building, trust, opportunity, and impact.",
};

export const Route = createFileRoute("/alpha-codex")({
  head: buildPageHead({
    title: meta.metaTitle,
    description: meta.description,
    path: meta.path,
  }),
  component: AlphaCodexPage,
});

/* ---------------- content ---------------- */

const problems = [
  {
    icon: GraduationCap,
    title: "Learning without building",
    body: "Courses end. Tutorials pile up. Yet very little turns into shipped work or earned trust.",
  },
  {
    icon: ShieldCheck,
    title: "Certificates without proof",
    body: "Pieces of paper claim skill, but employers and clients want demonstrated execution, not slides.",
  },
  {
    icon: Network,
    title: "Fragmented opportunities",
    body: "Jobs, freelance, gigs, and open source live on disconnected islands. People fall through the cracks.",
  },
  {
    icon: Users,
    title: "Disconnected communities",
    body: "Builders learn alone. There is no shared space where craft, feedback, and momentum compound.",
  },
  {
    icon: Eye,
    title: "Invisible work",
    body: "Real builders ship in silence. Without visibility, talent never reaches the people who need it.",
  },
  {
    icon: Rocket,
    title: "Aspiration without pathway",
    body: "Potential is abundant. Structured paths from learning to launch to impact are not.",
  },
];

const pillars = [
  {
    icon: GraduationCap,
    name: "ACX Academy",
    bridge: "Learning gap",
    body: "Structured education, roadmaps, bootcamps, and mentorship for skill development.",
  },
  {
    icon: Hammer,
    name: "ACX Build",
    bridge: "Project & experience gap",
    body: "Real-world projects and collaborative development that turn knowledge into shipped work.",
  },
  {
    icon: Eye,
    name: "ACX Talent",
    bridge: "Visibility gap",
    body: "A home for individuals to showcase their skills, projects, and verified capabilities.",
  },
  {
    icon: ShieldCheck,
    name: "ACX Verify",
    bridge: "Trust gap",
    body: "Verification systems and credibility-building mechanisms tied to real execution.",
  },
  {
    icon: Briefcase,
    name: "ACX Marketplace",
    bridge: "Opportunity gap",
    body: "A bridge between talent and meaningful projects, freelance work, and income.",
  },
  {
    icon: Users,
    name: "ACX Community",
    bridge: "Belonging gap",
    body: "A collaborative environment where individuals learn, share, and grow together.",
  },
  {
    icon: Network,
    name: "ACX Network",
    bridge: "Connection gap",
    body: "Relationships, partnerships, and access to broader professional ecosystems.",
  },
  {
    icon: Rocket,
    name: "ACX Launch",
    bridge: "Startup gap",
    body: "Support for ideas as they evolve into products, ventures, and sustainable businesses.",
  },
  {
    icon: Globe2,
    name: "ACX Ventures",
    bridge: "Growth gap",
    body: "Scaling, expansion, and long-term business development for committed builders.",
  },
  {
    icon: FlaskConical,
    name: "ACX Labs",
    bridge: "Innovation gap",
    body: "Experimentation, research, and exploration of future technologies and new possibilities.",
  },
];

const bridge = [
  "Potential",
  "Learning",
  "Building",
  "Identity",
  "Trust",
  "Opportunity",
  "Community",
  "Network",
  "Entrepreneurship",
  "Growth",
  "Innovation",
  "Impact",
];

const initiatives: {
  title: string;
  status: "in-progress" | "concept" | "shipped";
  body: string;
  note?: string;
}[] = [
  {
    title: "ALPHA CodeX Platform",
    status: "in-progress",
    body: "The umbrella product surface — identity, ecosystem entry points, and the long-form story behind the studio.",
    note: "Being designed and engineered in the open.",
  },
  {
    title: "ZentraTask AI",
    status: "in-progress",
    body: "An AI-assisted task and focus product exploring how intelligent automation supports execution, not just planning.",
  },
  {
    title: "ACX Learning Systems",
    status: "concept",
    body: "Roadmaps, programs, and pathways under ACX Academy — designed around shipping, not consuming.",
  },
  {
    title: "Developer Resources",
    status: "concept",
    body: "Open guides, templates, and tooling published as I build — turning private knowledge into shared infrastructure.",
  },
  {
    title: "Future Tools & Labs",
    status: "concept",
    body: "Experiments inside ACX Labs — small, sharp products that test ideas before they graduate into the ecosystem.",
  },
];

const roadmap: {
  phase: string;
  title: string;
  status: "Completed" | "In Progress" | "Planned" | "Future";
  body: string;
}[] = [
  {
    phase: "Phase 01",
    title: "Foundation",
    status: "In Progress",
    body: "Brand, charter, mission, and the long-form story of ALPHA CodeX. The personal site you are reading is part of this phase.",
  },
  {
    phase: "Phase 02",
    title: "Platform",
    status: "Planned",
    body: "The first ALPHA CodeX product surface — identity, profiles, and early ACX Build / ACX Talent capabilities.",
  },
  {
    phase: "Phase 03",
    title: "Community",
    status: "Planned",
    body: "A small, intentional community of builders — feedback loops, build-in-public rituals, and shared standards of craft.",
  },
  {
    phase: "Phase 04",
    title: "Expansion",
    status: "Future",
    body: "Marketplace, verification, and structured pathways from learning into real opportunities.",
  },
  {
    phase: "Phase 05",
    title: "Global Vision",
    status: "Future",
    body: "A multi-product ecosystem helping individuals across the world move from potential to lasting impact.",
  },
];

const values = [
  {
    icon: Hammer,
    title: "Execution over consumption",
    body: "Shipping beats watching. Every program and product is biased toward made things.",
  },
  {
    icon: Eye,
    title: "Build in public",
    body: "Work, decisions, and reasoning shared openly. Visibility is part of the craft.",
  },
  {
    icon: GraduationCap,
    title: "Continuous learning",
    body: "Curiosity is the default. The studio learns alongside the people it serves.",
  },
  {
    icon: Sparkles,
    title: "Craftsmanship",
    body: "Details matter. Type, motion, copy, and behavior are designed with intent.",
  },
  {
    icon: Heart,
    title: "Accessibility",
    body: "Built for as many people as possible — across devices, abilities, and contexts.",
  },
  {
    icon: Compass,
    title: "Long-term thinking",
    body: "Decades, not weeks. Decisions are made for the version of this that exists in 10 years.",
  },
];

const longTerm = [
  {
    horizon: "5 Years",
    body: "Establish ALPHA CodeX as a recognized ecosystem for learning, project development, internships, talent recognition, and professional growth.",
  },
  {
    horizon: "10 Years",
    body: "Expand into a national ecosystem connecting education, industry, startups, and innovators through integrated platforms and opportunities.",
  },
  {
    horizon: "25 Years",
    body: "Become a global growth ecosystem empowering millions through learning, entrepreneurship, innovation, and community-driven development.",
  },
  {
    horizon: "50 Years",
    body: "Serve as long-term human-potential infrastructure that helps future generations discover, develop, and deploy their capabilities.",
  },
];

const faqs = [
  {
    q: "What is ALPHA CodeX?",
    a: "ALPHA CodeX is a long-term technology studio and ecosystem founded by Dinesh Kumar V. Its mission is to bridge the gap between human potential and real-world achievement by connecting learning, building, trust, opportunity, and impact in one structured environment.",
  },
  {
    q: "Who is it for?",
    a: "Students, self-taught builders, freelancers, early founders, and anyone who wants a structured pathway from skill to shipped work to lasting impact. It is built for people who care about execution.",
  },
  {
    q: "Is it available today?",
    a: "ALPHA CodeX is in its foundation phase. The studio, brand, and first products — including this site and ZentraTask AI — are being designed and engineered in the open. Larger platform capabilities are planned across upcoming phases.",
  },
  {
    q: "Can I contribute or collaborate?",
    a: "Yes — early collaborators, mentors, and design / engineering partners are welcome. Reach out via the contact page and tell me what you would like to build together.",
  },
  {
    q: "How do I follow the journey?",
    a: "Follow along on GitHub and through the writing and updates published on this site. Everything meaningful will be shared as it ships.",
  },
];

/* ---------------- helpers ---------------- */

function StatusDot({ status }: { status: string }) {
  const map: Record<string, { cls: string; icon: typeof CheckCircle2 }> = {
    Completed: { cls: "text-emerald-500", icon: CheckCircle2 },
    "In Progress": { cls: "text-[var(--brand)]", icon: CircleDot },
    Planned: { cls: "text-muted-foreground", icon: Circle },
    Future: { cls: "text-muted-foreground/60", icon: Circle },
    "in-progress": { cls: "text-[var(--brand)]", icon: CircleDot },
    concept: { cls: "text-muted-foreground", icon: Circle },
    shipped: { cls: "text-emerald-500", icon: CheckCircle2 },
  };
  const { cls, icon: Icon } = map[status] ?? map.Planned;
  return <Icon className={`size-3.5 ${cls}`} aria-hidden />;
}

function statusLabel(s: string) {
  if (s === "in-progress") return "In Progress";
  if (s === "concept") return "Concept";
  if (s === "shipped") return "Shipped";
  return s;
}

/* ---------------- page ---------------- */

function AlphaCodexPage() {
  return (
    <div className="relative">
      {/* 1. HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-spotlight" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-dot-grid opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]"
        />
        <div className="container-page relative pt-32 pb-24 md:pt-40 md:pb-32">
          <Reveal>
            <Eyebrow tone="accent">
              <Sparkles className="size-3" aria-hidden /> The studio · Founded 2024
            </Eyebrow>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-8 font-display text-[clamp(2.75rem,9vw,7rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-foreground">
              ALPHA <span className="text-[var(--brand)]">CodeX</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-8 max-w-4xl text-display-xl text-balance-tight text-foreground">
              A long-term technology ecosystem for the bridge between{" "}
              <span className="text-muted-foreground">potential</span> and{" "}
              <span className="text-[var(--brand)]">real-world achievement</span>.
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-8 max-w-2xl text-lede text-balance-pretty text-muted-foreground">
              ALPHA CodeX is built to help individuals learn, build, earn trust, access opportunity,
              and create lasting impact — through one connected ecosystem designed for decades, not
              quarters.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-mono-label text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-surface/70 px-3 py-1.5 backdrop-blur">
                <span className="relative flex size-1.5">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[var(--brand)]" />
                  <span className="relative size-1.5 rounded-full bg-[var(--brand)]" />
                </span>
                Stage · Foundation (Year One)
              </span>
              <span>Founded by {site.name}</span>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button asChild variant="primary" size="lg" className="hover-lift">
                <a href="#vision">
                  Read the vision <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="hover-lift">
                <Link to="/contact">
                  Get in touch <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. WHY ALPHA CODEX EXISTS */}
      <section className="container-page py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow={
                <>
                  <Compass className="size-3" /> Origin
                </>
              }
              title="Why ALPHA CodeX exists."
              size="lg"
            />
          </Reveal>
          <Reveal delay={0.05} className="space-y-6 text-[17px] leading-relaxed text-foreground/85">
            <p>
              ALPHA CodeX was founded from a journey of crossing real barriers — in learning,
              projects, opportunities, visibility, networking, and entrepreneurship. Each gap was
              personal before it was a pattern.
            </p>
            <p>
              While crossing those gaps, the same observation kept returning: millions of people
              face the exact same friction. Potential is abundant. Structured pathways from that
              potential to measurable achievement are not.
            </p>
            <p className="text-foreground">
              ALPHA CodeX exists to build those pathways — and to make sure individuals are not left
              alone in the journey from aspiration to impact.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3. THE PROBLEM */}
      <section className="container-page py-20 md:py-28">
        <Reveal>
          <SectionHeading
            eyebrow={
              <>
                <Target className="size-3" /> The problem
              </>
            }
            title="The gaps between potential and achievement."
            description="Today's learning and career ecosystem is fragmented. These are the recurring breakdowns ALPHA CodeX is built to bridge."
            size="lg"
          />
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.04}>
              <div className="surface-card group h-full p-6 transition-colors hover:border-[var(--border-strong)] md:p-7">
                <div className="inline-flex size-10 items-center justify-center rounded-lg border border-[var(--border)] bg-background/60 text-[var(--brand)]">
                  <p.icon className="size-5" aria-hidden />
                </div>
                <h3 className="mt-5 text-h3 text-foreground">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. THE VISION */}
      <section id="vision" className="relative scroll-mt-24 py-20 md:py-28">
        <div className="container-page">
          <Reveal>
            <div className="surface-raised relative overflow-hidden p-8 md:p-16">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-spotlight-strong"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-dot-grid opacity-50 [mask-image:linear-gradient(120deg,black,transparent_70%)]"
              />
              <div className="relative">
                <Eyebrow tone="accent">
                  <Eye className="size-3" /> Vision
                </Eyebrow>
                <h2 className="mt-7 max-w-4xl text-display-lg text-balance-tight text-foreground">
                  A global ecosystem where every individual can discover their potential, develop
                  their capabilities, access meaningful opportunities, and create lasting impact.
                </h2>
                <p className="mt-6 max-w-2xl text-lede text-muted-foreground">
                  Not a course. Not a platform. A long-term, multi-product ecosystem designed to
                  grow with the people inside it.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. THE MISSION */}
      <section className="container-page py-20 md:py-28">
        <div className="grid items-start gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <Reveal>
            <Eyebrow tone="accent">
              <Flag className="size-3" /> Mission
            </Eyebrow>
            <div className="mt-6 h-px w-12 bg-[var(--brand)]" />
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-display-md text-balance-tight font-display text-foreground tracking-[-0.02em]">
              To bridge the gap between human potential and real-world achievement — through
              learning, building, trust, collaboration, entrepreneurship, innovation, and{" "}
              <span className="text-[var(--brand)]">impact</span>.
            </p>
          </Reveal>
        </div>

        {/* bridge journey */}
        <Reveal delay={0.1}>
          <div className="mt-16 rounded-2xl border border-[var(--border)] bg-surface/40 p-6 md:p-10">
            <div className="text-mono-label text-muted-foreground">
              The bridge — from potential to impact
            </div>
            <ol className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-3">
              {bridge.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span
                    className={`rounded-full border px-3 py-1 text-[13px] ${
                      i === 0 || i === bridge.length - 1
                        ? "border-[var(--brand)]/40 bg-[var(--brand-soft)] text-[var(--brand)]"
                        : "border-[var(--border-strong)] bg-background/40 text-foreground/80"
                    }`}
                  >
                    {step}
                  </span>
                  {i < bridge.length - 1 ? (
                    <ArrowRight className="size-3.5 text-muted-foreground/60" aria-hidden />
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>

      {/* 6. ECOSYSTEM */}
      <section className="container-page py-20 md:py-28">
        <Reveal>
          <SectionHeading
            eyebrow={
              <>
                <Layers className="size-3" /> Ecosystem
              </>
            }
            title="Ten pillars. One connected ecosystem."
            description="Each pillar bridges a specific gap in the journey from potential to impact. Together they form ALPHA CodeX."
            size="lg"
          />
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.03}>
              <div className="group flex h-full gap-5 rounded-2xl border border-[var(--border)] bg-surface/40 p-6 transition-all hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-surface/60 md:p-7">
                <div className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-background/60 text-[var(--brand)] transition-colors group-hover:border-[var(--brand)]/40 group-hover:bg-[var(--brand-soft)]">
                  <p.icon className="size-5" aria-hidden />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-h3 text-foreground">{p.name}</h3>
                    <span className="text-mono-meta text-muted-foreground">{p.bridge}</span>
                  </div>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7. PRODUCTS & INITIATIVES */}
      <section className="container-page py-20 md:py-28">
        <Reveal>
          <SectionHeading
            eyebrow={
              <>
                <Rocket className="size-3" /> Products & initiatives
              </>
            }
            title="What's being built — honestly."
            description="A snapshot of what exists today, what's actively in progress, and what's still a concept. Nothing is overclaimed."
            size="lg"
          />
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {initiatives.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.04}>
              <div className="surface-card flex h-full flex-col p-6 md:p-7">
                <div className="flex items-center gap-2 text-mono-label text-muted-foreground">
                  <StatusDot status={p.status} /> {statusLabel(p.status)}
                </div>
                <h3 className="mt-4 text-h3 text-foreground">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{p.body}</p>
                {p.note ? (
                  <p className="mt-4 text-mono-meta text-muted-foreground/80">{p.note}</p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="mt-10">
            <Button asChild variant="outline" size="lg" className="hover-lift">
              <Link to="/projects">
                See current projects <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>

      {/* 8. ROADMAP */}
      <section className="container-page py-20 md:py-28">
        <Reveal>
          <SectionHeading
            eyebrow={
              <>
                <Compass className="size-3" /> Roadmap
              </>
            }
            title="The path forward."
            description="A multi-phase build, designed to compound over years."
            size="lg"
          />
        </Reveal>
        <ol className="mt-14 relative">
          <span
            aria-hidden
            className="pointer-events-none absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--border-strong)] via-[var(--border)] to-transparent md:left-4"
          />
          {roadmap.map((r, i) => (
            <Reveal key={r.phase} delay={i * 0.05}>
              <li className="relative grid gap-4 pb-10 pl-10 md:grid-cols-[200px_1fr] md:gap-10 md:pl-14">
                <span
                  aria-hidden
                  className="absolute left-0 top-1.5 inline-flex size-6 items-center justify-center rounded-full border border-[var(--border-strong)] bg-background md:left-1"
                >
                  <StatusDot status={r.status} />
                </span>
                <div>
                  <div className="text-mono-label text-muted-foreground">{r.phase}</div>
                  <div className="mt-1 text-mono-meta text-[var(--brand)]">{r.status}</div>
                </div>
                <div>
                  <h3 className="text-h2 text-foreground">{r.title}</h3>
                  <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-muted-foreground">
                    {r.body}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* 9. VALUES */}
      <section className="container-page py-20 md:py-28">
        <Reveal>
          <SectionHeading
            eyebrow={
              <>
                <Heart className="size-3" /> Values
              </>
            }
            title="What the studio is built on."
            size="lg"
          />
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="bg-background p-7 md:p-8">
              <div className="inline-flex size-10 items-center justify-center rounded-lg border border-[var(--border)] bg-surface/60 text-[var(--brand)]">
                <v.icon className="size-5" aria-hidden />
              </div>
              <h3 className="mt-5 text-h3 text-foreground">{v.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 10. FOUNDER */}
      <section className="container-page py-20 md:py-28">
        <Reveal>
          <div className="surface-card relative overflow-hidden p-8 md:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-spotlight opacity-60"
            />
            <div className="relative grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-14">
              <div>
                <Eyebrow tone="accent">
                  <Sparkles className="size-3" /> Founder
                </Eyebrow>
                <div className="mt-6 font-display text-display-lg text-foreground">{site.name}</div>
                <p className="mt-3 text-[15px] text-muted-foreground">
                  {site.location} · Computer Science student, frontend developer, product builder.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Founder", "Designer", "Frontend Engineer", "Product Builder", "Student"].map(
                    (t) => (
                      <span
                        key={t}
                        className="rounded-md border border-[var(--border-strong)] bg-background/40 px-2.5 py-1 text-mono-meta text-foreground/85"
                      >
                        {t}
                      </span>
                    ),
                  )}
                </div>
              </div>
              <div className="space-y-5 text-[16px] leading-relaxed text-foreground/85">
                <p>
                  I started ALPHA CodeX because I lived the gaps it is built to bridge. I learned to
                  design, code, and ship by doing — and watched how much potential gets lost in the
                  space between learning and real opportunity.
                </p>
                <p>
                  My role is to design the studio end-to-end: the brand, the interfaces, the
                  engineering, and the long-term thesis. Every product that ships under ALPHA CodeX
                  is shaped by the same founder-led standard of craft.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button asChild variant="primary" className="hover-lift">
                    <Link to="/about">
                      About me <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="hover-lift">
                    <a href={site.social.github} target="_blank" rel="noopener noreferrer">
                      <Github className="size-4" /> GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 11. CURRENT STATUS */}
      <section className="container-page py-20 md:py-28">
        <Reveal>
          <SectionHeading
            eyebrow={
              <>
                <Wrench className="size-3" /> Current status
              </>
            }
            title="Where things stand today."
            size="lg"
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Built",
              body: "The ALPHA CodeX brand, charter, and this founder-led website — including identity, projects, and case-study architecture.",
              status: "shipped" as const,
            },
            {
              title: "Being built",
              body: "ZentraTask AI and the first ALPHA CodeX platform surface — both designed and engineered in the open.",
              status: "in-progress" as const,
            },
            {
              title: "Next",
              body: "Early ACX Build and ACX Talent capabilities, plus the first set of public learning resources and developer tools.",
              status: "concept" as const,
            },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <div className="surface-card h-full p-6 md:p-7">
                <div className="flex items-center gap-2 text-mono-label text-muted-foreground">
                  <StatusDot status={c.status} /> {statusLabel(c.status)}
                </div>
                <h3 className="mt-4 text-h3 text-foreground">{c.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 12. LONG-TERM GOALS */}
      <section className="container-page py-20 md:py-28">
        <Reveal>
          <SectionHeading
            eyebrow={
              <>
                <Globe2 className="size-3" /> Long-term
              </>
            }
            title="A 50-year horizon."
            description="Ambitions written long. Built quietly, year by year."
            size="lg"
          />
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 lg:grid-cols-4">
          {longTerm.map((h) => (
            <div key={h.horizon} className="bg-background p-7 md:p-8">
              <div className="font-display text-display-md font-semibold tracking-[-0.03em] text-[var(--brand)]">
                {h.horizon}
              </div>
              <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground">{h.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 13. FAQ */}
      <section className="container-page py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow={
                <>
                  <Lightbulb className="size-3" /> FAQ
                </>
              }
              title="Questions, answered."
              size="lg"
            />
          </Reveal>
          <Reveal delay={0.05}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`} className="border-[var(--border)]">
                  <AccordionTrigger className="text-left text-[16px] font-medium text-foreground hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* 14. FINAL CTA */}
      <section className="container-page pb-32 pt-20 md:pb-40 md:pt-28">
        <Reveal>
          <div className="surface-raised relative overflow-hidden p-10 text-center md:p-20">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-spotlight-strong" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-dot-grid opacity-50"
            />
            <div className="relative mx-auto max-w-3xl">
              <Eyebrow tone="accent">
                <Sparkles className="size-3" /> Build the bridge
              </Eyebrow>
              <h2 className="mt-6 text-display-xl text-balance-tight text-foreground">
                If any of this resonates — let's talk.
              </h2>
              <p className="mt-6 text-lede text-balance-pretty text-muted-foreground">
                Recruiters, founders, collaborators, students, developers, technology enthusiasts —
                ALPHA CodeX is built with people, not just for them. The earliest conversations
                shape the most.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Button asChild variant="primary" size="lg" className="hover-lift">
                  <Link to="/contact">
                    <Mail className="size-4" /> Get in touch
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="hover-lift">
                  <Link to="/projects">
                    See the work <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="lg"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <a href={site.social.github} target="_blank" rel="noopener noreferrer">
                    <Github className="size-4" /> Follow on GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
