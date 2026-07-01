import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import React, { Suspense } from "react";

const CommandPalette = React.lazy(() =>
  import("./CommandPalette").then((m) => ({ default: m.CommandPalette })),
);
import { pushRecentPage } from "@/lib/recent-nav";
import { searchEntries } from "@/lib/search-index";

type Ctx = { open: boolean; setOpen: (v: boolean) => void; toggle: () => void };

const CommandPaletteContext = createContext<Ctx | null>(null);

export function useCommandPalette() {
  const ctx = useContext(CommandPaletteContext);
  if (!ctx) throw new Error("CommandPalette provider missing");
  return ctx;
}

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const toggle = useCallback(() => setOpen((v) => !v), []);

  // ⌘K / Ctrl+K global shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Track recent pages on route change
  useEffect(() => {
    const match = searchEntries.find((e) => e.href === pathname);
    if (match) pushRecentPage({ href: match.href, title: match.title });
  }, [pathname]);

  const value = useMemo(() => ({ open, setOpen, toggle }), [open, toggle]);

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
      {open && (
        <Suspense fallback={null}>
          <CommandPalette
            open={open}
            onOpenChange={setOpen}
            onNavigate={(href) => {
              setOpen(false);
              if (href.startsWith("http")) window.open(href, "_blank", "noopener,noreferrer");
              else navigate({ to: href });
            }}
          />
        </Suspense>
      )}
    </CommandPaletteContext.Provider>
  );
}
