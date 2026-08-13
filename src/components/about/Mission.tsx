import { useTranslations } from "next-intl";
import { HeroBackground } from "@/components/landing/HeroBackground";

// Single photo — free to use under the Unsplash License. HeroBackground
// works fine with a one-item array (no rotation, just displays it).
const MISSION_IMAGES = [
  "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1600&q=80",
];

export function Mission() {
  const t = useTranslations("about.mission");

  return (
    <section className="relative overflow-hidden border-b border-border">
      <HeroBackground images={MISSION_IMAGES} />
      <div aria-hidden="true" className="absolute inset-0 bg-black/60" />

      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:py-24">
        <h1 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-white/80">{t("description")}</p>
      </div>
    </section>
  );
}
