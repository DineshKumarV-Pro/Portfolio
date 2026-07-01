import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";

const updates = [
  { label: "Building", body: "ALPHA CodeX platform and ZentraTask AI prototype" },
  { label: "Shipping", body: "Weatherly Wave and refinements across the project surface" },
  { label: "Learning", body: "Advanced TypeScript, AI product patterns, systems design" },
  { label: "Open to", body: "Frontend internships, founding-engineer roles, freelance for 2026" },
];

export function NowBlock() {
  const updatedOn = "June 2026";
  return (
    <section className="container-page py-10 md:py-14">
      <Reveal>
        <div className="surface-card hover-lift p-8 md:p-10 hover:border-[var(--border-strong)]">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <div className="grid size-11 shrink-0 place-items-center rounded-md border border-[var(--border-strong)] bg-background text-[var(--brand)]">
                <Clock className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-3 text-mono-label text-muted-foreground">
                  Now <span aria-hidden>·</span>{" "}
                  <span className="text-foreground/80">Updated {updatedOn}</span>
                </div>
                <h3 className="mt-2 text-h2 text-balance-pretty text-foreground">
                  What I&rsquo;m focused on this season.
                </h3>
              </div>
            </div>
            <Link to="/now" className="link-arrow shrink-0 self-start text-sm md:self-auto">
              See the full Now page
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <dl className="mt-8 grid gap-5 border-t border-border pt-7 sm:grid-cols-2 md:gap-6">
            {updates.map((u) => (
              <div key={u.label} className="flex items-baseline gap-3">
                <dt className="w-20 shrink-0 text-mono-label text-muted-foreground">{u.label}</dt>
                <dd className="text-[15px] leading-relaxed text-foreground/90">{u.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
