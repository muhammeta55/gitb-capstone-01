"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Newsletter() {
  const t = useTranslations("landing.newsletter");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!EMAIL_REGEX.test(email)) {
      setError(t("invalidEmail"));
      return;
    }

    setError(null);
    setSubmitted(true);
  }

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h2 className="font-heading text-2xl font-semibold text-text sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-2 text-muted">{t("subtitle")}</p>

        {submitted ? (
          <p className="mt-6 font-medium text-success">{t("success")}</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-center"
          >
            <div className="w-full sm:w-80">
              <Input
                id="newsletter-email"
                type="email"
                label={t("emailLabel")}
                placeholder={t("emailPlaceholder")}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (error) setError(null);
                }}
                error={error ?? undefined}
              />
            </div>
            <Button type="submit" className="h-10 w-full shrink-0 sm:w-auto">
              {t("submit")}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
