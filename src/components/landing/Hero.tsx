import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// NOTE: Button (src/components/ui/Button.tsx) only renders a native
// <button>. These CTAs need to navigate, so they're built with next-intl's
// Link instead, styled to match Button's "primary"/"ghost" look by hand.
// TODO: replace with <Button href="..."> once Button supports a link
// variant (flagged to Muhammet, see team report).
const ctaBase =
  "inline-flex items-center justify-center rounded-md font-sans font-medium text-lg px-6 py-3 transition-opacity";
const ctaPrimary = `${ctaBase} bg-primary text-background hover:opacity-90`;
const ctaGhost = `${ctaBase} bg-transparent text-text border border-border hover:bg-surface`;

export function Hero() {
  const t = useTranslations("landing.hero");

  return (
    <section className="relative overflow-hidden border-b border-border bg-surface">
      {/*
        Signature background: a quiet code-glyph pattern + two soft color
        blobs, instead of a stock photo. Grounds the hero in "code" without
        relying on a generic developer-typing-on-laptop image.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.07] text-text"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="code-glyphs"
              x="0"
              y="0"
              width="140"
              height="90"
              patternUnits="userSpaceOnUse"
            >
              <text
                x="0"
                y="34"
                fontFamily="var(--font-mono), monospace"
                fontSize="22"
                fill="currentColor"
              >
                {"</>"}
              </text>
              <text
                x="70"
                y="78"
                fontFamily="var(--font-mono), monospace"
                fontSize="22"
                fill="currentColor"
              >
                {"{ }"}
              </text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#code-glyphs)" />
        </svg>
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-24 sm:py-32">
        <h1 className="max-w-2xl font-heading text-3xl font-semibold leading-tight tracking-tight text-text sm:text-4xl md:text-5xl">
          {t("title")}
        </h1>
        <p className="max-w-xl text-lg text-muted">{t("subtitle")}</p>
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
