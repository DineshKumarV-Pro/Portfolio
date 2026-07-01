import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage, type ScaffoldMeta, buildScaffoldHead } from "@/lib/scaffold";

const meta: ScaffoldMeta = {
  path: "/recommendations",
  label: "Recommendations",
  title: "Recommendations",
  metaTitle: "Recommendations — Dinesh Kumar V",
  description:
    "Endorsements from mentors, collaborators, and clients I've worked closely with — always attributed, never paraphrased.",
  eyebrow: "Endorsements",
  purpose:
    "To let people who've actually worked with me speak in their own words, so external readers have signal that doesn't come from me.",
  expect: [
    "Verbatim recommendations from mentors, collaborators, and clients",
    "Author, role, and organisation for each recommendation",
    "The nature of our working relationship and the context of the work",
    "Only recommendations from people I've genuinely delivered for",
  ],
  status: "Recommendations will be published once long-term collaborations are completed",
  direction:
    "The bar is high on purpose: only recommendations that reflect real, sustained work will appear here. Quality is the point, not volume.",
  related: [
    { label: "Experience", href: "/experience" },
    { label: "Case studies", href: "/case-studies" },
    { label: "Hire me", href: "/hire-me" },
    { label: "Contact", href: "/contact" },
  ],
};

export const Route = createFileRoute("/recommendations")({
  head: buildScaffoldHead(meta),
  component: () => <ScaffoldPage meta={meta} />,
});
