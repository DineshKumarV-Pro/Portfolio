import type { Project } from "@/content/projects";

function SectionHead({
  index,
  eyebrow,
  children,
}: {
  index: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <header className="grid gap-3 md:grid-cols-[auto_1fr] md:items-baseline md:gap-8">
      <div
        aria-hidden
        className="font-display text-[44px] leading-none tracking-tight text-foreground/15 md:text-[56px]"
      >
        {index}
      </div>
      <div>
        <div className="text-mono-label text-[var(--brand)]">{eyebrow}</div>
        <h2 className="mt-2 text-h1 text-foreground text-balance-tight">{children}</h2>
      </div>
    </header>
  );
}

function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-pretty text-[16px] leading-relaxed text-foreground/90 md:text-[17px]">
      {children}
    </p>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-pretty text-[15.5px] leading-relaxed text-muted-foreground">{children}</p>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {items.map((it, i) => (
        <li
          key={i}
          className="group/bullet flex items-start gap-3 rounded-lg border border-[var(--border)] bg-surface/40 p-4 transition-colors hover:border-[var(--border-strong)] hover:bg-surface/60"
        >
          <span
            aria-hidden
            className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-md bg-[var(--brand-soft)] text-[10.5px] font-medium text-[var(--brand)]"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-[14.5px] leading-relaxed text-foreground/90">{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Block({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section
      id={id}
      className="relative scroll-mt-28 border-t border-[var(--border)] pt-12 md:pt-16"
    >
      {children}
    </section>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-surface/40 p-6 transition-all hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-surface/60 motion-reduce:hover:translate-y-0">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand)]/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <h3 className="text-h3 text-foreground">{title}</h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

export function CaseStudyBody({ p }: { p: Project }) {
  const c = p.caseStudy;
  if (!c) return null;
  return (
    <article className="mt-16 flex flex-col gap-14 md:gap-20">
      <Block id="overview">
        <SectionHead index="01" eyebrow="Overview">
          The work in one paragraph
        </SectionHead>
        <div className="mt-6 md:ml-[88px]">
          <Lede>{c.overview}</Lede>
        </div>
      </Block>

      <Block id="problem">
        <SectionHead index="02" eyebrow="Problem">
          What was actually broken
        </SectionHead>
        <div className="mt-6 md:ml-[88px]">
          <P>{c.problem}</P>
        </div>
      </Block>

      <Block id="objective">
        <SectionHead index="03" eyebrow="Objective">
          What I set out to do
        </SectionHead>
        <div className="mt-6 md:ml-[88px]">
          <P>{c.objective}</P>
        </div>
      </Block>

      <Block id="role">
        <SectionHead index="04" eyebrow="Role & Users">
          Ownership and audience
        </SectionHead>
        <div className="mt-6 grid gap-6 md:ml-[88px] md:grid-cols-2">
          <div className="rounded-xl border border-[var(--border)] bg-surface/40 p-6">
            <div className="text-mono-label text-[var(--brand)]">My role</div>
            <p className="mt-3 text-[14.5px] leading-relaxed text-foreground/90">{c.role}</p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-surface/40 p-6">
            <div className="text-mono-label text-[var(--brand)]">Target users</div>
            <p className="mt-3 text-[14.5px] leading-relaxed text-foreground/90">{c.users}</p>
          </div>
        </div>
      </Block>

      {c.planning ? (
        <Block id="planning">
          <SectionHead index="05" eyebrow="Planning">
            Framing before pixels
          </SectionHead>
          <div className="mt-6 md:ml-[88px]">
            <P>{c.planning}</P>
          </div>
        </Block>
      ) : null}

      {c.designDecisions && c.designDecisions.length > 0 ? (
        <Block id="design-decisions">
          <SectionHead index="06" eyebrow="Design decisions">
            The calls that shaped the product
          </SectionHead>
          <div className="mt-6 grid gap-4 md:ml-[88px] md:grid-cols-2">
            {c.designDecisions.map((d) => (
              <Card key={d.heading} title={d.heading} body={d.body} />
            ))}
          </div>
        </Block>
      ) : null}

      {c.architecture ? (
        <Block id="architecture">
          <SectionHead index="07" eyebrow="Technical architecture">
            How it's built
          </SectionHead>
          <div className="mt-6 md:ml-[88px]">
            <P>{c.architecture}</P>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-md border border-[var(--border-strong)] bg-background/40 px-2.5 py-1 text-mono-meta text-foreground/85"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Block>
      ) : null}

      {c.features && c.features.length > 0 ? (
        <Block id="features">
          <SectionHead index="08" eyebrow="Features">
            What shipped
          </SectionHead>
          <div className="mt-6 md:ml-[88px]">
            <Bullets items={c.features} />
          </div>
        </Block>
      ) : null}

      <Block id="challenges">
        <SectionHead index="09" eyebrow="Challenges & solutions">
          The interesting parts
        </SectionHead>
        <div className="mt-6 grid gap-4 md:ml-[88px] md:grid-cols-2">
          {c.challenges.map((d) => (
            <Card key={d.heading} title={d.heading} body={d.body} />
          ))}
        </div>
      </Block>

      {c.performance || c.accessibility ? (
        <Block id="quality">
          <SectionHead index="10" eyebrow="Quality">
            Performance & accessibility
          </SectionHead>
          <div className="mt-6 grid gap-8 md:ml-[88px] md:grid-cols-2">
            {c.performance ? (
              <div>
                <div className="text-mono-label text-[var(--brand)]">Performance</div>
                <ul className="mt-4 space-y-2 text-[14.5px] leading-relaxed text-muted-foreground">
                  {c.performance.map((it, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[var(--brand)]/70"
                      />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {c.accessibility ? (
              <div>
                <div className="text-mono-label text-[var(--brand)]">Accessibility</div>
                <ul className="mt-4 space-y-2 text-[14.5px] leading-relaxed text-muted-foreground">
                  {c.accessibility.map((it, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[var(--brand)]/70"
                      />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Block>
      ) : null}

      {c.testing ? (
        <Block id="testing">
          <SectionHead index="11" eyebrow="Testing">
            Confidence to ship
          </SectionHead>
          <div className="mt-6 md:ml-[88px]">
            <P>{c.testing}</P>
          </div>
        </Block>
      ) : null}

      <Block id="lessons">
        <SectionHead index="12" eyebrow="Lessons learned">
          What I'd carry forward
        </SectionHead>
        <div className="mt-6 md:ml-[88px]">
          <Bullets items={c.lessons} />
        </div>
      </Block>

      {c.futureWork ? (
        <Block id="future">
          <SectionHead index="13" eyebrow="Future improvements">
            What's next
          </SectionHead>
          <div className="mt-6 md:ml-[88px]">
            <Bullets items={c.futureWork} />
          </div>
        </Block>
      ) : null}

      <Block id="outcome">
        <SectionHead index="14" eyebrow="Outcome">
          Where it stands
        </SectionHead>
        <div className="mt-6 md:ml-[88px]">
          <Lede>{c.outcome}</Lede>
        </div>
      </Block>

      {c.reflection ? (
        <Block id="reflection">
          <SectionHead index="15" eyebrow="Reflection">
            In hindsight
          </SectionHead>
          <div className="mt-6 md:ml-[88px]">
            <P>{c.reflection}</P>
          </div>
        </Block>
      ) : null}
    </article>
  );
}
