"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const socialLinks = [
  { href: "https://linkedin.com", label: "LinkedIn", icon: "in" },
  { href: "https://github.com", label: "GitHub", icon: "gh" },
  { href: "https://twitter.com", label: "Twitter", icon: "tw" },
];

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const footerColumns = [
    {
      title: t("columnBootcamps"),
      links: [
        { href: "/bootcamps", label: t("allBootcamps") },
        { href: "/schedule", label: tNav("schedule") },
      ],
    },
    {
      title: t("columnCompany"),
      links: [
        { href: "/about", label: tNav("about") },
        { href: "/contact", label: tNav("contact") },
      ],
    },
    {
      title: t("columnAccount"),
      links: [
        { href: "/auth/login", label: t("login") },
        { href: "/auth/register", label: t("register") },
      ],
    },
  ];

  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <p className="font-heading text-lg text-text mb-2">{t("brandName")}</p>
          <p className="text-sm text-muted">{t("tagline")}</p>
        </div>

        {footerColumns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-medium text-text mb-3">{col.title}</p>
            <ul className="flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 py-4 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {t("brandName")}. {t("copyright")}
        </p>
        <div className="flex gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="text-sm text-muted hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}