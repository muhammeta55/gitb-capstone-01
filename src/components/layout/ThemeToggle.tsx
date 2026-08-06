"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- required here: localStorage is a browser-only API, so this mounted-check pattern is the standard way to avoid SSR/client hydration mismatches (see B-02 ticket notes)
    setMounted(true);
    setIsDark(localStorage.getItem("theme") === "dark");
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
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