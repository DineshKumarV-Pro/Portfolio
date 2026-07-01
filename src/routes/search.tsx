import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search as SearchIcon, X, Command as CommandIcon, ArrowUpRight, Clock } from "lucide-react";
import { site } from "@/content/site";
import {
  searchEntries,
  rankEntries,
  highlightMatch,
  searchTaxonomy,
  type SearchEntry,
} from "@/lib/search-index";
import {
  getRecentSearches,
  pushRecentSearch,
  clearRecentSearches,
  getRecentPages,
} from "@/lib/recent-nav";
import { useCommandPalette } from "@/components/search/CommandPaletteProvider";
import { Reveal } from "@/components/common/Reveal";
import { PremiumEmptyState } from "@/components/motion/PremiumEmptyState";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { buildPageHead } from "@/lib/seo";

export const Route = createFileRoute("/search")({
  head: buildPageHead({
    title: `Search — ${site.name}`,
    description:
      "Search across every project, case study, article, note, and page on the site — instant, keyboard-first, and grouped by intent.",
    path: "/search",
  }),
  component: SearchPage,
});

const groupOrder = [
  "Pages",
  "Projects",
  "Case Studies",
  "Writing",
  "Profile",
  "Credibility",
  "Brand",
  "Connect",
  "Skills",
  "Experience",
] as const;

const suggestedQueries = [
  "AI",
  "React",
  "TypeScript",
  "Founder",
  "Case study",
  "ALPHA CodeX",
  "Frontend",
  "Product",
];

