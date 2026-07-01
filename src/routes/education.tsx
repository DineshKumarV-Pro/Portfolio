import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, GraduationCap } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Reveal } from "@/components/common/Reveal";
import { Eyebrow } from "@/components/common/SectionHeading";
import { education } from "@/content/education";
import { buildPageHead } from "@/lib/seo";

const meta = {
  path: "/education",
  metaTitle: "Education — Dinesh Kumar V",
  description:
    "B.E. in Computer Science and Engineering at Alpha College of Engineering (Anna University), and prior schooling at Vailankanni Matriculation Higher Secondary School.",
};

export const Route = createFileRoute("/education")({
  head: buildPageHead({
    title: meta.metaTitle,
    description: meta.description,
    path: meta.path,
  }),
  component: EducationPage,
});

function EducationPage() {
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
          <Breadcrumbs items={[{ label: "Education" }]} />
        </div>

        <Reveal>
          <div className="flex max-w-[64ch] flex-col gap-5">
            <Eyebrow>Education</Eyebrow>
            <h1 className="text-display-xl text-balance-tight text-foreground">
              Academic foundation, plus everything I build outside it.
            </h1>
            <p className="text-lede text-balance-pretty text-muted-foreground">
              The degree gives me structure across CS fundamentals. The work I ship alongside it is
              where those fundamentals turn into product.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 space-y-8">
          {education.map((e, i) => (
            <Reveal key={e.institution + e.degree} delay={i === 0 ? 0 : 0.04}>
              <article className="surface-card p-7 md:p-9">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="grid size-11 place-items-center rounded-xl border border-[var(--border-strong)] bg-surface/60">
                      <GraduationCap className="size-5 text-[var(--brand)]" aria-hidden />
                    </div>
                    <div>
                      <h2 className="text-h1 text-balance-tight text-foreground">{e.degree}</h2>
                      {e.field ? (
                        <p className="mt-1 text-[15px] text-foreground/80">{e.field}</p>
                      ) : null}
                      <p className="mt-1 text-[14.5px] text-muted-foreground">
                        {e.institution}
                        {e.board ? ` · ${e.board}` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-mono-meta text-muted-foreground">{e.duration}</span>
                    {e.status === "Current" ? (
                      <span className="rounded-full border border-[var(--brand)]/30 bg-[var(--brand-soft)] px-2 py-0.5 text-mono-meta text-[var(--brand)]">
                        Current
                      </span>
                    ) : (
                      <span className="rounded-full border border-[var(--border)] bg-surface/60 px-2 py-0.5 text-mono-meta text-muted-foreground">
                        {e.status ?? "Completed"}
                      </span>
                    )}
                  </div>
                </div>

                {e.coursework || e.highlights ? (
                  <div className="mt-7 grid gap-6 md:grid-cols-2">
                    {e.coursework ? (
                      <div>
                        <div className="text-mono-label text-muted-foreground">
                          Relevant coursework
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {e.coursework.map((c) => (
                            <span
                              key={c}
                              className="rounded-md border border-[var(--border)] bg-surface/60 px-2.5 py-1 text-[13px] text-foreground/85"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    {e.highlights ? (
                      <div>
                        <div className="text-mono-label text-muted-foreground">Highlights</div>
                        <ul className="mt-3 space-y-1.5 text-[14.5px] leading-relaxed text-foreground/85">
                          {e.highlights.map((h) => (
                            <li key={h} className="flex gap-2">
                              <span
                                aria-hidden
                                className="mt-2 size-1 flex-none rounded-full bg-[var(--brand)]/70"
                              />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>

        {/* Beyond the classroom */}
        <Reveal delay={0.05} className="mt-20">
          <div className="surface-card p-7 md:p-9">
            <Eyebrow tone="accent">Beyond the classroom</Eyebrow>
            <h3 className="mt-5 text-h1 text-balance-tight text-foreground">
              Self-directed learning runs in parallel.
            </h3>
            <p className="mt-4 max-w-[64ch] text-[15.5px] leading-relaxed text-muted-foreground">
              Modern web development, AI tooling, design systems, and product thinking aren't always
              on the syllabus. I treat the degree as the foundation and use personal projects,
              documentation, and open-source habits to build everything on top of it.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {[
                { label: "Skills", href: "/skills" },
                { label: "Projects", href: "/projects" },
                { label: "Now", href: "/now" },
                { label: "Resume", href: "/resume" },
                { label: "Timeline", href: "/timeline" },
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
