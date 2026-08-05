import { useTranslations } from "next-intl";

export function StatsStrip() {
  const t = useTranslations("landing.stats");

  const stats = [
    { value: t("graduatesValue"), label: t("graduates") },
    { value: t("employmentRateValue"), label: t("employmentRate") },
    { value: t("partnersValue"), label: t("partners") },
  ];

  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center sm:text-left">
            <p className="font-heading text-3xl font-semibold text-primary">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
