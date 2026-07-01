import { Link } from "@tanstack/react-router";
import { Award, Trophy, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";

export function CredentialsPreview() {
  return (
    <section className="border-y border-border bg-surface/40">
      <div className="container-page section grid gap-6 md:grid-cols-2 md:gap-8">
        <Reveal>
          <Card
            icon={Award}
            eyebrow="Certifications"
            title="Verified learning, organised."
            body="Course completions, platform certificates, and industry credentials — with verification links and dates kept up to date."
            cta={{ label: "View certifications", href: "/certifications" }}
          />
        </Reveal>
        <Reveal delay={0.06}>
          <Card
            icon={Trophy}
            eyebrow="Achievements & awards"
            title="Milestones that mattered."
            body="Academic wins, hackathon results, technical recognitions, and community contributions across the journey so far."
            cta={{ label: "View achievements", href: "/achievements" }}
          />
        </Reveal>
      </div>
    </section>
  );
}

function Card({
  icon: Icon,
  eyebrow,
  title,
  body,
  cta,
}: {
  icon: typeof Award;
  eyebrow: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
}) {
  return (
    <div className="surface-card hover-lift group flex h-full flex-col p-8 md:p-10 hover:border-[var(--border-strong)]">
      <div className="inline-flex size-10 items-center justify-center rounded-md border border-[var(--border-strong)] bg-background text-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[var(--brand)]/40 group-hover:text-[var(--brand)]">
        <Icon className="size-5" />
      </div>
      <div className="mt-7 text-mono-label text-muted-foreground">{eyebrow}</div>
      <h3 className="mt-3 text-h1 text-balance-tight text-foreground">{title}</h3>
      <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">{body}</p>
      <Link to={cta.href} className="link-arrow mt-8 text-sm">
        {cta.label} <ArrowUpRight className="size-4" />
      </Link>
    </div>
  );
}
