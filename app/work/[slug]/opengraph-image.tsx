import { siteConfig } from "@/config/site"
import { getProject, projects } from "@/content/projects"
import { loadProjectCover, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE, renderOgImage } from "@/lib/og/render-og-image"

export const alt = `Case study by ${siteConfig.name}, ${siteConfig.role}`
export const size = OG_IMAGE_SIZE
export const contentType = OG_IMAGE_CONTENT_TYPE

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return renderOgImage({ eyebrow: "Case study", title: "Selected", accent: "work." })

  const words = project.title.split(" ")
  const isSingleWord = words.length === 1

  return renderOgImage({
    eyebrow: `Case study · ${project.tag}`,
    title: isSingleWord ? project.title : words.slice(0, -1).join(" "),
    accent: isSingleWord ? "." : words.at(-1),
    caption: project.category,
    coverImage: await loadProjectCover(project.slug),
  })
}
