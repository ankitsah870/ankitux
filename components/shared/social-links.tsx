import { SocialIcon } from "@/components/brand/social-icon"
import { aboutSocials, siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

const linkClassName =
  "flex size-10 items-center justify-center rounded-full text-foreground transition-[color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-white/5 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring outline-none"

/** Configured social profiles followed by email. */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {aboutSocials.map((social) => (
        <li key={social.platform}>
          <a href={social.href} target="_blank" rel="noopener noreferrer me" aria-label={social.label} className={linkClassName}>
            <SocialIcon platform={social.platform} />
          </a>
        </li>
      ))}
      <li>
        <a href={siteConfig.contactHref} aria-label={`Contact ${siteConfig.name}`} className={linkClassName}>
          <SocialIcon platform="mail" />
        </a>
      </li>
    </ul>
  )
}
