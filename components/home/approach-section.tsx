import { PortraitCard } from "@/components/home/portrait-card"
import { PrincipleCard } from "@/components/home/principle-card"
import { Container } from "@/components/layout/container"
import { LineReveal } from "@/components/motion/line-reveal"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { Accent } from "@/components/typography/accent"
import { Eyebrow } from "@/components/typography/eyebrow"
import { principles, tooling } from "@/content/about"

export function ApproachSection() {
  return (
    <section id="approach" aria-labelledby="approach-heading" className="py-24 sm:py-32 lg:py-40">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:gap-10">
        <Reveal className="h-full">
          <PortraitCard className="h-full min-h-[34rem]" />
        </Reveal>

        <div className="flex flex-col lg:pt-16">
          <Eyebrow>How I think</Eyebrow>
          <h2 id="approach-heading" className="heading-display mt-5 text-section">
            <LineReveal lines={["I don’t", "start with screens.", "I start with", <Accent key="accent">constraints.</Accent>]} />
          </h2>
          <Reveal delay={0.2} offset={12}>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-snug text-foreground/85">
              I approach design the way a senior engineer approaches code: read the problem, map constraints, reduce
              scope, then ship. Everything below is repeatable, documented, and boring — in the best way.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {principles.map((principle) => (
              <PrincipleCard key={principle.index} principle={principle} />
            ))}
          </div>

          <Eyebrow className="mt-16">Tooling</Eyebrow>
          <RevealGroup as="ul" stagger={0.05} className="mt-8 flex flex-wrap gap-3">
            {tooling.map((tool) => (
              <RevealItem
                as="li"
                key={tool}
                className="rounded-full border border-white/25 px-5 py-2.5 text-[0.9375rem] font-semibold uppercase transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                {tool}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  )
}
