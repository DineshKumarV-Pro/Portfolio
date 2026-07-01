import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Download, Mail, ExternalLink } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Reveal } from "@/components/common/Reveal";
import { Eyebrow, SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { experience } from "@/content/experience";
import { education } from "@/content/education";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { buildPageHead } from "@/lib/seo";
import { trackEvent } from "@/lib/analytics";

const meta = {
  path: "/resume",
  metaTitle: "Resume — Dinesh Kumar V",
  description:
    "ATS-friendly online resume for Dinesh Kumar V — frontend developer, product builder, and founder of ALPHA CodeX. Download the PDF or read the structured version.",
};

export const Route = createFileRoute("/resume")({
  head: buildPageHead({
    title: meta.metaTitle,
    description: meta.description,
    path: meta.path,
  }),
  component: ResumePage,
});

function ResumePage() {
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
          <Breadcrumbs items={[{ label: "Resume" }]} />
        </div>

        {/* Header */}
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[60ch]">
              <Eyebrow>Resume</Eyebrow>
              <h1 className="mt-4 text-display-xl text-balance-tight text-foreground">
                {site.name}
              </h1>
              <p className="mt-3 text-[16px] text-foreground/80">{site.role}</p>
              <p className="mt-2 text-[14.5px] text-muted-foreground">
                {site.location} ·{" "}
                <a className="hover:text-foreground" href={`mailto:${site.email}`}>
                  {site.email}
                </a>{" "}
                · {site.phone}
              </p>
              <p className="mt-2 text-mono-meta text-muted-foreground">
                Last updated · {site.resumeUpdated}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="primary">
                <a
                  href={site.resumeUrl}
                  download
                  onClick={() => trackEvent({ name: "resume_download", format: "pdf" })}
                >
                  <Download className="size-4" /> Download PDF
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={`mailto:${site.email}`}>
                  <Mail className="size-4" /> Email me
                </a>
              </Button>
              <Button asChild variant="ghost">
                <a
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent({ name: "resume_view", format: "pdf" })}
                >
                  Open in tab <ExternalLink className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Summary */}
        <Reveal delay={0.04} className="mt-14">
          <Section title="Professional summary">
            <p className="max-w-[72ch] text-[15.5px] leading-relaxed text-foreground/85">
              Frontend developer and product builder based in {site.location} and founder of ALPHA
              CodeX — an execution-focused technology ecosystem. Currently pursuing a B.E. in
              Computer Science and Engineering at Alpha College of Engineering (Anna University).
              Comfortable taking projects from concept to production in React, TypeScript, and
              Tailwind, with growing depth in full-stack and AI-assisted product work. Open to
              internships, freelance work, and meaningful collaborations.
            </p>
          </Section>
        </Reveal>

        {/* Experience */}
        <Reveal delay={0.04} className="mt-14">
          <Section title="Experience">
            <ul className="space-y-6">
              {experience.map((e) => (
                <li key={e.role + e.org} className="surface-card p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="text-h3 text-foreground">{e.role}</h3>
                      <p className="text-[14.5px] text-foreground/80">{e.org}</p>
                    </div>
                    <p className="text-mono-meta text-muted-foreground">
                      {e.start} — {e.end}
                    </p>
                  </div>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                    {e.summary}
                  </p>
                  {e.highlights ? (
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
                  ) : null}
                </li>
              ))}
            </ul>
          </Section>
        </Reveal>

        {/* Education */}
        <Reveal delay={0.04} className="mt-14">
          <Section title="Education">
            <ul className="space-y-4">
              {education.map((e) => (
                <li key={e.institution + e.degree} className="surface-card p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="text-h3 text-foreground">{e.degree}</h3>
                      <p className="text-[14.5px] text-foreground/80">
                        {e.institution}
                        {e.field ? ` · ${e.field}` : ""}
                        {e.board ? ` · ${e.board}` : ""}
                      </p>
                    </div>
                    <p className="text-mono-meta text-muted-foreground">{e.duration}</p>
                  </div>
                  {e.highlights ? (
                    <ul className="mt-3 space-y-1.5 text-[14.5px] leading-relaxed text-foreground/85">
                      {e.highlights.slice(0, 4).map((h) => (
                        <li key={h} className="flex gap-2">
                          <span
                            aria-hidden
                            className="mt-2 size-1 flex-none rounded-full bg-[var(--brand)]/70"
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </Section>
        </Reveal>

        {/* Projects */}
        <Reveal delay={0.04} className="mt-14">
          <Section title="Selected projects">
            <ul className="grid gap-4 md:grid-cols-2">
              {projects.map((p) => (
                <li key={p.slug} className="surface-card p-6">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-h3 text-foreground">{p.title}</h3>
                    <span className="text-mono-meta text-muted-foreground">{p.year}</span>
                  </div>
                  {p.tagline ? (
                    <p className="mt-1 text-[14px] text-foreground/80">{p.tagline}</p>
                  ) : null}
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                    {p.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-[var(--border)] bg-surface/60 px-2 py-0.5 text-[12px] text-foreground/85"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </Section>
        </Reveal>

        {/* Skills */}
        <Reveal delay={0.04} className="mt-14">
          <Section title="Skills">
            <div className="grid gap-4 md:grid-cols-2">
              {skillGroups.map((g) => (
                <div key={g.label} className="surface-card p-6">
                  <div className="text-mono-label text-[var(--brand)]">{g.label}</div>
                  <p className="mt-3 text-[14px] leading-relaxed text-foreground/85">
                    {g.items.map((s) => (typeof s === "string" ? s : s.name)).join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        </Reveal>

        {/* Certifications */}
        <Reveal delay={0.04} className="mt-14">
          <Section title="Certifications">
            <div className="surface-card p-6 text-[14.5px] text-muted-foreground">
              Currently building a portfolio of hands-on, project-based credentials. Verified
              certifications will be listed here as they're completed.
            </div>
          </Section>
        </Reveal>

        {/* Contact / links */}
        <Reveal delay={0.04} className="mt-14">
          <Section title="Public profiles">
            <ul className="grid gap-2 sm:grid-cols-2">
              {[
                { label: "GitHub", href: site.social.github },
                { label: "LinkedIn", href: site.social.linkedin },
                { label: "X (Twitter)", href: site.social.x },
                { label: "Medium", href: site.social.medium },
                { label: "Dev.to", href: site.social.devto },
                { label: "LeetCode", href: site.social.leetcode },
                { label: "HackerRank", href: site.social.hackerrank },
                { label: "CodeChef", href: site.social.codechef },
              ]
                .filter((l) => !!l.href)
                .map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-between gap-2 rounded-lg border border-[var(--border-strong)] bg-surface/40 px-3.5 py-2.5 text-sm text-foreground/85 transition-colors hover:border-foreground/40 hover:text-foreground"
                    >
                      <span>{l.label}</span>
                      <ExternalLink className="size-4 opacity-70" aria-hidden />
                    </a>
                  </li>
                ))}
            </ul>
          </Section>
        </Reveal>

        {/* Footer CTA */}
        <Reveal delay={0.04} className="mt-16">
          <div className="surface-card flex flex-wrap items-center justify-between gap-4 p-6">
            <div>
              <div className="text-mono-label text-muted-foreground">Need a copy?</div>
              <p className="mt-1 text-[15px] text-foreground/85">
                Download the ATS-friendly PDF, or get in touch directly.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="primary">
                <a href={site.resumeUrl} download>
                  <Download className="size-4" /> Download PDF
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">
                  Contact <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <SectionHeading size="md" eyebrow="" title={title} />
      <div className="mt-6">{children}</div>
    </div>
  );
}
