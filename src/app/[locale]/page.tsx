import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
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
import { ScrollReveal } from "@/components/layout/ScrollReveal";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta.home");
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
    }
  };
}

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <FeaturedPrograms />
      <CategoryGrid />
      <ScrollReveal>
        <Features />
      </ScrollReveal>
      <ScrollReveal>
        <HowItWorks />
      </ScrollReveal>
      <ScrollReveal>
        <Instructors />
      </ScrollReveal>
      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>
      <Pricing />
      <Newsletter />
      <ClosingCTA />
    </>
  );
}
