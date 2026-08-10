import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { bootcamps } from "@/data/bootcamps";
import { cohorts } from "@/data/cohorts";
import { getBootcampBySlug, getAllBootcampSlugs } from "@/lib/filterBootcamps";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Level } from "@/types";

const levelVariant: Record<Level, "success" | "warning" | "error"> = {
  beginner: "success",
  intermediate: "warning",
  advanced: "error",
};



interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return getAllBootcampSlugs(bootcamps).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const bootcamp = getBootcampBySlug(bootcamps, slug);

  if (!bootcamp) {
    return {
      title: "Bootcamp Not Found | GITBootcamp",
    };
  }

  return {
    title: `${bootcamp.title} | GITBootcamp`,
    description: bootcamp.shortDescription,
    openGraph: {
      title: `${bootcamp.title} | GITBootcamp`,
      description: bootcamp.shortDescription,
      images: [bootcamp.heroImage],
    },
  };
}

export default async function BootcampDetailPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const bootcamp = getBootcampBySlug(bootcamps, slug);

  if (!bootcamp) {
    notFound();
  }

  const t = await getTranslations("bootcampDetail");

  const upcomingCohort = cohorts
    .filter((c) => c.bootcampSlug === bootcamp.slug)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0];

  const accordionItems = bootcamp.curriculum.map((module) => ({
    title: module.title,
    content: (
      <ul className="list-disc pl-4 space-y-1">
        {module.lessons.map((lesson, i) => (
          <li key={i}>{lesson}</li>
        ))}
      </ul>
    ),
  }));

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant={levelVariant[bootcamp.level]}>{t(`level.${bootcamp.level}`)}</Badge>
          <Badge variant="muted">{t(`format.${bootcamp.format}`)}</Badge>
        </div>
        <h1 className="text-3xl font-bold">{bootcamp.title}</h1>
        <p className="text-muted mt-2">{bootcamp.shortDescription}</p>
      </div>

      <div className="relative h-72 w-full mb-10 rounded-lg overflow-hidden">
        <Image
          src={bootcamp.heroImage}
          alt={bootcamp.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">{t("about")}</h2>
            <p className="text-muted">{bootcamp.description}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t("curriculum")}</h2>
            {accordionItems.length > 0 ? (
              <Accordion items={accordionItems} />
            ) : (
              <p className="text-muted text-sm">{t("curriculumEmpty")}</p>
            )}
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <Card className="space-y-4">
              <div className="text-3xl font-bold">€{bootcamp.priceEUR}</div>
              <div className="text-sm text-muted space-y-1">
                <div>{bootcamp.durationWeeks} {t("weeks")}</div>
                {upcomingCohort && (
                  <>
                    <div>
                      {t("nextCohort")}: {new Date(upcomingCohort.startDate).toLocaleDateString(locale, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div>
                      {t("seatsLeft")}: {upcomingCohort.seatsLeft}/{upcomingCohort.seatsTotal}
                    </div>
                  </>
                )}
              </div>
              <Button className="w-full">{t("enroll")}</Button>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}