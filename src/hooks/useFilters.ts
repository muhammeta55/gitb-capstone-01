"use client";

import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useCallback, useMemo } from "react";

export type SortOption = "popular" | "price-asc" | "price-desc" | "duration";

export interface Filters {
  q: string;
  categories: string[];
  level: string;
  sort: SortOption;
}

export function useFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // URL'i oku → Filters objesi üret
  const filters: Filters = useMemo(() => {
    return {
      q: searchParams.get("q") ?? "",
      categories: searchParams.get("category")?.split(",").filter(Boolean) ?? [],
      level: searchParams.get("level") ?? "",
      sort: (searchParams.get("sort") as SortOption) ?? "popular",
    };
  }, [searchParams]);

  // Filters objesi → URL'e yaz
  const setFilters = useCallback(
    (next: Partial<Filters>) => {
      const merged = { ...filters, ...next };
      const params = new URLSearchParams();

      if (merged.q) params.set("q", merged.q);
      if (merged.categories.length) params.set("category", merged.categories.join(","));
      if (merged.level) params.set("level", merged.level);
      if (merged.sort !== "popular") params.set("sort", merged.sort);

      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [filters, router, pathname]
  );

  const clearFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  const hasActiveFilters =
    Boolean(filters.q) ||
    filters.categories.length > 0 ||
    Boolean(filters.level) ||
    filters.sort !== "popular";

  return { filters, setFilters, clearFilters, hasActiveFilters };
}