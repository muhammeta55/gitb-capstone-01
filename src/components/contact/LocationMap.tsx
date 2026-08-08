import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

export function LocationMap() {
  const t = useTranslations("contactPage.info");

  return (
    <div
      role="img"
      aria-label={t("addressLabel")}
      className="relative h-64 w-full overflow-hidden rounded-lg border border-border bg-surface"
    >
      <svg
        className="absolute inset-0 h-full w-full text-border"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="map-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#map-grid)" />
        <path
          d="M0,120 L700,90"
          stroke="currentColor"
          strokeWidth="6"
          opacity="0.4"
        />
        <path
          d="M180,0 L220,260"
          stroke="currentColor"
          strokeWidth="6"
          opacity="0.4"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-background shadow-lg">
          <MapPin className="h-6 w-6" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}
