import { siBehance, siInstagram, siX } from "simple-icons"

import type { SocialPlatform } from "@/config/site"
import { cn } from "@/lib/utils"

/* LinkedIn isn't distributed by simple-icons, so its "in" glyph is drawn here. */
const LINKEDIN_PATH =
  "M5 3.6a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8ZM3 10h4v11H3V10Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-4.8c0-1.15-.02-2.62-1.6-2.62-1.6 0-1.84 1.25-1.84 2.54V21h-4V10Z"

const MAIL_PATH = "M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v.4l-10 6.25L2 5.9v-.4Zm0 2.76V18.5A1.5 1.5 0 0 0 3.5 20h17a1.5 1.5 0 0 0 1.5-1.5V8.26l-10 6.25L2 8.26Z"

const paths: Record<SocialPlatform | "mail", string> = {
  behance: siBehance.path,
  linkedin: LINKEDIN_PATH,
  instagram: siInstagram.path,
  x: siX.path,
  mail: MAIL_PATH,
}

type SocialIconProps = {
  platform: SocialPlatform | "mail"
  className?: string
}

export function SocialIcon({ platform, className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-5 fill-current", className)}>
      <path d={paths[platform]} />
    </svg>
  )
}
