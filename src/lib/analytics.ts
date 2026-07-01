/**
 * Analytics architecture — no tracking enabled by default.
 *
 * Wire a provider by setting VITE_ANALYTICS_ENABLED=true and implementing
 * the provider adapter below. Supports future: GA4, Plausible, PostHog, Clarity.
 */

import { features } from "@/lib/config";

export type AnalyticsEvent =
  | { name: "page_view"; path: string }
  | { name: "resume_download"; format: "pdf" }
  | { name: "resume_view"; format: "pdf" }
  | { name: "social_click"; platform: string; url: string }
  | { name: "project_click"; slug: string; title: string }
  | { name: "contact_submit"; inquiry: string }
  | { name: "newsletter_submit"; source: string }
  | { name: "hire_me_click"; source: string }
  | { name: "external_link"; url: string; label: string }
  | { name: "search"; query: string; resultCount: number }
  | { name: "command_palette"; action: "open" | "navigate"; target?: string };

export type AnalyticsProvider = {
  name: string;
  init: () => void;
  track: (event: AnalyticsEvent) => void;
  page: (path: string) => void;
};

const noopProvider: AnalyticsProvider = {
  name: "noop",
  init: () => {},
  track: () => {},
  page: () => {},
};

let activeProvider: AnalyticsProvider = noopProvider;
let initialized = false;

/** Register provider at app bootstrap when analytics is enabled. */
export function registerAnalyticsProvider(provider: AnalyticsProvider) {
  activeProvider = provider;
}

export function initAnalytics() {
  if (!features.analytics || initialized) return;
  initialized = true;
  activeProvider.init();
}

export function trackEvent(event: AnalyticsEvent) {
  if (!features.analytics) return;
  activeProvider.track(event);
}

export function trackPageView(path: string) {
  if (!features.analytics) return;
  activeProvider.page(path);
}

/** Example GA4 adapter — uncomment and wire in RootComponent when ready:
 *
 * registerAnalyticsProvider({
 *   name: "ga4",
 *   init: () => { load gtag script using VITE_GA_MEASUREMENT_ID },
 *   track: (e) => gtag("event", e.name, e),
 *   page: (path) => gtag("config", MEASUREMENT_ID, { page_path: path }),
 * });
 */
