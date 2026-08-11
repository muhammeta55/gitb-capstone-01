import { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { bootcamps } from "@/data/bootcamps";
import { categories } from "@/data/categories";
import { BootcampsBrowser } from "@/components/bootcamps/BootcampsBrowser";
import { BootcampsGridSkeleton } from "@/components/bootcamps/BootcampGridSkeleton";

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

function HeroSlideshow() {
  const images = getSlideshowImages();
  const n = images.length;
  if (n === 0) return null;

  const slot = 100 / n;
  const fade = slot * 0.15;
  // ~3s per image dwell time — with 12 images that's a 36s full loop,
  // long enough not to feel frantic, short enough to stay lively.
  const totalDuration = n * 3;

  return (
    <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
      <style>{`
        ${images
          .map((_, i) => {
            const start = i * slot;
            const end = (i + 1) * slot;
            return `
              @keyframes heroSlide${i} {
                0%, ${start}% { opacity: 0; }
                ${start + fade}%, ${end - fade}% { opacity: 1; }
                ${end}%, 100% { opacity: 0; }
              }
            `;
          })
          .join("\n")}
      `}</style>
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: 0,
            animation: `heroSlide${i} ${totalDuration}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function BootcampsPage() {
  const t = useTranslations("bootcampsPage");

  return (
    <>
      <section className="relative overflow-hidden bg-background">
        <HeroSlideshow />

        {/* darkens the photos for text legibility — intentionally fixed,
            same pattern as the Landing Hero's photo overlay */}
        <div aria-hidden className="absolute inset-0 z-10 bg-black/55" />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent to-background"
        />

        <div className="relative z-20 max-w-4xl mx-auto px-4 pt-24 pb-32 text-center">
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