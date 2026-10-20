import type { MetadataRoute } from "next";
import { listItems } from "@/content/catalogue";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: MetadataRoute.Sitemap = ["/", "/hire", "/occasions", "/about", "/contact"].map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
  const items: MetadataRoute.Sitemap = listItems().map((item) => ({
    url: absoluteUrl(`/hire/${item.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  return [...pages, ...items];
}
