import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function ClosingCTA() {
  const t = useTranslations("landing.closingCta");

  return (
    <section className="bg-primary">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-16 text-center">
        <h2 className="font-heading text-2xl font-semibold text-background sm:text-3xl">
          {t("title")}
        </h2>
        <p className="max-w-xl text-background/80">{t("subtitle")}</p>
        <Link
          href="/bootcamps"
          className="mt-2 rounded-md bg-background px-6 py-3 font-medium text-primary hover:opacity-90"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
