"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5v-1.75c-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.11-1.52-1.11-1.52-.9-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.9-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .28.18.61.69.5A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"/>
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.11 20.45H3.56V9h3.55v11.45Z"/>
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.24 3H21l-6.55 7.49L22.2 21h-6.22l-4.87-6.37L5.5 21H2.72l7.01-8.01L2 3h6.37l4.4 5.82L18.24 3Zm-1.09 16.17h1.53L7.02 4.74H5.38l11.77 14.43Z"/>
    </svg>
  );
}

const socialLinks = [
  { href: "https://github.com", label: "GitHub", Icon: GithubIcon },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: LinkedinIcon },
  { href: "https://twitter.com", label: "Twitter", Icon: TwitterIcon },
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
        { href: "/login", label: t("login") },
        { href: "/register", label: t("register") },
        { href: "/dashboard", label: t("dashboard") },
      ],
    },
  ];

  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row md:justify-between gap-10">
        {/* Brand block */}
        <div className="max-w-xs">
          <p className="font-heading text-lg text-text mb-2">{t("brandName")}</p>
          <p className="text-sm text-muted mb-4">{t("tagline")}</p>
          <div className="flex gap-4">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns, grouped and pushed right */}
        <div className="flex flex-wrap gap-x-16 gap-y-8">
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
      </div>

      <div className="max-w-6xl mx-auto px-4 py-4 border-t border-border">
        <p className="text-sm text-muted text-center md:text-left">
          © {new Date().getFullYear()} {t("brandName")}. {t("copyright")}
        </p>
      </div>
    </footer>
  );
}