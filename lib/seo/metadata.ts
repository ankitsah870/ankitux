import type { Metadata } from "next"

import { siteConfig } from "@/config/site"

type PageMetadataInput = {
  /** Page title; the root layout's template appends "— Ankit Sah". */
  title?: string
  description?: string
  /** Path relative to the site root, used for the canonical URL. */
  path: string
  type?: "website" | "article" | "profile"
  noIndex?: boolean
}

/**
 * Builds per-page metadata with a canonical URL and complete Open Graph /
 * Twitter blocks (Next.js replaces those objects rather than deep-merging them).
 * Images come from each route's `opengraph-image.tsx` / `twitter-image.tsx`.
 */
export function createPageMetadata({
  title,
  description = siteConfig.description,
  path,
  type = "website",
  noIndex = false,
}: PageMetadataInput): Metadata {
  const socialTitle = title ? `${title} — ${siteConfig.name}` : siteConfig.title

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title: socialTitle,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  }
}