function SearchPage() {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [recentPages, setRecentPages] = useState<{ href: string; title: string }[]>([]);
  const { setOpen: setPaletteOpen } = useCommandPalette();

  useEffect(() => {
    setRecentSearches(getRecentSearches());
    setRecentPages(getRecentPages());
  }, []);

  // Debounce query -> recent search
  useEffect(() => {
    if (!query.trim()) return;
    const t = window.setTimeout(() => {
      pushRecentSearch(query);
      setRecentSearches(getRecentSearches());
    }, 900);
    return () => window.clearTimeout(t);
  }, [query]);

  const results = useMemo(() => rankEntries(query), [query]);
  const grouped = useMemo(() => {
    const map = new Map<SearchEntry["group"], SearchEntry[]>();
    for (const r of results) {
      const arr = map.get(r.group) ?? [];
      arr.push(r);
      map.set(r.group, arr);
    }
    return groupOrder.filter((g) => map.has(g)).map((g) => ({ group: g, items: map.get(g) ?? [] }));
  }, [results]);

  const hasQuery = query.trim().length > 0;

  return (
    <div className="pb-24 pt-28 sm:pt-32">
      <div className="container-page">
        <Breadcrumbs items={[{ label: "Search" }]} />

        <Reveal>
          <div className="mt-6 max-w-3xl">
            <div className="text-mono-label text-[var(--brand)]">Global search</div>
            <h1 className="mt-3 text-display-xl text-balance-tight text-foreground">
              Find anything, in a keystroke.
            </h1>
            <p className="mt-4 text-lede text-balance-pretty text-muted-foreground">
              Search across every project, case study, article, and profile page. Instant, ranked,
              and grouped by intent. Press{" "}
              <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[11px]">
                ⌘K
              </kbd>{" "}
              anywhere on the site to open the command palette.
            </p>
          </div>
        </Reveal>

        {/* Search input */}
        <div className="mt-10 max-w-3xl">
          <label htmlFor="site-search" className="sr-only">
            Search the site
          </label>
          <div className="group relative">
            <SearchIcon
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-foreground"
            />
            <input
              id="site-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try projects, alpha codex, react, contact…"
              autoFocus
              aria-label="Search the site"
              className="h-14 w-full rounded-2xl border border-[var(--border-strong)] bg-surface/60 pl-12 pr-14 text-[15px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-foreground/30 focus:bg-surface focus:[box-shadow:var(--shadow-ring)]"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                aria-label="Open command palette"
                className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-border bg-background/80 px-2 py-1 text-[11px] font-mono text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
              >
                <CommandIcon className="size-3" />K
              </button>
            )}
          </div>

          {hasQuery ? (
            <div className="mt-3 text-mono-meta text-muted-foreground">
              {results.length === 0
                ? "No matches"
                : `${results.length} result${results.length === 1 ? "" : "s"}`}
            </div>
          ) : null}
        </div>

        {/* No query: helpful shelves */}
        {!hasQuery ? (
          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div className="space-y-12">
              <SuggestionShelf onPick={setQuery} />
              {recentSearches.length > 0 ? (
                <RecentSearchShelf
                  items={recentSearches}
                  onPick={setQuery}
                  onClear={() => {
                    clearRecentSearches();
                    setRecentSearches([]);
                  }}
                />
              ) : null}
              <QuickActionShelf />
              <PopularShelf />
              <TaxonomyShelf onPick={setQuery} />
            </div>
            <aside className="space-y-8">
              {recentPages.length > 0 ? (
                <div>
                  <div className="text-mono-label mb-3 text-muted-foreground">Recent pages</div>
                  <ul className="space-y-1">
                    {recentPages.map((p) => (
                      <li key={p.href}>
                        <Link
                          to={p.href}
                          className="group flex items-center justify-between rounded-md px-2 py-2 text-[13.5px] text-foreground transition-colors hover:bg-accent"
                        >
                          <span className="inline-flex min-w-0 items-center gap-2">
                            <Clock className="size-3.5 shrink-0 text-muted-foreground" />
                            <span className="truncate">{p.title}</span>
                          </span>
                          <ArrowUpRight className="size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <ShortcutHelp />
            </aside>
          </div>
        ) : (
          <div className="mt-10">
            {results.length === 0 ? (
              <EmptyState query={query} onClear={() => setQuery("")} />
            ) : (
              <div className="space-y-10">
                {grouped.map(({ group, items }) => (
                  <section key={group} aria-labelledby={`group-${group}`}>
                    <h2
                      id={`group-${group}`}
                      className="text-mono-label mb-4 text-muted-foreground"
                    >
                      {group} <span className="ml-1 text-muted-foreground/60">{items.length}</span>
                    </h2>
                    <ul className="grid gap-2">
                      {items.map((entry) => (
                        <ResultCard key={entry.id} entry={entry} query={query} />
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ResultCard({ entry, query }: { entry: SearchEntry; query: string }) {
  const Icon = entry.icon;
  const titleParts = highlightMatch(entry.title, query);
  return (
    <li>
      <Link
        to={entry.href}
        className="group flex items-start gap-4 rounded-xl border border-border bg-surface/40 p-4 transition-all hover:-translate-y-0.5 hover:border-foreground/25 hover:bg-surface hover:[box-shadow:var(--shadow-2)] focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-ring)] motion-reduce:hover:translate-y-0"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent/60 text-foreground transition-colors group-hover:bg-accent">
          <Icon className="size-4.5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="truncate text-[15px] font-medium tracking-[-0.01em] text-foreground">
              {titleParts.map((p, i) =>
                p.match ? (
                  <mark key={i} className="bg-[var(--brand)]/20 px-0.5 text-foreground">
                    {p.text}
                  </mark>
                ) : (
                  <span key={i}>{p.text}</span>
                ),
              )}
            </h3>
            <span className="text-mono-meta shrink-0 text-muted-foreground">{entry.group}</span>
          </div>
          {entry.description ? (
            <p className="mt-1 line-clamp-2 text-[13.5px] leading-relaxed text-muted-foreground">
              {entry.description}
            </p>
          ) : null}
          <div className="mt-2 flex items-center gap-2 text-mono-meta text-muted-foreground">
            <span>{entry.breadcrumb.join(" › ")}</span>
            <span className="opacity-40">•</span>
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-border bg-background px-1 py-0.5 font-mono">
                ↵
              </kbd>
              open
            </span>
          </div>
        </div>
        <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:text-foreground" />
      </Link>
    </li>
  );
}

function SuggestionShelf({ onPick }: { onPick: (q: string) => void }) {
  return (
    <div>
      <div className="text-mono-label mb-3 text-muted-foreground">Suggestions</div>
      <div className="flex flex-wrap gap-2">
        {suggestedQueries.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => onPick(q)}
            className="inline-flex h-8 items-center rounded-full border border-border bg-surface/60 px-3 text-[12.5px] text-foreground transition-colors hover:border-foreground/30 hover:bg-surface"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

function RecentSearchShelf({
  items,
  onPick,
  onClear,
}: {
  items: string[];
  onPick: (q: string) => void;
  onClear: () => void;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-mono-label text-muted-foreground">Recent searches</span>
        <button
          type="button"
          onClick={onClear}
          className="text-[11px] text-muted-foreground transition-colors hover:text-foreground"
        >
          Clear
        </button>
      </div>
      <ul className="grid gap-1">
        {items.map((q) => (
          <li key={q}>
            <button
              type="button"
              onClick={() => onPick(q)}
              className="group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13.5px] text-foreground transition-colors hover:bg-accent"
            >
              <Clock className="size-3.5 text-muted-foreground" />
              <span className="flex-1 truncate">{q}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuickActionShelf() {
  const items = [
    { href: "/hire-me", label: "Hire me", desc: "Availability & how to work together" },
    { href: "/resume", label: "Resume", desc: "One-page CV" },
    { href: "/contact", label: "Contact", desc: "Send a message" },
    { href: "/alpha-codex", label: "ALPHA CodeX", desc: "The studio I'm founding" },
  ];
  return (
    <div>
      <div className="text-mono-label mb-3 text-muted-foreground">Quick actions</div>
      <div className="grid gap-2 sm:grid-cols-2">
        {items.map((it) => (
          <Link
            key={it.href}
            to={it.href}
            className="group flex items-center justify-between rounded-lg border border-border bg-surface/40 px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-foreground/25 hover:bg-surface motion-reduce:hover:translate-y-0"
          >
            <div className="min-w-0">
              <div className="text-[14px] font-medium text-foreground">{it.label}</div>
              <div className="truncate text-[12.5px] text-muted-foreground">{it.desc}</div>
            </div>
            <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
          </Link>
        ))}
      </div>
    </div>
  );
}

function PopularShelf() {
  const popular = searchEntries.filter((e) =>
    [
      "projects",
      "case-studies",
      "alpha-codex",
      "blog",
      "about",
      "skills",
      "hire-me",
      "contact",
    ].includes(e.id),
  );
  return (
    <div>
      <div className="text-mono-label mb-3 text-muted-foreground">Popular destinations</div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {popular.map((e) => {
          const Icon = e.icon;
          return (
            <li key={e.id}>
              <Link
                to={e.href}
                className="group flex items-center gap-3 rounded-lg border border-border/70 bg-surface/30 px-3 py-2.5 transition-colors hover:border-foreground/25 hover:bg-surface"
              >
                <Icon className="size-4 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13.5px] text-foreground">{e.title}</div>
                  <div className="truncate text-[11.5px] text-muted-foreground">
                    {e.description}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function TaxonomyShelf({ onPick }: { onPick: (q: string) => void }) {
  const chip =
    "inline-flex h-7 items-center rounded-full border border-border bg-surface/40 px-2.5 text-[12px] text-foreground transition-colors hover:border-foreground/30 hover:bg-surface";
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <div>
        <div className="text-mono-label mb-3 text-muted-foreground">Technologies</div>
        <div className="flex flex-wrap gap-1.5">
          {searchTaxonomy.technologies.slice(0, 16).map((t) => (
            <button key={t} className={chip} onClick={() => onPick(t)}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="text-mono-label mb-3 text-muted-foreground">Skills</div>
        <div className="flex flex-wrap gap-1.5">
          {searchTaxonomy.skillTerms.slice(0, 16).map((t) => (
            <button key={t} className={chip} onClick={() => onPick(t)}>
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShortcutHelp() {
  const rows: [string, string][] = [
    ["⌘ / Ctrl + K", "Open palette anywhere"],
    ["↑ ↓", "Move selection"],
    ["Enter", "Open result"],
    ["Esc", "Close"],
  ];
  return (
    <div>
      <div className="text-mono-label mb-3 text-muted-foreground">Keyboard</div>
      <dl className="grid gap-1.5 rounded-lg border border-border bg-surface/40 p-3">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-3 text-[12.5px]">
            <dt className="text-muted-foreground">{v}</dt>
            <dd>
              <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[11px] text-foreground">
                {k}
              </kbd>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function EmptyState({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <PremiumEmptyState
      icon={<SearchIcon className="size-5 text-muted-foreground" />}
      title={<>No matches for &ldquo;{query}&rdquo;.</>}
      description="Try a shorter query, or explore a popular destination."
      actions={["Projects", "Blog", "About", "Contact"].map((c) => (
        <button
          key={c}
          type="button"
          onClick={onClear}
          className="inline-flex h-9 min-h-[44px] items-center rounded-full border border-border bg-surface px-3 text-[12.5px] text-foreground transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-surface/80 motion-reduce:hover:translate-y-0"
        >
          {c}
        </button>
      ))}
    />
  );
}
