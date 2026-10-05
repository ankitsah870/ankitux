import Link from "next/link"

import { LogoMark } from "@/components/brand/logo-mark"
import { Container } from "@/components/layout/container"
import { LineReveal } from "@/components/motion/line-reveal"
import { Reveal } from "@/components/motion/reveal"
import { LocalTime } from "@/components/shared/local-time"
import { activeSocials, gmailComposeUrl, siteConfig } from "@/config/site"

const quietLinkClassName = "text-[0.9375rem] text-foreground/70 transition-colors duration-300 hover:text-foreground"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="pt-24 pb-8 sm:pt-36">
      <Container size="wide">
        <Reveal offset={12} className="flex flex-col gap-5 pb-7 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {activeSocials.map((social) => (
              <li key={social.platform}>
                <a href={social.href} target="_blank" rel="noopener noreferrer me" className={quietLinkClassName}>
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={gmailComposeUrl()} target="_blank" rel="noopener noreferrer" className={quietLinkClassName}>
            {siteConfig.email}
          </a>
        </Reveal>

        <Reveal
          offset={12}
          delay={0.1}
          className="grid grid-cols-1 items-end gap-10 border-y border-white/15 py-10 md:grid-cols-3 md:gap-6"
        >
          <Link href="/" aria-label={`${siteConfig.name} — home`} className="group self-center justify-self-start">
            <LogoMark className="h-14 transition-transform duration-500 ease-out-expo group-hover:-rotate-6 sm:h-[4.25rem]" />
          </Link>

          <nav aria-label="Footer">
            <ul className="flex flex-col gap-2.5 md:items-center">
              {siteConfig.footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-lg text-foreground/80 transition-colors duration-300 hover:text-gold sm:text-[1.0625rem]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-[0.9375rem] text-foreground/70 md:text-right">{siteConfig.shortBio}</p>
        </Reveal>

        <Link
          href={siteConfig.contactHref}
          className="mt-10 flex items-end gap-4 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:mt-14"
        >
          <span className="font-display text-[clamp(2.75rem,10.5vw,10.5rem)] leading-[0.95] font-bold tracking-[-0.035em] [font-stretch:112%]">
            <LineReveal lines={["Get in Touch"]} />
          </span>
        </Link>

        <div className="mt-14 flex items-center justify-between gap-4 text-[0.8125rem] text-foreground/60 sm:mt-20">
          <p>
            © {siteConfig.name} {year}
          </p>
          <p>
            {siteConfig.location.country} — <LocalTime timeZone={siteConfig.location.timeZone} hour12 />
          </p>
        </div>
      </Container>
    </footer>
  )
}
