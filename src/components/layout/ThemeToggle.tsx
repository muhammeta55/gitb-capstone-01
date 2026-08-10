"use client";

import { useEffect, useState } from "react";

function getInitialTheme(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("theme") === "dark";
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(getInitialTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
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