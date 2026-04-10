import type { MetadataRoute } from "next";
import { getExhibitions } from "@/lib/exhibitions";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/exhibitions", "/contact"];
  const exhibitionRoutes = getExhibitions().map((item) => ({
    url: `${siteConfig.url}/exhibitions/${item.slug}`,
    lastModified: item.end_date
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date()
    })),
    ...exhibitionRoutes
  ];
}
