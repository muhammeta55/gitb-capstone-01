import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { LocationMap } from "@/components/contact/LocationMap";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta.contact");
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function ContactPage() {
  const t = await getTranslations("contactPage");

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-10 text-center">
        <h1 className="font-heading text-3xl font-semibold text-text sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 text-muted">{t("subtitle")}</p>
      </div>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ContactForm />
        <div className="space-y-8">
          <ContactInfo />
          <LocationMap />
        </div>
      </div>
    </main>
  );
}