import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, Github, Linkedin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/common/Reveal";
import { site } from "@/content/site";

const channels = [
  {
    label: "Internships & full-time",
    body: "Frontend, product-engineering, and founding-engineer roles for 2026.",
    cta: { to: "/hire-me", label: "Hire me" },
  },
  {
    label: "Freelance & consulting",
    body: "Landing pages, product UI, and design systems in React + TypeScript.",
    cta: { to: "/services", label: "Services" },
  },
  {
    label: "Collaborations & speaking",
    body: "Open source, mentoring, student communities, and founder conversations.",
    cta: { to: "/speaking", label: "Speaking" },
  },
];

export function ContactCTA() {
  return (
    <section className="container-page section-loose">
      <Reveal>
        <div className="surface-raised relative overflow-hidden p-10 md:p-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-spotlight-strong" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-dot-grid opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]"
          />
          <div className="relative mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--brand)]/30 bg-[var(--brand-soft)] px-2.5 py-1 text-mono-label text-[var(--brand)]">
              Let&rsquo;s build something
            </div>
            <h2 className="mt-7 text-display-xl text-balance-tight text-foreground">
              Open for internships, full-time roles, freelance projects, and founding
              collaborations.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lede text-balance-pretty text-muted-foreground">
              If you&rsquo;re a recruiter, founder, or builder with a problem worth solving — the
              inbox is open. Replies usually within a day or two, from Chennai, India.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="primary" size="lg" className="hover-lift">
                <Link to="/contact">
                  Start a conversation <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="hover-lift">
                <a href={`mailto:${site.email}`}>
                  <Mail className="size-4" /> {site.email}
                </a>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link to="/resume">
                  <FileText className="size-4" /> Resume
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="size-4" /> LinkedIn
                </a>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <a href={site.social.github} target="_blank" rel="noopener noreferrer">
                  <Github className="size-4" /> GitHub
                </a>
              </Button>
            </div>
          </div>

          <dl className="relative mx-auto mt-14 grid max-w-4xl gap-5 border-t border-border pt-10 md:grid-cols-3 md:gap-6">
            {channels.map((c) => (
              <div
                key={c.label}
                className="hover-lift rounded-lg border border-[var(--border)] bg-surface/60 p-5 hover:border-[var(--border-strong)]"
              >
                <dt className="text-mono-label text-[var(--brand)]">{c.label}</dt>
                <dd className="mt-3 text-[14px] leading-relaxed text-foreground/90">{c.body}</dd>
                <Link to={c.cta.to} className="link-arrow mt-4 text-mono-label">
                  {c.cta.label} <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
