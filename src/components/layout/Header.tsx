import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Command as CommandIcon, ArrowUpRight, Search as SearchIcon } from "lucide-react";
import { motion, LayoutGroup, useReducedMotion } from "motion/react";
import { primaryNav, navGroups } from "@/content/nav";
import { site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCommandPalette } from "@/components/search/CommandPaletteProvider";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SCROLL_THRESHOLD } from "@/lib/constants";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { setOpen: setPaletteOpen } = useCommandPalette();
  const reduce = useReducedMotion();

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > SCROLL_THRESHOLD);
      if (Math.abs(y - lastY) > 6) {
        setScrollDir(y > lastY ? "down" : "up");
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={false}
      animate={
        reduce
          ? {}
          : {
              y: scrolled && scrollDir === "down" && !mobileOpen ? -4 : 0,
              opacity: scrolled && scrollDir === "down" && !mobileOpen ? 0.96 : 1,
            }
      }
      transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300",
        scrolled
          ? "border-b border-border bg-background/75 shadow-[0_8px_32px_-12px_oklch(0_0_0_/_0.12)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="group inline-flex min-w-0 items-center gap-2.5" aria-label="Home">
          <span className="grid size-8 shrink-0 place-items-center rounded-md bg-foreground text-background font-mono text-[11px] font-bold tracking-tighter">
            {site.initials}
          </span>
          <span className="hidden truncate text-[15px] font-medium tracking-[-0.01em] text-foreground sm:inline">
            {site.shortName}
            <span className="text-[var(--brand)]">.</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex">
          <LayoutGroup id="primary-nav">
            <ul className="flex items-center gap-0.5">
              {primaryNav.map((item) => {
                const active =
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-flex h-9 items-center rounded-md px-3 text-[13.5px] font-medium tracking-[-0.005em] transition-colors",
                        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {active ? (
                        <motion.span
                          layoutId="nav-active-bg"
                          aria-hidden
                          className="absolute inset-0 rounded-md bg-accent/70"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      ) : null}
                      <span className="relative">{item.label}</span>
                      {active ? (
                        <motion.span
                          layoutId="nav-active-underline"
                          aria-hidden
                          className="absolute inset-x-3 -bottom-px h-px bg-[var(--brand)]"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </LayoutGroup>
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            aria-label="Open search (⌘K)"
            className="hidden h-9 items-center gap-2 rounded-md border border-[var(--border-strong)] bg-surface/60 px-2.5 text-[13px] text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground md:inline-flex"
          >
            <CommandIcon className="size-3.5" />
            <span>Search</span>
            <kbd className="ml-3 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
              ⌘K
            </kbd>
          </button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open search"
            onClick={() => setPaletteOpen(true)}
            className="md:hidden"
          >
            <SearchIcon />
          </Button>
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            variant="primary"
            className="btn-press hidden sm:inline-flex group/cta"
          >
            <Link to="/hire-me">
              Hire me{" "}
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </Link>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden">
                {mobileOpen ? <X /> : <Menu />}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full overflow-y-auto sm:max-w-md data-[state=open]:animate-in data-[state=closed]:animate-out"
            >
              <SheetHeader>
                <SheetTitle className="text-display-lg">Navigate</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-9 pb-12">
                {navGroups.map((group) => (
                  <div key={group.label}>
                    <div className="mb-3 text-mono-label text-muted-foreground">{group.label}</div>
                    <ul className="grid gap-0.5">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            to={item.href}
                            className="flex items-center justify-between rounded-md px-2 py-2.5 text-[15px] text-foreground transition-colors hover:bg-accent"
                          >
                            <span className="inline-flex items-center gap-2.5">
                              {item.icon ? (
                                <item.icon className="size-4 text-muted-foreground" />
                              ) : null}
                              {item.label}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <Button asChild variant="primary" className="w-full">
                  <Link to="/hire-me">Hire me</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
