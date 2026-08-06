import { Hero } from "@/components/landing/Hero";
import { StatsStrip } from "@/components/landing/StatsStrip";
import { FeaturedPrograms } from "@/components/landing/FeaturedPrograms";
import { CategoryGrid } from "@/components/landing/CategoryGrid";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <FeaturedPrograms />
      <CategoryGrid />
    </>
  );
}
