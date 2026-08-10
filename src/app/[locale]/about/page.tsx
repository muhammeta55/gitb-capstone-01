import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Mission } from "@/components/about/Mission";
import { TeamGrid } from "@/components/about/TeamGrid";
import { CompanyTimeline } from "@/components/about/CompanyTimeline";
import { PartnerLogos } from "@/components/about/PartnerLogos";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta.about");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function AboutPage() {
  return (
    <main>
      <Mission />
      <TeamGrid />
      <CompanyTimeline />
      <PartnerLogos />
    </main>
  );
}