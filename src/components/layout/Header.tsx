import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

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
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-heading text-xl text-text">
          GITBootcamp
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link href="/login">
            <Button size="sm">{tCommon("signIn")}</Button>
          </Link>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}