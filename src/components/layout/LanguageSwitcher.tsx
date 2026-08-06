"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const localeLabels: Record<string, string> = {
  en: "English",
  tr: "Türkçe",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function switchLocale(nextLocale: string) {
    setIsOpen(false);
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="text-sm text-text border border-border rounded-md px-2 py-1"
      >
        {locale.toUpperCase()}
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute right-0 mt-1 w-32 bg-background border border-border rounded-md shadow-md py-1 z-50"
        >
          {routing.locales.map((loc) => (
            <li key={loc}>
              <button
                role="option"
                aria-selected={loc === locale}
                onClick={() => switchLocale(loc)}
                className={`w-full text-left px-3 py-1.5 text-sm hover:bg-surface ${
                  loc === locale ? "text-primary font-medium" : "text-text"
                }`}
              >
                {localeLabels[loc] ?? loc}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}