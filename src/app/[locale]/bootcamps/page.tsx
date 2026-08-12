import { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { bootcamps } from "@/data/bootcamps";
import { categories } from "@/data/categories";
import { BootcampsBrowser } from "@/components/bootcamps/BootcampsBrowser";
import { BootcampsGridSkeleton } from "@/components/bootcamps/BootcampGridSkeleton";
import { HeroBackground } from "@/components/landing/HeroBackground";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta.bootcamps");
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
  };
}

// All distinct hero images from the bootcamps data — no cap, no new assets.
function getSlideshowImages() {
  const seen = new Set<string>();
  const images: string[] = [];
  for (const b of bootcamps) {
    if (b.heroImage && !seen.has(b.heroImage)) {
      seen.add(b.heroImage);
      images.push(b.heroImage);
    }
  }
  return images;
}

export default function BootcampsPage() {
  const t = useTranslations("bootcampsPage");
  const heroImages = getSlideshowImages();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <HeroBackground images={heroImages} />
        {/* darkens the photos for text legibility — intentionally fixed,
            same peak opacity as the Landing Hero's photo overlay */}
        <div aria-hidden="true" className="absolute inset-0 bg-black/60" />

        <div className="relative mx-auto max-w-4xl px-4 py-24 sm:py-32 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            {t("title")}
          </h1>
          <p className="mt-4 text-white/80 max-w-xl mx-auto">
            {t("subtitle", { count: bootcamps.length })}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pt-10 pb-10">
        <Suspense fallback={<BootcampsGridSkeleton />}>
          <BootcampsBrowser bootcamps={bootcamps} categories={categories} />
        </Suspense>
      </div>
    </>
  );
}