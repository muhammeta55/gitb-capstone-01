"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Bootcamp, Category } from "@/types";
import { useFilters, SortOption } from "@/hooks/useFilters";
import { filterBootcamps } from "@/lib/filterBootcamps";
import { BootcampCard } from "./BootcampCard";

const LEVELS = ["beginner", "intermediate", "advanced"] as const;
const SORTS: SortOption[] = ["popular", "price-asc", "price-desc", "duration"];

interface Props {
  bootcamps: Bootcamp[];
  categories: Category[];
}

export function BootcampsBrowser({ bootcamps, categories }: Props) {
  const t = useTranslations("bootcampsPage");
  const { filters, setFilters, clearFilters, hasActiveFilters } = useFilters();

  // Arama kutusunun anlık değeri (URL'e yazılması Adım 5'te debounce'lanacak)
  const [searchInput, setSearchInput] = useState(filters.q);

  const results = useMemo(
    () => filterBootcamps(bootcamps, filters),
    [bootcamps, filters]
  );

  // Kategori seçimi aç/kapa (çoklu seçim)
  function toggleCategory(slug: string) {
    const next = filters.categories.includes(slug)
      ? filters.categories.filter((c) => c !== slug)
      : [...filters.categories, slug];
    setFilters({ categories: next });
  }

  return (
    <div className="space-y-6">
      {/* Arama */}
      <input
        type="search"
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          setFilters({ q: e.target.value });
        }}
        placeholder={t("searchPlaceholder")}
        className="w-full rounded-lg border border-muted/30 bg-transparent px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary"
      />

      {/* Kategori çipleri */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const active = filters.categories.includes(cat.slug);
          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => toggleCategory(cat.slug)}
              aria-pressed={active}
              className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                active
                  ? "bg-primary text-white"
                  : "bg-muted/10 hover:bg-muted/20"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Seviye + sıralama */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filters.level}
          onChange={(e) => setFilters({ level: e.target.value })}
          className="rounded-lg border border-muted/30 bg-transparent px-3 py-2 text-sm"
        >
          <option value="">{t("allLevels")}</option>
          {LEVELS.map((lvl) => (
            <option key={lvl} value={lvl}>
              {t(`level.${lvl}`)}
            </option>
          ))}
        </select>

        <select
          value={filters.sort}
          onChange={(e) => setFilters({ sort: e.target.value as SortOption })}
          className="rounded-lg border border-muted/30 bg-transparent px-3 py-2 text-sm"
        >
          {SORTS.map((s) => (
            <option key={s} value={s}>
              {t(`sort.${s}`)}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              setSearchInput("");
              clearFilters();
            }}
            className="text-sm text-primary underline underline-offset-4"
          >
            {t("clearFilters")}
          </button>
        )}
      </div>

      {/* Sonuç sayısı */}
      <p className="text-sm text-muted" aria-live="polite">
        {t("resultCount", { count: results.length })}
      </p>

      {/* Sonuçlar */}
      {results.length === 0 ? (
        <div className="rounded-lg border border-dashed border-muted/30 py-16 text-center">
          <p className="font-medium">{t("noResults")}</p>
          <p className="mt-1 text-sm text-muted">{t("noResultsHint")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((b) => (
            <BootcampCard key={b.slug} bootcamp={b} />
          ))}
        </div>
      )}
    </div>
  );
}