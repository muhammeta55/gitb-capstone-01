"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Bootcamp, Category } from "@/types";
import { useFilters, SortOption } from "@/hooks/useFilters";
import { filterBootcamps } from "@/lib/filterBootcamps";
import { BootcampCard } from "./BootcampCard";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const LEVELS = ["beginner", "intermediate", "advanced"] as const;
const SORTS: SortOption[] = ["popular", "price-asc", "price-desc", "duration"];
const SEARCH_DEBOUNCE_MS = 400;

interface Props {
  bootcamps: Bootcamp[];
  categories: Category[];
}

export function BootcampsBrowser({ bootcamps, categories }: Props) {
  const t = useTranslations("bootcampsPage");
  const { filters, setFilters, clearFilters, hasActiveFilters } = useFilters();

  // Arama kutusunun anlık değeri; URL'e yazılması aşağıda debounce'lanıyor
  const [searchInput, setSearchInput] = useState(filters.q);

  // Kullanıcı yazmayı bıraktıktan SEARCH_DEBOUNCE_MS sonra URL güncellenir.
  // Böylece her tuş vuruşunda değil, yazma durakladığında bir kez push olur.
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput !== filters.q) {
        setFilters({ q: searchInput });
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

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
      <Input
        type="search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder={t("searchPlaceholder")}
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
                  ? "bg-primary text-background"
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
        <Select
          value={filters.level}
          onChange={(e) => setFilters({ level: e.target.value })}
        >
          <option value="">{t("allLevels")}</option>
          {LEVELS.map((lvl) => (
            <option key={lvl} value={lvl}>
              {t(`level.${lvl}`)}
            </option>
          ))}
        </Select>

        <Select
          value={filters.sort}
          onChange={(e) => setFilters({ sort: e.target.value as SortOption })}
        >
          {SORTS.map((s) => (
            <option key={s} value={s}>
              {t(`sort.${s}`)}
            </option>
          ))}
        </Select>

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