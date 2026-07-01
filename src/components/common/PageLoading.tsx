import { Reveal } from "@/components/common/Reveal";
import { CardSkeleton, TextSkeleton, Skeleton } from "@/components/motion/PremiumSkeleton";

export function PageLoading() {
  return (
    <div className="container-page py-24 md:py-32">
      {/* Eyebrow / Breadcrumbs loading */}
      <div className="mb-8 flex items-center gap-2">
        <Skeleton className="h-4 w-16" />
        <span className="text-muted-foreground">/</span>
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Hero section loading */}
      <Reveal>
        <div className="max-w-[640px] space-y-4">
          <Skeleton className="h-10 w-3/4 md:h-12" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
        </div>
      </Reveal>

      {/* Body content loading layout */}
      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Reveal delay={0.05}>
          <CardSkeleton />
        </Reveal>
        <Reveal delay={0.1}>
          <CardSkeleton />
        </Reveal>
        <Reveal delay={0.15} className="hidden md:block">
          <CardSkeleton />
        </Reveal>
      </div>

      <div className="mt-12 max-w-[720px]">
        <Reveal delay={0.2}>
          <TextSkeleton lines={4} />
        </Reveal>
      </div>
    </div>
  );
}
