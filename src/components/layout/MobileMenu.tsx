"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export function MobileMenu() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/bootcamps", label: t("bootcamps") },
    { href: "/schedule", label: t("schedule") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          "a, button, input, select, textarea, [tabindex]:not([tabindex='-1'])"
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Rendered via a portal into document.body — see note below the component
  // for why this is necessary (backdrop-blur on the header creates a new
  // containing block for fixed-position descendants, which broke this
  // panel's positioning when it was rendered inline inside <Header>).
  const panel = isOpen && (
    <div
      className="fixed inset-0 z-50 bg-black/50 md:hidden"
      onClick={() => setIsOpen(false)}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 h-full w-64 bg-background border-l border-border p-4 flex flex-col gap-4"
      >
        <div className="flex justify-end">
          <button
            ref={closeButtonRef}
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="text-text text-2xl"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-base text-text hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <Link href="/login" onClick={() => setIsOpen(false)} className="mt-auto">
          <Button size="sm" className="w-full">
            {tCommon("signIn")}
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden text-text text-2xl"
        aria-label="Open menu"
      >
        ☰
      </button>

      {mounted && panel && createPortal(panel, document.body)}
    </>
  );
}