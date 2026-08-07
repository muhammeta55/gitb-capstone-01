import { Mission } from "@/components/about/Mission";
import { TeamGrid } from "@/components/about/TeamGrid";
import { CompanyTimeline } from "@/components/about/CompanyTimeline";
import { PartnerLogos } from "@/components/about/PartnerLogos";

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
