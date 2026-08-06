import Image from "next/image";
import { useTranslations } from "next-intl";
import { instructors } from "@/data/instructors";
import { Card } from "@/components/ui/Card";

export function Instructors() {
  const t = useTranslations("landing.instructors");
  const featured = instructors.slice(0, 4);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="font-heading text-2xl font-semibold text-text sm:text-3xl">
        {t("title")}
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((instructor) => (
          <Card key={instructor.slug} className="space-y-3 text-center">
            <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full">
              <Image
                src={instructor.avatar}
                alt={instructor.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-text">{instructor.name}</h3>
              <p className="text-sm text-muted">{instructor.title}</p>
              <p className="text-xs text-muted">{instructor.company}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
