"use client";

import { useState, FormEvent, useMemo } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Link } from "@/i18n/navigation";

type StrengthLevel = "weak" | "medium" | "strong";

function getPasswordStrength(password: string): StrengthLevel | null {
  if (!password) return null;

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialOrUpper = /[A-Z]/.test(password) || /[^a-zA-Z0-9]/.test(password);

  if (password.length < 6) return "weak";
  if (password.length >= 8 && hasLetter && hasNumber && hasSpecialOrUpper) return "strong";
  if (password.length >= 6 && hasLetter && hasNumber) return "medium";
  return "weak";
}

const strengthConfig: Record<StrengthLevel, { widthClass: string; colorClass: string }> = {
  weak: { widthClass: "w-1/3", colorClass: "bg-error" },
  medium: { widthClass: "w-2/3", colorClass: "bg-warning" },
  strong: { widthClass: "w-full", colorClass: "bg-success" },
};

export function RegisterForm() {
  const t = useTranslations("registerPage");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
    form?: string;
  }>({});

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  function validate(): boolean {
    const newErrors: typeof errors = {};

    if (!name.trim()) newErrors.name = t("errors.nameRequired");
    if (!email.trim()) newErrors.email = t("errors.emailRequired");
    if (!password.trim()) newErrors.password = t("errors.passwordRequired");
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = t("errors.confirmPasswordRequired");
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = t("errors.passwordMismatch");
    }
    if (!agreedToTerms) newErrors.terms = t("errors.termsRequired");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSuccessMessage("");

    if (!validate()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === "test@test.com") {
      setErrors({ form: t("errors.emailTaken") });
      setIsLoading(false);
      return;
    }

    setSuccessMessage(t("success"));
    setErrors({});
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
            id="name"
            type="text"
            label={t("name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            autoComplete="name"
          />

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
              autoComplete="new-password"
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

            {strength && (
              <div className="mt-2 space-y-1">
                <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${strengthConfig[strength].widthClass} ${strengthConfig[strength].colorClass}`}
                  />
                </div>
                <span className="text-xs text-muted">
                  {t(`strength.${strength}`)}
                </span>
              </div>
            )}
          </div>

          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              label={t("confirmPassword")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-muted"
              aria-label={showConfirmPassword ? t("hidePassword") : t("showPassword")}
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <div>
            <Checkbox
              id="terms"
              label={t("agreeToTerms")}
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
            {errors.terms && (
              <span className="text-sm text-error mt-1 block">{errors.terms}</span>
            )}
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
          {t("hasAccount")}{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            {t("signInLink")}
          </Link>
        </p>
      </Card>
    </main>
  );
}