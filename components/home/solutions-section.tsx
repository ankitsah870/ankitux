import { SolutionCard } from "@/components/home/solution-card"
import { Container } from "@/components/layout/container"
import { LineReveal } from "@/components/motion/line-reveal"
import { Reveal } from "@/components/motion/reveal"
import { Accent } from "@/components/typography/accent"
import { Eyebrow } from "@/components/typography/eyebrow"
import { solutions, solutionsSummary } from "@/content/solutions"

export function SolutionsSection() {
  return (
    <section aria-labelledby="solutions-heading" className="py-24 sm:py-32">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.66fr)_minmax(0,1fr)] lg:gap-16">
        <div className="lg:pt-2">
          <Eyebrow>What I solve</Eyebrow>
          <h2 id="solutions-heading" className="heading-display mt-6 text-section">
            <LineReveal lines={["Not", "just", "screens.", <Accent key="accent">Decisions.</Accent>]} />
          </h2>
          <Reveal delay={0.2} offset={12}>
            <p className="mt-6 max-w-xs text-[1.0625rem] leading-snug text-foreground/85">
              {solutionsSummary}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {solutions.map((solution, order) => (
            <SolutionCard key={solution.index} solution={solution} order={order} />
          ))}
        </div>
      </Container>
    </section>
  )
}
