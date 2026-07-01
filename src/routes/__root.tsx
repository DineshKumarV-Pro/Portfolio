import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  ScriptOnce,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { WifiOff } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { ScrollProgress } from "../components/layout/ScrollProgress";
import { MotionShell } from "../components/motion/MotionShell";
import { CommandPaletteProvider } from "../components/search/CommandPaletteProvider";
import { NotFoundState, ErrorState } from "../components/common/ErrorState";
import { themeBootstrapScript } from "../lib/theme";
import { buildRootHead } from "../lib/seo";
import { initAnalytics, trackPageView } from "../lib/analytics";

function NotFoundComponent() {
  return <NotFoundState />;
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <ErrorState
      errorMessage={error.message}
      onRetry={() => {
        router.invalidate();
        reset();
      }}
    />
  );
}

function PageAnalytics() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    initAnalytics();
    trackPageView(pathname);
  }, [pathname]);
  return null;
}

const rootHead = buildRootHead();

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    ...rootHead,
    links: [...(rootHead.links ?? []), { rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ScriptOnce>{themeBootstrapScript}</ScriptOnce>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CommandPaletteProvider>
        <PageAnalytics />
        <ScrollProgress />
        <Header />
        <main id="main" className="min-h-screen" tabIndex={-1}>
          <MotionShell>
            <Outlet />
          </MotionShell>
        </main>
        <Footer />
      </CommandPaletteProvider>
    </QueryClientProvider>
  );
}
