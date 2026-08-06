import { Hero } from "@/components/landing/Hero";
import { StatsStrip } from "@/components/landing/StatsStrip";
import { FeaturedPrograms } from "@/components/landing/FeaturedPrograms";
import { CategoryGrid } from "@/components/landing/CategoryGrid";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <FeaturedPrograms />
      <CategoryGrid />
      <Features />
      <HowItWorks />
    </>
  );
}
