import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { HeroBackground } from "./HeroBackground";

const ctaBase =
  "inline-flex items-center justify-center rounded-md font-sans font-medium text-lg px-6 py-3 transition-opacity";
const ctaPrimary = `${ctaBase} bg-primary text-background hover:opacity-90`;
const ctaGhost = `${ctaBase} border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20`;

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop&q=80",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=1080&fit=crop&q=80",
  "https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?w=1920&h=1080&fit=crop&q=80",
];

export function Hero() {
  const t = useTranslations("landing.hero");

  return (
    <section className="relative overflow-hidden border-b border-border">
      <HeroBackground images={HERO_IMAGES} />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-24 sm:py-32">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          {t("badge")}
        </div>

        <h1 className="max-w-2xl font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          <span className="text-white">{t("titlePrefix")} </span>
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t("titleHighlight")}
          </span>
        </h1>
        <p className="max-w-xl text-lg text-white/80">{t("subtitle")}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/bootcamps" className={ctaPrimary}>
            {t("ctaPrimary")}
          </Link>
          <Link href="/contact" className={ctaGhost}>
            {t("ctaSecondary")}
          </Link>
        </div>
      </div>
    </section>
  );
}
