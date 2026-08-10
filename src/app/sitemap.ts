import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { bootcamps } from "@/data/bootcamps";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

const STATIC_PATHS = ["", "/about", "/bootcamps", "/contact", "/login", "/register", "/schedule"];

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.7,
      });
    }
  }

  for (const locale of locales) {
    for (const bootcamp of bootcamps) {
      entries.push({
        url: `${BASE_URL}/${locale}/bootcamps/${bootcamp.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}