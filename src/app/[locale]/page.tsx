import { Hero } from "@/components/landing/Hero";
import { StatsStrip } from "@/components/landing/StatsStrip";
import { FeaturedPrograms } from "@/components/landing/FeaturedPrograms";
import { CategoryGrid } from "@/components/landing/CategoryGrid";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Instructors } from "@/components/landing/Instructors";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { Newsletter } from "@/components/landing/Newsletter";
import { ClosingCTA } from "@/components/landing/ClosingCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <FeaturedPrograms />
      <CategoryGrid />
      <Features />
      <HowItWorks />
      <Instructors />
      <Testimonials />
      <Pricing />
      <Newsletter />
      <ClosingCTA />
    </>
  );
}