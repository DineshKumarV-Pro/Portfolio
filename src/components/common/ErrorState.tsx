import { Link } from "@tanstack/react-router";
import { AlertTriangle, Home, RefreshCw, Search, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

type NotFoundStateProps = {
  title?: string;
  description?: string;
};

export function NotFoundState({
  title = "This page doesn't exist yet.",
  description = "The URL is fine — the content for it just hasn't been built. Head back to the homepage or browse the sitemap.",
}: NotFoundStateProps) {
  return (
    <div
      className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background px-4"
      aria-labelledby="not-found-heading"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-spotlight" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-dot-grid opacity-50 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]"
      />
      <div className="relative max-w-lg text-center">
        <p className="text-mono-label text-[var(--brand)]">Error 404</p>
        <h1
          id="not-found-heading"
          className="mt-4 text-display-xl text-balance-tight text-foreground"
        >
          {title}
        </h1>
        <p className="mt-5 text-lede text-balance-pretty text-muted-foreground">{description}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild variant="primary" size="lg">
            <Link to="/">
              <Home className="size-4" aria-hidden />
              Go home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/search">
              <Search className="size-4" aria-hidden />
              Search site
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <a href="/sitemap.xml">View sitemap</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
  errorMessage?: string;
};

export function ErrorState({
  title = "This page didn't load.",
  description = "Something went wrong rendering this view. Try again or head back home.",
  onRetry,
  errorMessage,
}: ErrorStateProps) {
  return (
    <div
      className="flex min-h-dvh items-center justify-center bg-background px-4"
      role="alert"
      aria-live="assertive"
      aria-labelledby="error-heading"
    >
      <div className="max-w-md text-center">
        <div className="mx-auto grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
          <AlertTriangle className="size-5" aria-hidden />
        </div>
        <p className="mt-4 text-mono-label text-muted-foreground">Something broke</p>
        <h1 id="error-heading" className="mt-3 text-display-lg text-balance-tight text-foreground">
          {title}
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{description}</p>
        {errorMessage && import.meta.env.DEV ? (
          <p className="mt-3 rounded-md border border-border bg-surface/60 px-3 py-2 font-mono text-[12px] text-muted-foreground">
            {errorMessage}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {onRetry ? (
            <Button type="button" variant="primary" onClick={onRetry}>
              <RefreshCw className="size-4" aria-hidden />
              Try again
            </Button>
          ) : null}
          <Button asChild variant={onRetry ? "outline" : "primary"}>
            <a href="/">
              <Home className="size-4" aria-hidden />
              Go home
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

type OfflineStateProps = {
  onRetry?: () => void;
};

export function OfflineState({ onRetry }: OfflineStateProps) {
  return (
    <div
      className="flex min-h-dvh items-center justify-center bg-background px-4"
      role="alert"
      aria-live="assertive"
      aria-labelledby="offline-heading"
    >
      <div className="max-w-md text-center">
        <div className="mx-auto grid size-12 place-items-center rounded-full bg-[var(--warning)]/10 text-[var(--warning)]">
          <WifiOff className="size-5" aria-hidden />
        </div>
        <p className="mt-4 text-mono-label text-muted-foreground">No connection</p>
        <h1
          id="offline-heading"
          className="mt-3 text-display-lg text-balance-tight text-foreground"
        >
          You're offline.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          Check your network connection and try again. The page will reload automatically when
          you're back online.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            type="button"
            variant="primary"
            onClick={onRetry ?? (() => window.location.reload())}
          >
            <RefreshCw className="size-4" aria-hidden />
            Retry
          </Button>
        </div>
      </div>
    </div>
  );
}
