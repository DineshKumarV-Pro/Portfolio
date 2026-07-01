import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-mono-meta text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link
            to="/"
            aria-label="Home"
            className="inline-flex items-center rounded-sm px-1 py-0.5 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-ring)]"
          >
            <Home className="size-3.5" aria-hidden />
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="size-3.5 opacity-50" aria-hidden />
            {item.href ? (
              <Link
                to={item.href}
                className="rounded-sm px-1 py-0.5 transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <span className="px-1 text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
