import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Reveal } from "@/components/common/Reveal";
import { Eyebrow, SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { buildPageHead, buildPersonSchema, jsonLdScript } from "@/lib/seo";

const meta = {
  path: "/about",
  metaTitle: "About — Dinesh Kumar V",
  description:
    "The long-form story of Dinesh Kumar V — frontend developer, product builder, and founder of ALPHA CodeX. Background, philosophy, and where this is heading.",
};

export const Route = createFileRoute("/about")({
  head: () => {
    const base = buildPageHead({
      title: meta.metaTitle,
      description: meta.description,
      path: meta.path,
      ogType: "profile",
    })();
    return {
      ...base,
      scripts: [jsonLdScript(buildPersonSchema())],
    };
  },
  component: AboutPage,
});

const values = [
  {
    title: "Learning leads to building",
    body: "Courses, tutorials, and notes only matter when they convert into something real. I treat every concept as raw material for the next project.",
  },
  {
    title: "Products over portfolios",
    body: "I'd rather ship one product that helps someone than collect a folder of half-finished demos. Real users teach what classrooms can't.",
  },
  {
    title: "Consistency beats intensity",
    body: "Small, daily improvements compound. The motto I work to: every day, build something better than yesterday.",
  },
  {
    title: "Opportunity is built, not waited for",
    body: "I don't wait for the right break. I build the work, share it publicly, and let the work itself open the doors.",
  },
];

const philosophies = [
  {
    label: "Engineering",
    body: "Write code a future teammate would thank you for. Default to clarity, type safety, accessibility, and small, composable pieces. Performance and craft are not optional polish — they are the product.",
  },
  {
    label: "Product",
    body: "Start with the user's problem, not the framework. Cut features until what remains is sharp. Ship the smallest honest version, then learn in public.",
  },
  {
    label: "Design",
    body: "Interfaces should disappear. Typography, spacing, and motion should serve comprehension, not decoration. Calm, confident, and timeless over trendy.",
  },
];

function AboutPage() {
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
          <Breadcrumbs items={[{ label: "About" }]} />
        </div>

        <Reveal>
          <div className="flex flex-col gap-5">
            <Eyebrow>About</Eyebrow>
            <h1 className="text-display-xl text-balance-tight text-foreground">
              I build technology that creates real-world impact.
            </h1>
            <p className="max-w-[62ch] text-lede text-balance-pretty text-muted-foreground">
              I'm {site.name} — a frontend developer, product builder, and founder of ALPHA CodeX
              based in {site.location}. This page is the long-form story behind the work: where I
              come from, how I think, and where this is heading.
            </p>
          </div>
        </Reveal>

        {/* Long-form narrative */}
        <Reveal
          delay={0.05}
          className="mt-16 grid gap-10 md:grid-cols-[1fr_minmax(0,18rem)] md:gap-14"
        >
          <article className="prose-editorial max-w-[68ch] space-y-6 text-[16.5px] leading-[1.75] text-foreground/85">
            <p>
              My path into technology wasn't a straight line. I started in the Biology stream
              through Higher Secondary School, expecting a future in the life sciences. Somewhere
              along the way, curiosity took over. Programming, websites, software, and emerging
              tools became more interesting than anything else I was studying — not because they
              were easy, but because they could turn an idea into something real that anyone,
              anywhere, could use.
            </p>
            <p>
              That shift became a decision. I moved from Biology to Computer Science and joined
              Alpha College of Engineering under Anna University to pursue a B.E. in Computer
              Science and Engineering. The degree gave me structure; the self-directed building gave
              me momentum. I started shipping frontend projects, writing in public, and treating
              every week as a chance to learn one new thing and apply it immediately.
            </p>
            <p>
              The work I care about sits at the intersection of three things: thoughtful
              engineering, product thinking, and the discipline to actually finish. Frontend is
              where I'm strongest today — React, TypeScript, Tailwind, accessibility, design systems
              — but I see it as the front door, not the destination. The longer arc is building
              products people rely on.
            </p>
            <p>
              That arc is why ALPHA CodeX exists. It's an execution-focused technology ecosystem I
              founded in 2024 to close the gap between learning and meaningful achievement. Most
              learners don't lack information — they lack clarity, direction, and a place to turn
              skill into shipped work and shipped work into opportunity. ALPHA CodeX is my long-term
              commitment to building that bridge.
            </p>
            <p>
              Right now, the priorities are simple. Become an excellent engineer. Ship real products
              end-to-end. Document the journey. Open doors for other builders. The five-year picture
              is to grow into a respected technology entrepreneur known for products that solve real
              problems and for raising the people I work alongside.
            </p>
          </article>

          <aside className="space-y-4">
            <div className="surface-card p-6">
              <Eyebrow>Quick facts</Eyebrow>
              <dl className="mt-5 space-y-3 text-[14px]">
                <Fact k="Based in" v={site.location} />
                <Fact k="Studying" v="B.E. CSE · Alpha College of Engineering" />
                <Fact k="Building" v="ALPHA CodeX · ZentraTask AI · ZenoKart" />
                <Fact k="Languages" v="English · Tamil · Telugu" />
                <Fact k="Available" v={site.availability} />
              </dl>
            </div>
            <div className="surface-card p-6">
              <Eyebrow>Motto</Eyebrow>
              <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">"{site.motto}"</p>
            </div>
          </aside>
        </Reveal>

        {/* Values */}
        <Reveal delay={0.05} className="mt-24">
          <SectionHeading
            size="md"
            eyebrow="Values"
            title="What I hold to, every project."
            description="These aren't slogans. They're the filters I use when deciding what to build, what to cut, and how to spend a working day."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="surface-card p-6">
                <h3 className="text-h3 text-foreground">{v.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Philosophy */}
        <Reveal delay={0.05} className="mt-24">
          <SectionHeading
            size="md"
            eyebrow="Philosophy"
            title="How I think about engineering, product, and design."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {philosophies.map((p) => (
              <div key={p.label} className="surface-card p-6">
                <div className="text-mono-label text-[var(--brand)]">{p.label}</div>
                <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">{p.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Why ALPHA CodeX */}
        <Reveal delay={0.05} className="mt-24">
          <div className="surface-card relative overflow-hidden p-8 md:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-spotlight opacity-60"
            />
            <div className="relative grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
              <div>
                <Eyebrow tone="accent">Why ALPHA CodeX exists</Eyebrow>
                <h3 className="mt-5 text-h1 text-balance-tight text-foreground">
                  Closing the gap between learning and meaningful achievement.
                </h3>
                <p className="mt-5 max-w-[52ch] text-[15.5px] leading-relaxed text-muted-foreground">
                  Too many talented people have the skill but never reach the outcome. ALPHA CodeX
                  is being built as a long-term ecosystem that connects learning, building,
                  verification, and opportunity into one place — so the path from "I want to build
                  this" to "I shipped it" gets shorter for everyone who walks it.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild variant="primary">
                    <Link to="/alpha-codex">
                      Visit ALPHA CodeX <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/vision">Read the vision</Link>
                  </Button>
                </div>
              </div>
              <ul className="grid gap-3 text-[14.5px] text-foreground/85">
                {[
                  "Learning that ends in real, shipped work",
                  "Verification of skill through projects, not certificates",
                  "Opportunities created by the work itself",
                  "Community where builders raise each other",
                ].map((l) => (
                  <li
                    key={l}
                    className="rounded-lg border border-[var(--border)] bg-background/60 p-4"
                  >
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Where this is heading */}
        <Reveal delay={0.05} className="mt-24 grid gap-6 md:grid-cols-2">
          <div className="surface-card p-7">
            <Eyebrow>Right now</Eyebrow>
            <h3 className="mt-4 text-h2 text-foreground">Current focus</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Becoming an excellent frontend engineer, growing into full-stack, shipping ALPHA
              CodeX, and continuing to document the journey in public. Open to internships,
              freelance work, and serious collaborations.
            </p>
            <Link
              to="/now"
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-[var(--brand)] hover:underline"
            >
              See what I'm working on now <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="surface-card p-7">
            <Eyebrow>Long term</Eyebrow>
            <h3 className="mt-4 text-h2 text-foreground">Where this is heading</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              To become a globally respected technology entrepreneur known for building impactful
              products and creating opportunities that help people and organizations thrive through
              technology.
            </p>
            <Link
              to="/vision"
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-[var(--brand)] hover:underline"
            >
              Read the long-term vision <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>

        {/* Keep exploring */}
        <Reveal delay={0.05} className="mt-20">
          <SectionHeading size="md" eyebrow="Keep exploring" title="Where to go next" />
          <ul className="mt-6 flex flex-wrap gap-2">
            {[
              { label: "The journey", href: "/journey" },
              { label: "Experience", href: "/experience" },
              { label: "Projects", href: "/projects" },
              { label: "Skills", href: "/skills" },
              { label: "Resume", href: "/resume" },
              { label: "Contact", href: "/contact" },
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

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-mono-meta text-muted-foreground">{k}</dt>
      <dd className="text-foreground/90">{v}</dd>
    </div>
  );
}
