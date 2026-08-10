"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export function ThemeHtmlSync() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const stored = localStorage.getItem("theme");
    document.documentElement.classList.toggle("dark", stored === "dark");
  }, [pathname]);

  return null;
}