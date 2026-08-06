import { useTranslations } from "next-intl";
import { bootcamps } from "@/data/bootcamps";
import { BootcampCard } from "@/components/bootcamps/BootcampCard";

export function FeaturedPrograms() {
  const t = useTranslations("landing.featured");
  const featured = bootcamps.filter((bootcamp) => bootcamp.featured);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="font-heading text-2xl font-semibold text-text sm:text-3xl">
        {t("title")}
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((bootcamp) => (
          <BootcampCard key={bootcamp.slug} bootcamp={bootcamp} />
        ))}
      </div>
    </section>
  );
}
