import { Home, Compass, Calendar } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default async function NotFound() {
  const t = await getTranslations("notFoundPage");

  const popularLinks = [
    { href: "/bootcamps", label: t("links.bootcamps"), icon: Compass },
    { href: "/schedule", label: t("links.schedule"), icon: Calendar },
    { href: "/", label: t("links.home"), icon: Home },
  ];

  return (
    <main className="max-w-xl mx-auto px-4 py-24 text-center">
      <Card className="space-y-6 p-8">
        <div>
          <p className="text-6xl font-bold text-primary">404</p>
          <h1 className="text-2xl font-bold mt-4">{t("title")}</h1>
          <p className="text-muted mt-2">{t("subtitle")}</p>
        </div>

        <Link href="/">
          <Button className="w-full sm:w-auto">{t("backHome")}</Button>
        </Link>

        <div className="pt-6 border-t border-border">
          <p className="text-sm font-medium text-text mb-3">
            {t("popularPages")}
          </p>
          <div className="flex flex-col gap-2">
            {popularLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 justify-center text-sm text-primary hover:underline"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </Card>
    </main>
  );
}