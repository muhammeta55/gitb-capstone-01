import {
  Code,
  BarChart,
  Palette,
  Cloud,
  Shield,
  Smartphone,
  Megaphone,
  Kanban,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { categories } from "@/data/categories";

// Maps the kebab-case icon keys in src/data/categories.ts to the matching
// lucide-react components.
const categoryIcons: Record<string, LucideIcon> = {
  code: Code,
  "bar-chart": BarChart,
  palette: Palette,
  cloud: Cloud,
  shield: Shield,
  smartphone: Smartphone,
  megaphone: Megaphone,
  // categories.ts uses "trello" as the icon key, but the Trello icon was
  // removed from this lucide-react version — Kanban is the closest match
  // for a project-management category and needs no data-file change.
  trello: Kanban,
};

export function CategoryGrid() {
  const t = useTranslations("landing.categories");

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="font-heading text-2xl font-semibold text-text sm:text-3xl">
        {t("title")}
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
        {categories.map((category) => {
          const Icon = categoryIcons[category.icon];
          return (
            <Link key={category.slug} href="/bootcamps" className="group">
              <Card className="flex flex-col items-center gap-3 text-center transition-shadow group-hover:shadow-md">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {Icon ? (
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  ) : null}
                </span>
                <span className="font-medium text-text">{category.name}</span>
                <span className="text-sm text-muted">
                  {t("courseCount", { count: category.courseCount })}
                </span>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
