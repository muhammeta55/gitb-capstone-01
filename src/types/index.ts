export type Level = 'beginner' | 'intermediate' | 'advanced';
export type Format = 'online' | 'hybrid' | 'onsite';

export interface Bootcamp {
  slug: string;
  title: string;
  categorySlug: string;
  level: Level;
  format: Format;
  durationWeeks: number;
  languages: string[];
  priceEUR: number;
  rating: number;
  studentCount: number;
  shortDescription: string;
  description: string;
  heroImage: string;
  tags: string[];
  curriculum: { title: string; durationHours: number; lessons: string[] }[];
  instructorSlug: string;
  featured: boolean;
}