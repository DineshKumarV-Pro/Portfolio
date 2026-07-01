import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitNewsletter } from "@/lib/forms/newsletter";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type NewsletterFormProps = {
  source: string;
  className?: string;
  inputId?: string;
  compact?: boolean;
  onSuccess?: () => void;
};

export function NewsletterForm({
  source,
  className,
  inputId = "newsletter-email",
  compact = false,
  onSuccess,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await submitNewsletter({ email, website }, source);
    setLoading(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setSuccess(true);
    setEmail("");
    trackEvent({ name: "newsletter_submit", source });
    onSuccess?.();
  }

  if (success) {
    return (
      <p role="status" className={cn("text-[14px] text-[var(--success)]", className)}>
        Thanks — you&rsquo;re on the list. First email when the next essay ships.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className} aria-label="Newsletter signup" noValidate>
      {/* Honeypot — hidden from users and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${inputId}-website`}>Website</label>
        <input
          id={`${inputId}-website`}
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div
        className={cn(
          "flex w-full overflow-hidden rounded-md border border-[var(--border-strong)] focus-within:border-[var(--brand)] focus-within:[box-shadow:var(--shadow-ring)]",
          compact ? "max-w-sm" : "max-w-md",
        )}
      >
        <Input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@domain.com"
          aria-label="Email address for newsletter"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className="h-10 min-w-0 flex-1 rounded-none border-0 bg-background px-3 text-[14px] shadow-none focus-visible:ring-0"
        />
        <Button
          type="submit"
          variant="primary"
          size="sm"
          loading={loading}
          disabled={loading}
          className="m-1 rounded-[6px] hover-lift"
        >
          Subscribe
        </Button>
      </div>

      {error ? (
        <p id={`${inputId}-error`} role="alert" className="mt-2 text-[13px] text-destructive">
          {error}
        </p>
      ) : null}
    </form>
  );
}
