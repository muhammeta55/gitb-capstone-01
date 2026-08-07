"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "@/i18n/navigation";

function getInitialTheme(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("theme") === "dark";
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(getInitialTheme);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- required: mounted must flip only after client hydration to avoid SSR/client mismatch on the theme button
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark, pathname]);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  if (!mounted) {
    return (
      <button
        className="text-sm text-text border border-border rounded-md px-2 py-1 w-8"
        aria-label="Toggle theme"
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="text-sm text-text border border-border rounded-md px-2 py-1"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}