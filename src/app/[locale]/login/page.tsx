import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LoginForm } from "@/components/auth/LoginForm";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta.login");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function LoginPage() {
  return <LoginForm />;
}