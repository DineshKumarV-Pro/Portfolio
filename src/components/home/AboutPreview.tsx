import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { Eyebrow } from "@/components/common/SectionHeading";

export function AboutPreview() {
  return (
    <section className="container-page section">
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <Reveal>
          <div className="md:sticky md:top-28">
            <Eyebrow>The short story</Eyebrow>
            <h2 className="mt-5 text-display-lg text-balance-tight text-foreground">
              Curious by default.
              <br className="hidden md:block" /> Builder by practice.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
              A frontend developer who treats every project as a chance to think like a product
              engineer, an interface designer, and a founder — all at once.
            </p>
            <Link to="/about" className="link-arrow mt-7 inline-flex text-sm">
              Read the full story
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="space-y-7 text-balance-pretty text-[17px] leading-relaxed text-muted-foreground md:text-lg">
            <p>
              My path into technology wasn&rsquo;t a straight line. It started in biology, moved
              through a deliberate switch to Computer Science, and settled into a single habit:{" "}
              <span className="text-foreground">build something every day</span>.
            </p>
            <p>
              I&rsquo;m drawn to the place where design, code, and product meet — interfaces that
              feel calm, systems that age well, and products that take someone from{" "}
              <em>learning</em> to <em>shipping</em>.
            </p>
            <p>
              That&rsquo;s why I&rsquo;m building{" "}
              <Link
                to="/alpha-codex"
                className="text-foreground underline decoration-[var(--brand)] decoration-2 underline-offset-[6px] transition-colors hover:decoration-foreground"
              >
                ALPHA CodeX
              </Link>{" "}
              — a long-term studio for developer tools, learning systems, and the kind of product
              work I want to do for the next ten years.
            </p>
            <ul className="grid gap-3 border-t border-border pt-7 sm:grid-cols-2">
              {[
                ["Engineer", "Frontend · TypeScript · React"],
                ["Designer", "Figma · interaction · accessibility"],
                ["Founder", "ALPHA CodeX — studio in build"],
                ["Student", "B.E. Computer Science · Chennai"],
              ].map(([label, value]) => (
                <li key={label} className="flex items-baseline gap-3">
                  <span className="w-20 shrink-0 text-mono-label text-muted-foreground">
                    {label}
                  </span>
                  <span className="text-[15px] text-foreground">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
