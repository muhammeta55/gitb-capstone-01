import { useTranslations } from "next-intl";

// Fictional partner names (not real companies) rendered as plain
// wordmarks — this is mock data for a demo project, and we don't have
// real logo assets or an actual partnership with any named company.
const PARTNER_NAMES = [
  "Nordwind Technologies",
  "Vertex Analytics",
  "BrightPath Systems",
  "Solstice Labs",
  "Meridian Software",
  "Cascade Digital",
] as const;

export function PartnerLogos() {
  const t = useTranslations("about.partners");

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center font-heading text-2xl font-semibold text-text sm:text-3xl">
          {t("title")}
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {PARTNER_NAMES.map((name) => (
            <div
              key={name}
              className="flex h-16 items-center justify-center rounded-md border border-border px-3 text-center font-heading text-sm font-medium text-muted grayscale transition-all hover:grayscale-0 hover:text-text"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
