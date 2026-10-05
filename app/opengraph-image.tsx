import { siteConfig } from "@/config/site"
import { OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE, renderOgImage } from "@/lib/og/render-og-image"

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`
export const size = OG_IMAGE_SIZE
export const contentType = OG_IMAGE_CONTENT_TYPE

export default function Image() {
  return renderOgImage({
    eyebrow: `${siteConfig.role} — ${siteConfig.location.label}`,
    title: "I design interfaces the way engineers write code —",
    accent: "deliberately.",
  })
}
