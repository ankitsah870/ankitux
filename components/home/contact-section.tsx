import { ArrowUpRightIcon } from "lucide-react"

import { ProjectBriefForm } from "@/components/contact/project-brief-form"
import { Container } from "@/components/layout/container"
import { LineReveal } from "@/components/motion/line-reveal"
import { Reveal } from "@/components/motion/reveal"
import { Accent } from "@/components/typography/accent"
import { Eyebrow } from "@/components/typography/eyebrow"
import { gmailComposeUrl, siteConfig } from "@/config/site"

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="pt-24 pb-16 sm:pt-32 sm:pb-24">
      <Container size="narrow" className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
        <div className="flex flex-col">
          <Eyebrow>Let’s talk</Eyebrow>
          <h2 id="contact-heading" className="heading-display mt-6 text-section">
            <LineReveal
              lines={["If", "you’re", "building", <Accent key="something">something</Accent>, <Accent key="complex">complex.</Accent>]}
            />
          </h2>
          <Reveal delay={0.2} offset={12}>
            <p className="mt-14 text-[1.0625rem] font-semibold text-foreground/90">We should talk.</p>
          </Reveal>

          <Reveal delay={0.3} offset={12} className="mt-auto hidden flex-col gap-6 pt-16 lg:flex">
            <div>
              <p className="label-mono text-muted-foreground">Prefer email?</p>
              <a
                href={gmailComposeUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-2 inline-flex items-center gap-2 text-lg font-semibold transition-colors hover:text-gold"
              >
                {siteConfig.email}
                <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
            <p className="flex items-center gap-2.5 text-sm text-foreground/75">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Taking on new projects · {siteConfig.availability}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ProjectBriefForm />
        </Reveal>
      </Container>
    </section>
  )
}
