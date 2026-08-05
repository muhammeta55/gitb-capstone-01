import Image from "next/image";
import Link from "next/link";
import { Bootcamp, Level } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const levelVariant: Record<Level, "success" | "warning" | "error"> = {
  beginner: "success",
  intermediate: "warning",
  advanced: "error",
};

const levelLabel: Record<Level, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

interface BootcampCardProps {
  bootcamp: Bootcamp;
}

export function BootcampCard({ bootcamp }: BootcampCardProps) {
  return (
    <Link href={`/bootcamps/${bootcamp.slug}`} className="block group">
      <Card className="overflow-hidden p-0 transition-shadow hover:shadow-lg">
        <div className="relative h-40 w-full">
          <Image
            src={bootcamp.heroImage}
            alt={bootcamp.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant={levelVariant[bootcamp.level]}>
              {levelLabel[bootcamp.level]}
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
            <span>{bootcamp.durationWeeks} weeks</span>
            <span className="font-semibold">€{bootcamp.priceEUR}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}