import { LineReveal } from "@/components/motion/line-reveal"
import { Reveal } from "@/components/motion/reveal"
import { Accent } from "@/components/typography/accent"
import { Eyebrow } from "@/components/typography/eyebrow"
import { WorkCarousel } from "@/components/work/work-carousel"
import { projects } from "@/content/projects"

export function WorkSection() {
  const cards = projects.map(({ slug, title, summary, cover, coverAlt }) => ({
    slug,
    title,
    summary,
    cover,
    coverAlt,
  }))

  return (
    <section id="work" aria-labelledby="work-heading" className="overflow-hidden py-24 sm:py-32">
      <WorkCarousel
        projects={cards}
      >
        <div>
          <Eyebrow className="normal-case">Selected work</Eyebrow>
          <h2 id="work-heading" className="heading-display mt-5 text-section">
            <LineReveal lines={["Real work.", <span key="accent">Real <Accent>decisions.</Accent></span>]} />
          </h2>
          <Reveal delay={0.2} offset={12}>
            <p className="mt-6 max-w-sm text-[1.0625rem] leading-snug text-foreground/90">
              A few products where the problem was bigger than the screen.
            </p>
          </Reveal>
        </div>
      </WorkCarousel>
    </section>
  )
}
