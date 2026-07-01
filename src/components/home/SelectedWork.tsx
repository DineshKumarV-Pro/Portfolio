import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { ProjectCard } from "@/components/work/ProjectCard";
import { featuredProjects } from "@/content/projects";

export function SelectedWork() {
  return (
    <section className="container-page section">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title={
              <>
                Problems worth solving,
                <br className="hidden md:block" /> shipped end-to-end.
              </>
            }
            description="A focused slice of what I'm building right now. Each project is a case study — problem, decisions, and the role I played — not a screenshot gallery."
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <BookOpen className="size-4" /> Case studies
            </Link>
            <Link to="/projects" className="link-arrow text-sm">
              All projects
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 md:gap-6 lg:grid-cols-3">
        {featuredProjects.map((p, i) => (
          <Reveal key={p.slug} delay={0.06 * i}>
            <ProjectCard p={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
