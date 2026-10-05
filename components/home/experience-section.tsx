import { ExperienceAccordion } from "@/components/home/experience-accordion"
import { Container } from "@/components/layout/container"
import { LineReveal } from "@/components/motion/line-reveal"
import { Reveal } from "@/components/motion/reveal"
import { Accent } from "@/components/typography/accent"
import { Eyebrow } from "@/components/typography/eyebrow"
import { experienceHighlights, experienceSummary } from "@/content/experience"

export function ExperienceSection() {
  return (
    <section aria-labelledby="experience-heading" className="py-24 sm:py-32">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] lg:gap-10">
        <div className="lg:pt-6">
          <Eyebrow className="normal-case">Experience</Eyebrow>
          <h2 id="experience-heading" className="heading-display mt-5 text-section">
            <LineReveal lines={["Built across", <span key="accent">real <Accent>products.</Accent></span>]} />
          </h2>
          <Reveal delay={0.2} offset={12}>
            <p className="mt-6 max-w-sm text-[1.0625rem] leading-snug text-foreground/85">{experienceSummary}</p>
          </Reveal>
        </div>
        <ExperienceAccordion items={experienceHighlights} />
      </Container>
    </section>
  )
}
