/**
 * Runtime configuration — reads from Vite env with safe fallbacks.
 * Set VITE_SITE_URL in production (e.g. https://dineshkumarv.pro).
 */
export function getSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return "";
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${normalized}` : normalized;
}

/** Feature flags — enable when providers are wired. */
export const features = {
  analytics: import.meta.env.VITE_ANALYTICS_ENABLED === "true",
  newsletterProvider: import.meta.env.VITE_NEWSLETTER_PROVIDER ?? "",
} as const;

export const env = {
  siteUrl: getSiteUrl(),
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;
