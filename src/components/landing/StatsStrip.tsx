"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { animate, useInView, useReducedMotion } from "framer-motion";

type StatKind = "plus" | "percent";

interface StatConfig {
  key: "graduates" | "employmentRate" | "partners";
  target: number;
  kind: StatKind;
}

const STATS: StatConfig[] = [
  { key: "graduates", target: 3200, kind: "plus" },
  { key: "employmentRate", target: 91, kind: "percent" },
  { key: "partners", target: 140, kind: "plus" },
];

function formatStat(value: number, kind: StatKind, locale: string) {
  const localized = new Intl.NumberFormat(locale).format(Math.round(value));
  if (kind === "percent") {
    return locale === "tr" ? `%${localized}` : `${localized}%`;
  }
  return `${localized}+`;
}

function AnimatedStat({
  config,
  label,
}: {
  config: StatConfig;
  label: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const locale = useLocale();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, config.target, {
      duration: prefersReducedMotion ? 0 : 1.5,
      ease: "easeOut",
      onUpdate: (latest) => setValue(latest),
    });

    return () => controls.stop();
  }, [isInView, prefersReducedMotion, config.target]);

  return (
    <div className="text-center sm:text-left">
      <p ref={ref} className="font-heading text-3xl font-semibold text-primary">
        {formatStat(value, config.kind, locale)}
      </p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}

export function StatsStrip() {
  const t = useTranslations("landing.stats");

  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-3">
        {STATS.map((stat) => (
          <AnimatedStat key={stat.key} config={stat} label={t(stat.key)} />
        ))}
      </div>
    </section>
  );
}
