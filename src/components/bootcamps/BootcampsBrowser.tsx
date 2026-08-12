"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Bootcamp, Category } from "@/types";
import { useFilters, SortOption } from "@/hooks/useFilters";
import { filterBootcamps } from "@/lib/filterBootcamps";
import { BootcampCard } from "./BootcampCard";
import { Input } from "@/components/ui/Input";
import { CustomSelect } from "@/components/ui/CustomSelect";

const LEVELS = ["beginner", "intermediate", "advanced"] as const;
const SORTS: SortOption[] = ["popular", "price-asc", "price-desc", "duration"];
const SEARCH_DEBOUNCE_MS = 400;

interface Props {
  bootcamps: Bootcamp[];
  categories: Category[];
}

// --- tiny inline icons, no new dependency required ---
function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
function EmptyIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
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

  // Aramayı anında temizle — debounce'u beklemeden
  function clearSearch() {
    setSearchInput("");
    setFilters({ q: "" });
  }

  const levelOptions = [
    { value: "", label: t("allLevels") },
    ...LEVELS.map((lvl) => ({ value: lvl, label: t(`level.${lvl}`) })),
  ];

  const sortOptions = SORTS.map((s) => ({ value: s, label: t(`sort.${s}`) }));

  return (
    <div className="space-y-6">
      {/* Arama */}
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
          <SearchIcon />
        </span>
        <Input
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="rounded-full pl-10 pr-10 py-2.5 shadow-sm border-border focus:ring-primary focus:border-primary [&::-webkit-search-cancel-button]:hidden"
        />
        {searchInput && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label={t("clearFilters")}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full text-muted hover:bg-muted/10 hover:text-text transition-colors"
          >
            <XIcon />
          </button>
        )}
      </div>

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
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-150 ${
                active
                  ? "bg-primary text-background shadow-sm"
                  : "bg-muted/10 text-muted hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Seviye + sıralama */}
      <div className="flex flex-wrap items-center gap-3">
        <CustomSelect
          value={filters.level}
          options={levelOptions}
          onChange={(v) => setFilters({ level: v })}
        />

        <CustomSelect
          value={filters.sort}
          options={sortOptions}
          onChange={(v) => setFilters({ sort: v as SortOption })}
        />

        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              setSearchInput("");
              clearFilters();
            }}
            className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-muted hover:bg-muted/10 hover:text-text transition-colors"
          >
            <XIcon />
            {t("clearFilters")}
          </button>
        )}
      </div>

      {/* Sonuç sayısı */}
      <p className="text-sm font-medium text-muted" aria-live="polite">
        {t("resultCount", { count: results.length })}
      </p>

      {/* Sonuçlar */}
      {results.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-muted/5 py-16 text-center">
          <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-background text-muted shadow-sm">
            <EmptyIcon />
          </span>
          <p className="font-medium text-text">{t("noResults")}</p>
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