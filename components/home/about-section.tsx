import { Container } from "@/components/layout/container"
import { LineReveal } from "@/components/motion/line-reveal"
import { Reveal } from "@/components/motion/reveal"
import { SocialLinks } from "@/components/shared/social-links"
import { Accent } from "@/components/typography/accent"
import { Eyebrow } from "@/components/typography/eyebrow"
import { aboutIntro } from "@/content/about"

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-b border-border py-28 sm:py-36">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div>
          <Eyebrow className="normal-case">About Me</Eyebrow>
          <h2 id="about-heading" className="heading-display mt-5 text-section">
            <LineReveal lines={["I design", "products that", <span key="accent">simplify <Accent>complexity.</Accent></span>]} />
          </h2>
        </div>

        <Reveal delay={0.2} offset={16} className="flex flex-col gap-8 lg:pt-12 lg:pl-10">
          <p className="max-w-xl text-[1.0625rem] leading-snug text-foreground/90">{aboutIntro}</p>
          <SocialLinks className="-mr-2 justify-start lg:justify-end" />
        </Reveal>
      </Container>
    </section>
  )
}
