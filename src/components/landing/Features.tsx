import {
  Laptop,
  Rocket,
  Users,
  Briefcase,
  Globe,
  Award,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";

const FEATURE_KEYS = [
  "liveClasses",
  "projectBased",
  "smallCohorts",
  "careerSupport",
  "flexibleFormat",
  "certificate",
] as const;

const FEATURE_ICONS: Record<(typeof FEATURE_KEYS)[number], LucideIcon> = {
  liveClasses: Laptop,
  projectBased: Rocket,
  smallCohorts: Users,
  careerSupport: Briefcase,
  flexibleFormat: Globe,
  certificate: Award,
};

export function Features() {
  const t = useTranslations("landing.features");

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="font-heading text-2xl font-semibold text-text sm:text-3xl">
        {t("title")}
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURE_KEYS.map((key) => {
          const Icon = FEATURE_ICONS[key];
          return (
            <Card key={key} className="space-y-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="font-semibold text-text">{t(`${key}.title`)}</h3>
              <p className="text-sm text-muted">{t(`${key}.description`)}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
