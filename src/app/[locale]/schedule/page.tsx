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
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
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

// --- tiny inline icons so no new dependency is required ---
function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function DurationIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2h12M6 22h12M6 2c0 5 4 6 6 8-2 2-6 3-6 8m12-16c0 5-4 6-6 8 2 2 6 3 6 8" />
    </svg>
  );
}

export default async function SchedulePage() {
  const t = await getTranslations("schedulePage");
  const locale = await getLocale();
  const groups = groupByMonth(locale);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* subtle ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_1px_1px,theme(colors.slate.200)_1px,transparent_0)] [background-size:28px_28px] opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">
            {t("eyebrow")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-text">
            {t("title")}
          </h1>
          <p className="mt-3 text-muted max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="space-y-14">
          {Array.from(groups.entries()).map(([month, items]) => (
            <section key={month}>
              <div className="flex items-center gap-4 mb-5">
                <h2 className="text-sm font-semibold text-muted tracking-wide capitalize whitespace-nowrap">
                  {month}
                </h2>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map(({ cohort, bootcamp }) => {
                  const closed = cohort.seatsLeft <= 0;
                  const lowSeats = !closed && cohort.seatsLeft <= 15;

                  return (
                    <div
                      key={cohort.id}
                      className="group relative flex flex-col rounded-2xl border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-text leading-snug">
                          {bootcamp.title}
                        </h3>
                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ring-inset ${
                            closed
                              ? "bg-muted/10 text-muted ring-border"
                              : lowSeats
                              ? "bg-warning/10 text-warning ring-warning/30"
                              : "bg-success/10 text-success ring-success/30"
                          }`}
                        >
                          {closed
                            ? t("statusClosed")
                            : t("seatsLeft", { count: cohort.seatsLeft })}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm text-muted mt-3 mb-4">
                        <div className="flex items-center gap-2">
                          <CalendarIcon />
                          <span>
                            {t("starts")}:{" "}
                            {new Date(cohort.startDate).toLocaleDateString(locale, {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ClockIcon />
                          <span>
                            {t("ends")}:{" "}
                            {new Date(cohort.endDate).toLocaleDateString(locale, {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DurationIcon />
                          <span>{t("weeksCount", { count: bootcamp.durationWeeks })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UsersIcon />
                          <span className="capitalize">{cohort.format}</span>
                        </div>
                      </div>

                      {/* Countdown — same placement/behavior as the original page */}
                      <div className="mb-4">
                        <CohortCountdown
                          startDate={cohort.startDate}
                          labels={{
                            started: t("started"),
                            startsInPrefix: t("startsInPrefix"),
                            startsInSuffix: t("startsInSuffix"),
                            daysUnit: t("daysUnit"),
                            hoursUnit: t("hoursUnit"),
                            minutesUnit: t("minutesUnit"),
                            secondsUnit: t("secondsUnit"),
                          }}
                        />
                      </div>

                      <button
                        type="button"
                        className="mt-auto w-full rounded-lg border border-border py-2.5 text-sm font-medium text-text transition-colors group-hover:border-primary group-hover:bg-primary/10 group-hover:text-primary"
                      >
                        {t("viewDetails")}
                      </button>

                      {!closed ? null : (
                        <p className="mt-2 text-center text-[11px] text-muted">
                          {t("appliesWhenActive")}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}