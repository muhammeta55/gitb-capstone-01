import { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { cohorts } from "@/data/cohorts";
import { bootcamps } from "@/data/bootcamps";
import { CohortCountdown } from "@/components/schedule/CohortCountdown";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta.schedule");
  return {
    title: t("title"),
    description: t("description"),
  };
}

function groupByMonth(locale: string) {
  const enriched = cohorts
    .map((cohort) => {
      const bootcamp = bootcamps.find((b) => b.slug === cohort.bootcampSlug);
      if (!bootcamp) {
        console.warn(
          `Cohort "${cohort.id}" references missing bootcamp slug "${cohort.bootcampSlug}" — skipping.`
        );
        return null;
      }
      return { cohort, bootcamp };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort(
      (a, b) =>
        new Date(a.cohort.startDate).getTime() - new Date(b.cohort.startDate).getTime()
    );

  const groups = new Map<string, typeof enriched>();

  for (const item of enriched) {
    const date = new Date(item.cohort.startDate);
    const monthLabel = date.toLocaleDateString(locale, {
      month: "long",
      year: "numeric",
    });

    if (!groups.has(monthLabel)) {
      groups.set(monthLabel, []);
    }
    groups.get(monthLabel)!.push(item);
  }

  return groups;
}

export default async function SchedulePage() {
  const t = await getTranslations("schedulePage");
  const locale = await getLocale();
  const groups = groupByMonth(locale);

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted mt-2">{t("subtitle")}</p>
      </div>

      <div className="space-y-10">
        {Array.from(groups.entries()).map(([month, items]) => (
          <section key={month}>
            <h2 className="mb-4 text-lg font-semibold capitalize">{month}</h2>
            <div className="space-y-3">
              {items.map(({ cohort, bootcamp }) => (
                <div
                  key={cohort.id}
                  className="flex flex-col gap-3 rounded-lg border border-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">{bootcamp.title}</p>
                    <p className="text-sm text-muted">
                      {new Date(cohort.startDate).toLocaleDateString(locale, {
                        day: "numeric",
                        month: "short",
                      })}
                      {" · "}
                      {t("seatsLeft", { count: cohort.seatsLeft })}
                      {" · "}
                      {cohort.format}
                    </p>
                  </div>
                  <CohortCountdown startDate={cohort.startDate} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}