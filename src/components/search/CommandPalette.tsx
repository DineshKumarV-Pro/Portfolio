import { useEffect, useMemo, useState } from "react";
import {
  Command,
  Copy,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
  Download,
  Rocket,
  ArrowUpRight,
  Clock,
  Sparkles,
  FileText,
  FolderGit2,
  Home,
  Search as SearchIcon,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { rankEntries, type SearchEntry } from "@/lib/search-index";
import { getRecentPages, pushRecentSearch } from "@/lib/recent-nav";
import { site } from "@/content/site";
import { useTheme } from "@/lib/theme";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onNavigate: (href: string) => void;
};

const groupOrder: SearchEntry["group"][] = [
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
];

export function CommandPalette({ open, onOpenChange, onNavigate }: Props) {
  const [query, setQuery] = useState("");
  const { toggle: toggleThemeState } = useTheme();
  const [recent, setRecent] = useState<{ href: string; title: string }[]>([]);

  useEffect(() => {
    if (open) {
      setRecent(getRecentPages());
      setQuery("");
    }
  }, [open]);

  const results = useMemo(() => rankEntries(query), [query]);
  const grouped = useMemo(() => {
    const map = new Map<SearchEntry["group"], SearchEntry[]>();
    for (const r of results) {
      const arr = map.get(r.group) ?? [];
      arr.push(r);
      map.set(r.group, arr);
    }
    return groupOrder
      .filter((g) => map.has(g))
      .map((g) => ({ group: g, items: (map.get(g) ?? []).slice(0, 8) }));
  }, [results]);

  const commit = (href: string) => {
    if (query.trim()) pushRecentSearch(query);
    onNavigate(href);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      toast.success("Email copied", { description: site.email });
    } catch {
      toast.error("Couldn't copy — long-press the address instead");
    }
    onOpenChange(false);
  };

  const toggleTheme = () => {
    toggleThemeState();
    onOpenChange(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search pages, projects, writing…"
        value={query}
        onValueChange={setQuery}
        aria-label="Search the site"
      />
      <CommandList className="max-h-[70vh]">
        <CommandEmpty>
          <div className="py-8 text-center">
            <div className="text-sm text-foreground">No results for “{query}”.</div>
            <div className="mt-1 text-xs text-muted-foreground">
              Try “projects”, “alpha”, “react”, or “contact”.
            </div>
          </div>
        </CommandEmpty>

        {!query && recent.length > 0 ? (
          <>
            <CommandGroup heading="Recent">
              {recent.map((r) => (
                <CommandItem
                  key={`recent:${r.href}`}
                  value={`recent ${r.title} ${r.href}`}
                  onSelect={() => commit(r.href)}
                >
                  <Clock className="mr-2 size-4 text-muted-foreground" />
                  <span className="flex-1 truncate">{r.title}</span>
                  <span className="ml-2 hidden truncate text-[11px] text-muted-foreground sm:inline">
                    {r.href}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        ) : null}

        {!query ? (
          <>
            <CommandGroup heading="Quick actions">
              <CommandItem value="hire me" onSelect={() => commit("/hire-me")}>
                <Rocket className="mr-2 size-4 text-[var(--brand)]" />
                <span className="flex-1">Hire me</span>
                <CommandShortcut>G H</CommandShortcut>
              </CommandItem>
              <CommandItem value="resume download" onSelect={() => commit("/resume")}>
                <Download className="mr-2 size-4" />
                <span className="flex-1">Resume</span>
              </CommandItem>
              <CommandItem value="contact" onSelect={() => commit("/contact")}>
                <Mail className="mr-2 size-4" />
                <span className="flex-1">Contact</span>
              </CommandItem>
              <CommandItem value="alpha codex" onSelect={() => commit("/alpha-codex")}>
                <Sparkles className="mr-2 size-4 text-[var(--brand)]" />
                <span className="flex-1">Visit ALPHA CodeX</span>
              </CommandItem>
              <CommandItem value="projects" onSelect={() => commit("/projects")}>
                <FolderGit2 className="mr-2 size-4" />
                <span className="flex-1">Browse projects</span>
              </CommandItem>
              <CommandItem value="case studies" onSelect={() => commit("/case-studies")}>
                <FileText className="mr-2 size-4" />
                <span className="flex-1">Read case studies</span>
              </CommandItem>
              <CommandItem value="home" onSelect={() => commit("/")}>
                <Home className="mr-2 size-4" />
                <span className="flex-1">Home</span>
              </CommandItem>
              <CommandItem value="search page" onSelect={() => commit("/search")}>
                <SearchIcon className="mr-2 size-4" />
                <span className="flex-1">Open full search</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Commands">
              <CommandItem value="copy email" onSelect={copyEmail}>
                <Copy className="mr-2 size-4" />
                <span className="flex-1">Copy email address</span>
                <span className="ml-2 hidden truncate text-[11px] text-muted-foreground sm:inline">
                  {site.email}
                </span>
              </CommandItem>
              <CommandItem value="toggle theme" onSelect={toggleTheme}>
                <Sun className="mr-2 size-4 dark:hidden" />
                <Moon className="mr-2 hidden size-4 dark:block" />
                <span className="flex-1">Toggle theme</span>
              </CommandItem>
              <CommandItem value="open github" onSelect={() => onNavigate(site.social.github)}>
                <Github className="mr-2 size-4" />
                <span className="flex-1">Open GitHub</span>
                <ArrowUpRight className="ml-2 size-3.5 text-muted-foreground" />
              </CommandItem>
              <CommandItem value="open linkedin" onSelect={() => onNavigate(site.social.linkedin)}>
                <Linkedin className="mr-2 size-4" />
                <span className="flex-1">Open LinkedIn</span>
                <ArrowUpRight className="ml-2 size-3.5 text-muted-foreground" />
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
          </>
        ) : null}

        {grouped.map(({ group, items }) => (
          <CommandGroup key={group} heading={group}>
            {items.map((entry) => {
              const Icon = entry.icon;
              return (
                <CommandItem
                  key={entry.id}
                  value={`${entry.title} ${entry.description ?? ""} ${entry.keywords.join(" ")} ${entry.breadcrumb.join(" ")}`}
                  onSelect={() => commit(entry.href)}
                >
                  <Icon className="mr-2 size-4 text-muted-foreground" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-[13.5px] text-foreground">{entry.title}</span>
                    <span className="truncate text-[11.5px] text-muted-foreground">
                      {entry.breadcrumb.join(" › ")}
                      {entry.description ? ` · ${entry.description}` : ""}
                    </span>
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}
      </CommandList>

      <div className="flex items-center justify-between gap-2 border-t border-border px-3 py-2 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <kbd className="rounded border border-border bg-background px-1 py-0.5 font-mono">
              ↑↓
            </kbd>
            Navigate
          </span>
          <span className="inline-flex items-center gap-1">
            <kbd className="rounded border border-border bg-background px-1 py-0.5 font-mono">
              ↵
            </kbd>
            Open
          </span>
          <span className="inline-flex items-center gap-1">
            <kbd className="rounded border border-border bg-background px-1 py-0.5 font-mono">
              esc
            </kbd>
            Close
          </span>
        </div>
        <span className="inline-flex items-center gap-1">
          <Command className="size-3" />K
        </span>
      </div>
    </CommandDialog>
  );
}
