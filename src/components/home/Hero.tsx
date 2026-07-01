import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowDown, Github, FileText } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { HeroAmbient } from "@/components/motion/HeroAmbient";
import { Magnetic } from "@/components/motion/Magnetic";
import { site } from "@/content/site";

const ease = [0.22, 0.61, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    reduce
      ? { initial: false }
      : {
          initial: { opacity: 0, y: 14, filter: "blur(4px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.6, delay, ease },
        };

  return (
    <HeroAmbient>
      <div className="container-page relative pt-36 pb-28 md:pt-44 md:pb-36">
        <motion.div {...fade(0)}>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border-strong)] bg-surface/70 px-3 py-1.5 backdrop-blur animate-soft-float glass-pill">
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-500" />
              <span className="relative size-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-mono-label text-foreground/80">{site.availability}</span>
          </div>
        </motion.div>

        <motion.h1
          {...fade(0.06)}
          className="mt-8 max-w-5xl text-display-2xl text-balance-tight text-foreground"
        >
          Engineering interfaces.
          <br />
          <span className="text-muted-foreground">Building products.</span> Shipping
          <motion.span
            className="text-[var(--brand)]"
            initial={reduce ? false : { opacity: 0.6 }}
            animate={reduce ? undefined : { opacity: [0.6, 1, 0.85, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {" "}
            impact
          </motion.span>
          .
        </motion.h1>

        <motion.p
          {...fade(0.12)}
          className="mt-8 max-w-2xl text-lede text-balance-pretty text-muted-foreground"
          data-cursor="text"
        >
          I&rsquo;m <span className="text-foreground">{site.name}</span> — a frontend developer,
          product builder, and founder of{" "}
          <Link
            to="/alpha-codex"
            className="link-underline-grow text-foreground decoration-[var(--brand)] decoration-2 underline-offset-[6px]"
          >
            ALPHA CodeX
          </Link>
          . I design and engineer thoughtful interfaces in React and TypeScript, ship AI-assisted
          products end-to-end, and build the systems behind them for the long run — for founders,
          teams, and recruiters who care about craft.
        </motion.p>

        <motion.div {...fade(0.18)} className="mt-10 flex flex-wrap items-center gap-3">
          <Magnetic>
            <Button asChild variant="primary" size="lg" className="hover-lift">
              <Link to="/hire-me">
                Hire me
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </Magnetic>
          <Magnetic strength={0.22}>
            <Button asChild variant="outline" size="lg" className="hover-lift">
              <Link to="/projects">See selected work</Link>
            </Button>
          </Magnetic>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="text-muted-foreground hover:text-foreground"
          >
            <Link to="/resume">
              <FileText className="size-4" /> Resume
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="text-muted-foreground hover:text-foreground"
          >
            <a href={site.social.github} target="_blank" rel="noopener noreferrer">
              <Github className="size-4" /> GitHub
            </a>
          </Button>
        </motion.div>

        <motion.dl
          {...fade(0.28)}
          className="mt-20 grid max-w-3xl grid-cols-2 gap-x-10 gap-y-7 border-t border-[var(--border)] pt-10 md:grid-cols-4"
        >
          <Stat label="Focus" value="Frontend × Product" />
          <Stat label="Studio" value="ALPHA CodeX — Founder" />
          <Stat label="Open to" value="Internships · Roles · Freelance" />
          <Stat label="Based in" value={site.location} />
        </motion.dl>

        <motion.div
          {...fade(0.4)}
          className="mt-14 hidden items-center gap-2 text-mono-meta text-muted-foreground md:flex"
        >
          <ArrowDown className="size-3.5 animate-soft-float" />
          Scroll for the long version
        </motion.div>
      </div>
    </HeroAmbient>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-mono-label text-muted-foreground">{label}</dt>
      <dd className="mt-2 truncate text-[15px] font-medium text-foreground">{value}</dd>
    </div>
  );
}
