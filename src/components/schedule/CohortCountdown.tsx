"use client";

import { useTranslations } from "next-intl";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  startDate: string;
}

export function CohortCountdown({ startDate }: Props) {
  const t = useTranslations("schedulePage");
  const { ready, hasStarted, days, hours, minutes, seconds } = useCountdown(startDate);

  if (!ready) {
    // Sunucu ve istemcinin ilk render'da eşleşmesi için sabit placeholder
    return (
      <div className="flex items-center gap-2 font-mono text-sm opacity-0" aria-hidden="true">
        <TimeUnit value={0} label={t("days")} />
        <span>:</span>
        <TimeUnit value={0} label={t("hours")} />
        <span>:</span>
        <TimeUnit value={0} label={t("minutes")} />
        <span>:</span>
        <TimeUnit value={0} label={t("seconds")} />
      </div>
    );
  }

  if (hasStarted) {
    return (
      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
        {t("started")}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2 font-mono text-sm" aria-live="polite">
      <TimeUnit value={days} label={t("days")} />
      <span className="text-muted">:</span>
      <TimeUnit value={hours} label={t("hours")} />
      <span className="text-muted">:</span>
      <TimeUnit value={minutes} label={t("minutes")} />
      <span className="text-muted">:</span>
      <TimeUnit value={seconds} label={t("seconds")} />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-lg font-semibold">{String(value).padStart(2, "0")}</span>
      <span className="text-[10px] uppercase text-muted">{label}</span>
    </div>
  );
}