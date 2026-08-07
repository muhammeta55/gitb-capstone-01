import { useTranslations } from "next-intl";

export function Mission() {
  const t = useTranslations("about.mission");

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="font-heading text-3xl font-semibold text-text sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 text-lg text-muted">{t("description")}</p>
    </section>
  );
}
