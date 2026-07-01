const highlights = [
  { value: "5+", label: "Products in build" },
  { value: "1", label: "Studio founded" },
  { value: "20+", label: "Tools in the stack" },
  { value: "2026", label: "Open for roles" },
];

const tech = [
  "TypeScript",
  "React",
  "Next.js",
  "TanStack Start",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Supabase",
  "Figma",
  "Vite",
  "Cloudflare",
  "AI Gateway",
];

export function TrustStrip() {
  return (
    <section aria-label="At a glance" className="border-y border-border bg-surface/40">
      <div className="container-page py-10 md:py-12">
        <dl className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
          {highlights.map((h) => (
            <div key={h.label} className="min-w-0">
              <dt className="text-mono-label text-muted-foreground">{h.label}</dt>
              <dd className="mt-2 text-h2 font-medium tracking-[-0.02em] text-foreground">
                {h.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-col items-start gap-4 border-t border-border pt-7 md:flex-row md:items-center md:gap-10">
          <div className="text-mono-label text-muted-foreground md:min-w-[140px]">Daily stack</div>
          <div
            className="relative w-full overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
            }}
          >
            <div className="flex w-max animate-marquee gap-12 pr-12">
              {[...tech, ...tech].map((label, i) => (
                <span key={i} className="whitespace-nowrap text-mono-meta text-muted-foreground">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
