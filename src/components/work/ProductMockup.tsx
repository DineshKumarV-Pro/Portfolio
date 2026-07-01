import type { Project } from "@/content/projects";

/**
 * A placeholder product preview that looks like real device chrome.
 * No fabricated screenshots — uses the project's initials, category, and
 * a deterministic gradient so the surface always feels intentional.
 */

function initials(title: string) {
  const parts = title
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .trim()
    .split(/\s+/);
  if (parts.length === 0) return "·";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
}

function gradientFor(slug: string) {
  // Stable hash -> hue, so every project keeps the same color forever.
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  const hue = h % 360;
  return {
    a: `oklch(0.65 0.18 ${hue})`,
    b: `oklch(0.55 0.22 ${(hue + 38) % 360})`,
    c: `oklch(0.45 0.18 ${(hue + 220) % 360})`,
  };
}

type Variant = "hero" | "card" | "thumb";

export function ProductMockup({
  p,
  variant = "card",
  device = "browser",
}: {
  p: Project;
  variant?: Variant;
  device?: "browser" | "phone";
}) {
  const g = gradientFor(p.slug);
  const aspect =
    variant === "hero"
      ? "aspect-[16/10]"
      : variant === "thumb"
        ? "aspect-[16/10]"
        : "aspect-[16/10]";
  const initial = initials(p.title);

  return (
    <div
      className={
        "group/mockup relative overflow-hidden rounded-xl border border-[var(--border)] " +
        "bg-surface/40 [box-shadow:var(--shadow-elegant,0_20px_60px_-30px_rgba(0,0,0,.35))] " +
        aspect
      }
      aria-hidden
    >
      {/* Painted "screenshot" — gradient field with soft orbs */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(120% 80% at 10% 0%, ${g.a} 0%, transparent 55%),
            radial-gradient(80% 70% at 90% 20%, ${g.b} 0%, transparent 60%),
            linear-gradient(180deg, ${g.c} 0%, oklch(0.16 0.02 260) 100%)`,
        }}
      />
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_120%,rgba(0,0,0,0.55),transparent_60%)]" />

      {/* Device chrome */}
      {device === "browser" ? (
        <div className="absolute inset-x-0 top-0 flex items-center gap-2 px-4 py-3">
          <span className="size-2.5 rounded-full bg-white/30" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <div className="ml-3 hidden flex-1 sm:flex">
            <div className="mx-auto inline-flex max-w-[70%] items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10.5px] tracking-wide text-white/70 backdrop-blur-sm">
              <span className="inline-block size-1 rounded-full bg-white/60" />
              {p.slug}.app
            </div>
          </div>
        </div>
      ) : null}

      {/* Title plate */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <div className="font-display text-white/90 leading-none tracking-tight text-[clamp(48px,11vw,128px)] drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
          {initial}
        </div>
        <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/70">
          {p.category} · {p.year}
        </div>
        {variant === "hero" && p.tagline ? (
          <div className="mt-2 max-w-[42ch] text-[13px] text-white/75">{p.tagline}</div>
        ) : null}
      </div>

      {/* Status corner */}
      <div className="absolute right-3 top-3 sm:right-4 sm:top-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2 py-0.5 text-[10.5px] uppercase tracking-wider text-white/85 backdrop-blur-sm">
          <span
            className={
              "inline-block size-1.5 rounded-full " +
              (p.status === "shipped"
                ? "bg-[var(--success)]"
                : p.status === "in-progress"
                  ? "bg-[var(--warning)]"
                  : "bg-white/60")
            }
          />
          {p.status === "in-progress"
            ? "In progress"
            : p.status === "shipped"
              ? "Shipped"
              : "Concept"}
        </span>
      </div>

      {/* Sheen on hover */}
      <div className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-[linear-gradient(110deg,transparent_40%,rgba(255,255,255,0.18)_50%,transparent_60%)] transition-transform duration-700 ease-out group-hover/mockup:translate-x-[120%] motion-reduce:transition-none motion-reduce:group-hover/mockup:translate-x-0" />
    </div>
  );
}
