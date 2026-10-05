import { Fragment } from "react"
import Link from "next/link"
import { ArrowDownToLineIcon, ChevronDownIcon } from "lucide-react"

import { HeroGlow } from "@/components/illustrations/hero-glow"
import { Container } from "@/components/layout/container"
import { LineReveal } from "@/components/motion/line-reveal"
import { Reveal } from "@/components/motion/reveal"
import { Accent } from "@/components/typography/accent"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh flex-col overflow-hidden pt-[calc(var(--header-height)+3rem)] pb-10"
    >
      <HeroGlow className="-z-10" />

      <Container size="wide" className="flex flex-1 flex-col justify-center">
        <div className="flex flex-col">
          <h1 id="hero-heading" className="heading-display text-[clamp(2.25rem,4.1vw,3.75rem)] lg:whitespace-nowrap">
            <LineReveal
              immediate
              delay={0.15}
              lines={[
                "I design interfaces",
                "the way engineers write",
                <Fragment key="accent">
                  code — <Accent>deliberately.</Accent>
                  <span
                    aria-hidden
                    className="ml-[0.08em] inline-block h-[0.78em] w-[0.09em] translate-y-[0.06em] animate-caret bg-gold motion-reduce:animate-none"
                  />
                </Fragment>,
              ]}
            />
          </h1>

          <Reveal immediate delay={0.6} offset={16}>
            <p className="mt-7 max-w-[25rem] text-base leading-snug text-foreground/90 sm:text-[1.0625rem]">
              I help teams turn complex product ideas, workflows, and data into clear, scalable web and mobile
              experiences.
            </p>
          </Reveal>

          <Reveal immediate delay={0.75} offset={16} className="mt-10 flex flex-wrap gap-4 sm:gap-6">
            <Link href={siteConfig.contactHref} className={buttonVariants({ size: "cta" })}>
              Hire me
            </Link>
            <a
              href={siteConfig.resumeHref}
              download={siteConfig.resumeFileName}
              className={cn(buttonVariants({ variant: "outline", size: "cta" }), "group")}
            >
              Download resume
              <ArrowDownToLineIcon className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </Reveal>
        </div>
      </Container>

      <Container size="wide" className="mt-16 flex flex-col-reverse items-start justify-between gap-8 sm:flex-row sm:items-end">
        <Reveal immediate delay={1.1} offset={0}>
          <Link href="#about" className="group inline-flex items-center gap-2 text-base text-foreground/90">
            Scroll for more
            <ChevronDownIcon className="size-5 animate-bounce motion-reduce:animate-none" />
          </Link>
        </Reveal>
        <Reveal immediate delay={1} offset={12}>
          <p className="max-w-[28rem] text-base leading-snug text-foreground/90">
            Available for product design, UI/UX, SaaS, dashboards, and digital product work.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
