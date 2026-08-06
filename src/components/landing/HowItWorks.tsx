import { useTranslations } from "next-intl";

const STEP_KEYS = ["apply", "meetAdvisor", "learn", "graduate"] as const;

export function HowItWorks() {
  const t = useTranslations("landing.howItWorks");

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-heading text-2xl font-semibold text-text sm:text-3xl">
          {t("title")}
        </h2>
        <ol className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEP_KEYS.map((key, index) => (
            <li key={key} className="relative flex flex-col gap-2">
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute left-[-50%] top-5 hidden h-px w-full bg-border lg:block"
                />
              )}
              <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary font-heading text-lg font-semibold text-background">
                {index + 1}
              </span>
              <h3 className="font-semibold text-text">{t(`${key}.title`)}</h3>
              <p className="text-sm text-muted">{t(`${key}.description`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
