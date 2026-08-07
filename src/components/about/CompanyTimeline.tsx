import { useTranslations } from "next-intl";

const MILESTONE_KEYS = [
  "founded",
  "firstCohort",
  "expansion",
  "today",
] as const;

export function CompanyTimeline() {
  const t = useTranslations("about.timeline");

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <h2 className="font-heading text-2xl font-semibold text-text sm:text-3xl">
        {t("title")}
      </h2>
      <ol className="mt-10 space-y-8 border-l border-border pl-6">
        {MILESTONE_KEYS.map((key) => (
          <li key={key} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-primary"
            />
            <p className="font-heading text-sm font-semibold text-primary">
              {t(`${key}.year`)}
            </p>
            <h3 className="mt-1 font-semibold text-text">
              {t(`${key}.title`)}
            </h3>
            <p className="mt-1 text-sm text-muted">{t(`${key}.description`)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
