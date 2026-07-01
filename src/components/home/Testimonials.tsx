import { Quote } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";

const slots = [
  {
    quote:
      "Reserved for a real testimonial. Real name, role, organization, and a quote that says something true — never generic filler.",
    role: "Mentor · Manager · Client",
  },
  {
    quote:
      "A second slot for a colleague or collaborator. Authenticity beats polish — the people I work with speak for the work better than I can.",
    role: "Collaborator · Founder · Engineer",
  },
];

export function Testimonials() {
  return (
    <section className="container-page section">
      <Reveal>
        <SectionHeading
          eyebrow="Words from the field"
          title={<>What people I&rsquo;ve worked with say.</>}
          description="Placeholder until real testimonials are collected. Every quote here will be attributed — no anonymous filler, no recycled praise."
        />
      </Reveal>
      <div className="mt-14 grid gap-5 md:grid-cols-2 md:gap-6">
        {slots.map((s, i) => (
          <Reveal key={i} delay={0.06 * i}>
            <figure className="surface-card hover-lift flex h-full flex-col p-8 md:p-10">
              <Quote className="size-6 text-[var(--brand)]/70" aria-hidden />
              <blockquote className="mt-6 text-h1 text-balance-pretty text-foreground">
                &ldquo;{s.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3 border-t border-border pt-5 text-sm text-muted-foreground">
                <div
                  className="size-10 rounded-full border border-dashed border-[var(--border-strong)]"
                  aria-hidden
                />
                <div className="min-w-0">
                  <div className="truncate text-foreground">Name pending</div>
                  <div className="truncate text-mono-meta">{s.role}</div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
