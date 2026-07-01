import type { Project } from "@/content/projects";

const labels: Record<Project["status"], string> = {
  shipped: "Shipped",
  "in-progress": "In progress",
  concept: "Concept",
};

export function StatusPill({ status }: { status: Project["status"] }) {
  const dot =
    status === "shipped"
      ? "bg-[var(--success)]"
      : status === "in-progress"
        ? "bg-[var(--warning)]"
        : "bg-muted-foreground";
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] px-2 py-0.5 text-mono-label " +
        (status === "shipped" ? "text-foreground" : "text-muted-foreground")
      }
    >
      <span aria-hidden className={"size-1 rounded-full " + dot} />
      {labels[status]}
    </span>
  );
}
