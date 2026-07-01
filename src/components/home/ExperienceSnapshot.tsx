import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { experience } from "@/content/experience";

export function ExperienceSnapshot() {
  return (
    <section className="border-y border-border bg-surface/40">
      <div className="container-page section">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Experience"
              title="The road so far."
              description="Founder, freelancer, student — three lanes that keep informing each other."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Link to="/experience" className="link-arrow text-sm">
              Full experience
              <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <ol className="mt-14 relative">
          {/* timeline rail */}
          <div
            aria-hidden
            className="absolute left-0 top-0 hidden h-full w-px bg-border sm:block sm:left-[148px]"
          />
          {experience.map((e, i) => (
            <Reveal key={i} delay={0.04 * i}>
              <li className="relative grid gap-2 border-b border-border py-7 sm:grid-cols-[148px_1fr_auto] sm:items-baseline sm:gap-8 last:border-0">
                <div className="relative text-mono-label text-muted-foreground">
                  <span
                    aria-hidden
                    className="absolute right-[-5px] top-1.5 hidden size-2 rounded-full border-2 border-background bg-[var(--brand)] sm:block"
                  />
                  {e.start} — {e.end}
                </div>
                <div className="min-w-0 sm:pl-2">
                  <h3 className="text-[17px] font-medium tracking-[-0.01em] text-foreground md:text-lg">
                    {e.role}
                    <span className="font-normal text-muted-foreground"> · {e.org}</span>
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                    {e.summary}
                  </p>
                </div>
                <div className="text-mono-label text-muted-foreground sm:text-right">{e.type}</div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
