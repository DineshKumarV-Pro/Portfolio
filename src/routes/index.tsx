import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { AboutPreview } from "@/components/home/AboutPreview";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Capabilities } from "@/components/home/Capabilities";
import { ExperienceSnapshot } from "@/components/home/ExperienceSnapshot";
import { SkillsGrid } from "@/components/home/SkillsGrid";
import { AlphaCodexBand } from "@/components/home/AlphaCodexBand";
import { WritingPreview } from "@/components/home/WritingPreview";
import { CredentialsPreview } from "@/components/home/CredentialsPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { NowBlock } from "@/components/home/NowBlock";
import { ContactCTA } from "@/components/home/ContactCTA";
import { site } from "@/content/site";
import { buildPageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: buildPageHead({
    title: `${site.name} — ${site.role}`,
    description: site.description,
    path: "/",
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <AboutPreview />
      <SelectedWork />
      <Capabilities />
      <ExperienceSnapshot />
      <SkillsGrid />
      <AlphaCodexBand />
      <WritingPreview />
      <CredentialsPreview />
      <Testimonials />
      <NowBlock />
      <ContactCTA />
    </>
  );
}
