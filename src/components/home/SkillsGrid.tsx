import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { skillGroups } from "@/content/skills";

export function SkillsGrid() {
  return (
    <section className="container-page section">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <SectionHeading
            eyebrow="Skills"
            title={
              <>
                A grounded stack,
                <br className="hidden md:block" /> chosen for leverage.
              </>
            }
            description="Tools I reach for daily. The shape of the stack matters more than any single tool."
          />
        </Reveal>
        <Reveal delay={0.08}>
          <Link
            to="/skills"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-[6px] hover:underline"
          >
            Full breakdown
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={0.04 * i}>
            <div className="surface-card h-full p-6 hover:border-[var(--border-strong)]">
              <div className="flex items-center justify-between">
                <div className="text-mono-label text-muted-foreground">{group.label}</div>
                <div className="text-mono-meta text-muted-foreground/70">
                  {String(group.items.length).padStart(2, "0")}
                </div>
              </div>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {group.items.map((s) => {
                  const name = typeof s === "string" ? s : s.name;
                  return (
                    <li
                      key={name}
                      className="rounded-md border border-[var(--border)] bg-surface/60 px-2.5 py-1 text-[13px] text-foreground/85 transition-colors hover:border-[var(--brand)]/30 hover:text-foreground"
                    >
                      {name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
