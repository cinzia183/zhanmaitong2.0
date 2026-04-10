import exhibitions from "@/data/site/exhibitions.json";
import type { Exhibition, ExhibitionsSiteData } from "@/lib/types";

const dataset = exhibitions as ExhibitionsSiteData;

export function getExhibitions() {
  return [...dataset.exhibitions].sort((a, b) => a.start_date.localeCompare(b.start_date));
}

export function getFeaturedExhibitions() {
  return getExhibitions().filter((item) => item.featured);
}

export function getExhibitionBySlug(slug: string) {
  return getExhibitions().find((item) => item.slug === slug);
}

export function getIndustryBuckets() {
  const buckets = new Map<string, number>();

  for (const item of dataset.exhibitions) {
    buckets.set(item.industry, (buckets.get(item.industry) ?? 0) + 1);
  }

  return Array.from(buckets.entries()).map(([label, count]) => ({
    label,
    count
  }));
}

export function formatDateRange(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    month: "numeric",
    day: "numeric"
  });

  return `${startDate.getFullYear()}年${formatter.format(startDate)} - ${formatter.format(endDate)}`;
}
