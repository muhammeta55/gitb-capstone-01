import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

// Generic "branch & merge" glyph — not any specific platform's logo,
// just a widely-used version-control motif that fits "GIT"Bootcamp.
function GitMark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="12" r="2.5" />
      <path d="M6 8.5V15.5" />
      <path d="M8.3 7.2C12 9 14 10 15.7 10.7" />
      <path d="M8.3 16.8C12 15 14 14 15.7 13.3" />
    </svg>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/bootcamps", label: t("bootcamps") },
    { href: "/schedule", label: t("schedule") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-heading text-xl">
          <span className="text-primary">
            <GitMark />
          </span>
          <span>
            <span className="text-primary font-bold">GIT</span>
            <span className="text-text">Bootcamp</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-1 text-sm text-text transition-colors hover:text-primary after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <span className="h-5 w-px bg-border" />
          <Link href="/login">
            <Button size="sm">{tCommon("signIn")}</Button>
          </Link>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}