"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export default function BootcampDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errorState");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-24 text-center">
      <h2 className="text-xl font-semibold">{t("title")}</h2>
      <p className="mt-2 text-muted">{t("description")}</p>
      <Button className="mt-6" onClick={reset}>
        {t("retry")}
      </Button>
    </main>
  );
}