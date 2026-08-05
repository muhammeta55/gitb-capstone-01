import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Bootcamp, Level } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const levelVariant: Record<Level, "success" | "warning" | "error"> = {
  beginner: "success",
  intermediate: "warning",
  advanced: "error",
};

interface BootcampCardProps {
  bootcamp: Bootcamp;
}

export function BootcampCard({ bootcamp }: BootcampCardProps) {
  const t = useTranslations("bootcampCard");

  return (
    <Link href={`/bootcamps/${bootcamp.slug}`} className="block group">
      <Card className="overflow-hidden p-0 transition-shadow hover:shadow-lg">
        <div className="relative h-48 w-full">
          <Image
            src={bootcamp.heroImage}
            alt={bootcamp.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant={levelVariant[bootcamp.level]}>
              {t(`level.${bootcamp.level}`)}
            </Badge>
            <Badge variant="muted">{bootcamp.format}</Badge>
          </div>
          <h3 className="font-semibold text-lg group-hover:underline">
            {bootcamp.title}
          </h3>
          <p className="text-sm text-muted line-clamp-2">
            {bootcamp.shortDescription}
          </p>
          <div className="flex items-center justify-between pt-2 text-sm">
            <span>{bootcamp.durationWeeks} {t("weeks")}</span>
            <span className="font-semibold">€{bootcamp.priceEUR}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}