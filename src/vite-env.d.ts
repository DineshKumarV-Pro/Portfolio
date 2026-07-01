/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_ANALYTICS_ENABLED?: string;
  readonly VITE_NEWSLETTER_PROVIDER?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_PLAUSIBLE_DOMAIN?: string;
  readonly VITE_CONTACT_API_URL?: string;
  readonly VITE_NEWSLETTER_API_URL?: string;
  readonly VITE_POSTHOG_KEY?: string;
  readonly VITE_CLARITY_ID?: string;
  readonly VITE_LINKEDIN_PARTNER_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
