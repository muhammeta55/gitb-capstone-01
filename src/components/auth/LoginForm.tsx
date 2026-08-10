"use client";

import { useState, FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";

const MOCK_EMAIL = "test@test.com";
const MOCK_PASSWORD = "123456";

export  function LoginForm() {
  const t = useTranslations("loginPage");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [successMessage, setSuccessMessage] = useState("");

  function validate(): boolean {
    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = t("errors.emailRequired");
    if (!password.trim()) newErrors.password = t("errors.passwordRequired");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSuccessMessage("");

    if (!validate()) return;

    setIsLoading(true);

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
      setSuccessMessage(t("success"));
      setErrors({});
    } else {
      setErrors({ form: t("errors.invalidCredentials") });
    }

    setIsLoading(false);
  }

  return (
    <main className="max-w-md mx-auto px-4 py-16">
      <Card className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-muted text-sm mt-1">{t("subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input
            id="email"
            type="email"
            label={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            autoComplete="email"
          />

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              label={t("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-muted"
              aria-label={showPassword ? t("hidePassword") : t("showPassword")}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {errors.form && (
            <p className="text-sm text-error" role="alert">
              {errors.form}
            </p>
          )}

          {successMessage && (
            <p className="text-sm text-success" role="status">
              {successMessage}
            </p>
          )}

          <Button type="submit" isLoading={isLoading} className="w-full">
            {t("submit")}
          </Button>
        </form>

        <p className="text-center text-sm text-muted">
          {t("noAccount")}{" "}
          <Link href="/register" className="text-primary hover:underline font-medium">
            {t("signUpLink")}
          </Link>
        </p>
      </Card>
    </main>
  );
}