import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage, type ScaffoldMeta, buildScaffoldHead } from "@/lib/scaffold";

const meta: ScaffoldMeta = {
  path: "/testimonials",
  label: "Testimonials",
  title: "Testimonials",
  metaTitle: "Testimonials — Dinesh Kumar V",
  description:
    "Words from the people I've built with — mentors, clients, and collaborators — kept verbatim and attributed.",
  eyebrow: "In their words",
  purpose:
    "External voices carry more weight than self-description. This page will collect the honest ones — no anonymous quotes, no hype.",
  expect: [
    "Full quotes, unedited, from real collaborators",
    "Author's full name, role, and organisation",
    "Context about the project or working relationship",
    "Optional headshots and links where publicly available",
  ],
  status: "Testimonials will be published once long-term collaborations are completed",
  direction:
    "Rather than list every kind message, this page will grow slowly with substantial testimonials from projects that shipped and clients I've worked with over time.",
  related: [
    { label: "Recommendations", href: "/recommendations" },
    { label: "Case studies", href: "/case-studies" },
    { label: "Hire me", href: "/hire-me" },
    { label: "Services", href: "/services" },
  ],
};

export const Route = createFileRoute("/testimonials")({
  head: buildScaffoldHead(meta),
  component: () => <ScaffoldPage meta={meta} />,
});
