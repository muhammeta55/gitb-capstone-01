import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { bootcamps } from "@/data/bootcamps";
import { categories } from "@/data/categories";
import { BootcampsBrowser } from "@/components/bootcamps/BootcampsBrowser";
import { BootcampsGridSkeleton } from "@/components/bootcamps/BootcampGridSkeleton";

export default function BootcampsPage() {
  const t = useTranslations("bootcampsPage");

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted mt-2">
          {t("subtitle", { count: bootcamps.length })}
        </p>
      </div>

      <Suspense fallback={<BootcampsGridSkeleton />}>
        <BootcampsBrowser bootcamps={bootcamps} categories={categories} />
      </Suspense>
    </main>
  );
}