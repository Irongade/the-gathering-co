import type { Metadata } from "next";
import { SITE } from "@/content/site";

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE.url).toString();
}

export function pageTitle(page?: string): string {
  return page ? `${page} | ${SITE.name}` : `${SITE.name} | ${SITE.tagline}`;
}

export function rootMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: pageTitle(),
      template: `%s | ${SITE.name}`,
    },
    description: `${SITE.tagline}. Table and chair hire with delivery and collection across ${SITE.area}.`,
    applicationName: SITE.name,
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "en_GB",
      title: pageTitle(),
      description: `Table and chair hire with delivery and collection across ${SITE.area}.`,
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

export function pageMetadata(input: { title: string; description: string; path: string }): Metadata {
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: absoluteUrl(input.path) },
    openGraph: {
      title: pageTitle(input.title),
      description: input.description,
      url: absoluteUrl(input.path),
    },
  };
}
