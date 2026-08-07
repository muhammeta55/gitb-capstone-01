import { Bootcamp } from "@/types";
import { Filters } from "@/hooks/useFilters";

// "Yazılım Ç" → "yazilim c" : arama karşılaştırmasını Türkçe karakterlere dayanıklı yapar
function normalize(text: string): string {
  return text
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i");
}

export function filterBootcamps(bootcamps: Bootcamp[], filters: Filters): Bootcamp[] {
  const query = normalize(filters.q.trim());

  const result = bootcamps.filter((b) => {
    // Arama: başlık, kısa açıklama veya etiketlerde geçiyor mu?
    if (query) {
      const haystack = normalize([b.title, b.shortDescription, ...b.tags].join(" "));
      if (!haystack.includes(query)) return false;
    }

    // Kategori: hiç seçilmemişse hepsi geçer, seçilmişse içinde olmalı
    if (filters.categories.length && !filters.categories.includes(b.categorySlug)) {
      return false;
    }

    // Seviye
    if (filters.level && b.level !== filters.level) {
      return false;
    }

    return true;
  });

  // Sıralama: filter zaten yeni dizi döndürdüğü için sort güvenli
  switch (filters.sort) {
    case "price-asc":
      return result.sort((a, b) => a.priceEUR - b.priceEUR);
    case "price-desc":
      return result.sort((a, b) => b.priceEUR - a.priceEUR);
    case "duration":
      return result.sort((a, b) => a.durationWeeks - b.durationWeeks);
    case "popular":
    default:
      return result.sort((a, b) => b.studentCount - a.studentCount);
  }
}


export function getBootcampBySlug(bootcamps: Bootcamp[], slug: string): Bootcamp | undefined {
  return bootcamps.find((b) => b.slug === slug);
}

export function getAllBootcampSlugs(bootcamps: Bootcamp[]): string[] {
  return bootcamps.map((b) => b.slug);
}
