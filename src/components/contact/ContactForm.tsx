"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 20;

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const t = useTranslations("contactPage.form");
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function validate(current: FormValues): FormErrors {
    const nextErrors: FormErrors = {};

    if (!current.name.trim()) nextErrors.name = t("errors.required");
    if (!current.email.trim()) {
      nextErrors.email = t("errors.required");
    } else if (!EMAIL_REGEX.test(current.email)) {
      nextErrors.email = t("errors.invalidEmail");
    }
    if (!current.subject.trim()) nextErrors.subject = t("errors.required");
    if (!current.message.trim()) {
      nextErrors.message = t("errors.required");
    } else if (current.message.trim().length < MIN_MESSAGE_LENGTH) {
      nextErrors.message = t("errors.messageTooShort", {
        count: MIN_MESSAGE_LENGTH,
      });
    }

    return nextErrors;
  }

  function handleChange(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus("loading");

    setTimeout(() => {
      // Mock error trigger for testing: submit with subject "test-error"
      // to simulate a failed server response.
      if (values.subject.trim().toLowerCase() === "test-error") {
        setStatus("error");
        return;
      }
      setStatus("success");
    }, 1000);
  }

  if (status === "success") {
    return (
      <div className="rounded-md border border-success bg-success/10 p-6 text-center">
        <p className="font-medium text-text">{t("successTitle")}</p>
        <p className="mt-1 text-sm text-muted">{t("successDescription")}</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-md border border-error bg-error/10 p-6 text-center" role="alert">
        <p className="font-medium text-text">{t("errorTitle")}</p>
        <p className="mt-1 text-sm text-muted">{t("errorDescription")}</p>
        <Button type="button" onClick={() => setStatus("idle")} className="mt-4">
          {t("tryAgain")}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <Input
        id="contact-name"
        label={t("nameLabel")}
        value={values.name}
        onChange={(event) => handleChange("name", event.target.value)}
        error={errors.name}
      />
      <Input
        id="contact-email"
        type="email"
        label={t("emailLabel")}
        value={values.email}
        onChange={(event) => handleChange("email", event.target.value)}
        error={errors.email}
      />
      <Input
        id="contact-subject"
        label={t("subjectLabel")}
        value={values.subject}
        onChange={(event) => handleChange("subject", event.target.value)}
        error={errors.subject}
      />
      <Textarea
        id="contact-message"
        label={t("messageLabel")}
        value={values.message}
        onChange={(event) => handleChange("message", event.target.value)}
        error={errors.message}
        rows={5}
      />
      <Button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2"
      >
        {status === "loading" && (
          <Spinner
            size="sm"
            className="border-background/40 border-t-background"
          />
        )}
        {status === "loading" ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}