import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

export function ContactInfo() {
  const t = useTranslations("contactPage.info");

  const items = [
    { icon: Mail, label: t("emailLabel"), value: "hello@gitbootcamp.com" },
    { icon: Phone, label: t("phoneLabel"), value: "+31 20 123 4567" },
    {
      icon: MapPin,
      label: t("addressLabel"),
      value: "Keizersgracht 123, Amsterdam",
    },
    { icon: Clock, label: t("hoursLabel"), value: t("hoursValue") },
  ];

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-xl font-semibold text-text">
        {t("title")}
      </h2>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.label} className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <item.icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm text-muted">{item.label}</p>
              <p className="font-medium text-text">{item.value}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
