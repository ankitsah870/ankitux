import type { MetadataRoute } from "next"

import { absoluteUrl } from "@/config/site"
import { projects } from "@/content/projects"

export default function sitemap(): MetadataRoute.Sitemap {
  const latestUpdate = projects.map((project) => project.updatedAt).sort().at(-1)

  return [
    {
      url: absoluteUrl("/"),
      lastModified: latestUpdate,
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl("/opengraph-image")],
    },
    ...projects.map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`),
      lastModified: project.updatedAt,
      changeFrequency: "yearly" as const,
      priority: 0.8,
      images: [absoluteUrl(`/work/${project.slug}/opengraph-image`)],
    })),
  ]
}
