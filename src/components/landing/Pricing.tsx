import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { pricingPlans } from "@/data/pricingPlans";

export function Pricing() {
  const t = useTranslations("landing.pricing");

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="font-heading text-2xl font-semibold text-text sm:text-3xl">
        {t("title")}
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.id}
            className={
              plan.highlighted
                ? "relative border-primary shadow-lg lg:-translate-y-2"
                : "relative"
            }
          >
            {plan.highlighted && (
              <Badge variant="primary" className="absolute -top-3 left-4">
                {t("mostPopular")}
              </Badge>
            )}
            <h3 className="font-semibold text-text">{plan.name}</h3>
            <p className="mt-1 text-sm text-muted">{plan.description}</p>
            <p className="mt-4 font-heading text-3xl font-semibold text-text">
              {plan.priceEUR !== null ? (
                <>
                  €{plan.priceEUR}
                  <span className="text-base font-normal text-muted">
                    /{plan.period === "month" ? t("perMonth") : t("perYear")}
                  </span>
                </>
              ) : (
                t("customPricing")
              )}
            </p>
            <ul className="mt-4 space-y-2">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-text"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-6 block rounded-md bg-primary px-4 py-2 text-center font-medium text-background hover:opacity-90"
            >
              {t("cta")}
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
