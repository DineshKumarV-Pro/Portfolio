const RECENT_KEY = "dkv:recent-pages:v1";
const MAX_RECENT = 6;

export type RecentEntry = { href: string; title: string; ts: number };

export function getRecentPages(): RecentEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, MAX_RECENT) : [];
  } catch {
    return [];
  }
}

export function pushRecentPage(entry: { href: string; title: string }) {
  if (typeof window === "undefined") return;
  try {
    const list = getRecentPages().filter((r) => r.href !== entry.href);
    list.unshift({ ...entry, ts: Date.now() });
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, MAX_RECENT)));
  } catch {
    /* noop */
  }
}

const SEARCH_KEY = "dkv:recent-searches:v1";
const MAX_SEARCHES = 5;

export function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SEARCH_KEY);
    return raw ? (JSON.parse(raw) as string[]).slice(0, MAX_SEARCHES) : [];
  } catch {
    return [];
  }
}

export function pushRecentSearch(query: string) {
  if (typeof window === "undefined") return;
  const q = query.trim();
  if (q.length < 2) return;
  try {
    const list = getRecentSearches().filter((s) => s.toLowerCase() !== q.toLowerCase());
    list.unshift(q);
    window.localStorage.setItem(SEARCH_KEY, JSON.stringify(list.slice(0, MAX_SEARCHES)));
  } catch {
    /* noop */
  }
}

export function clearRecentSearches() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(SEARCH_KEY);
  } catch {
    /* noop */
  }
}
