import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon } from "lucide-react"

import { Container } from "@/components/layout/container"
import { LineReveal } from "@/components/motion/line-reveal"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { JsonLd } from "@/components/seo/json-ld"
import { Accent } from "@/components/typography/accent"
import { Eyebrow } from "@/components/typography/eyebrow"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { formatProjectNumber, getAdjacentProject, getPreviousProject, getProject, projects, type ShowcaseFlow } from "@/content/projects"
import { createPageMetadata } from "@/lib/seo/metadata"
import { caseStudySchema } from "@/lib/seo/structured-data"

const caseStudyBodyText = "text-[1.0625rem] leading-relaxed text-foreground/85"

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  return createPageMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
    type: "article",
  })
}

/** Gold closing word, like every headline on the site. One-word names get a gold full stop instead. */
function splitAccent(title: string) {
  const words = title.split(" ")
  if (words.length === 1) return { lead: title, accent: "." }
  return { lead: words.slice(0, -1).join(" "), accent: words.at(-1) ?? "" }
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const nextProject = getAdjacentProject(project.slug)
  const previousProject = getPreviousProject(project.slug)
  const { lead, accent } = splitAccent(project.title)
  const facts =
    project.slug === "upstage"
      ? [
          { label: "Role", value: project.role },
          { label: "Type", value: project.projectType },
          { label: "Platform", value: project.platform },
          { label: "Scope", value: project.scope },
          { label: "Year", value: project.year },
        ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value))
      : project.slug === "sybot"
        ? [
            { label: "Role", value: project.role },
            { label: "Client", value: project.company },
            { label: "Platform", value: project.platform },
            { label: "Industry", value: project.industry },
          ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value))
      : [
          { label: "Role", value: project.role },
          { label: "Company", value: project.company },
          { label: "Year", value: project.year },
          { label: "Platform", value: project.platform },
          { label: "Industry", value: project.industry },
        ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value))

  const upstageProductSteps = [
    { title: "Speech Creation", detail: "A guided setup that gives the product the context needed to shape each speech." },
    { title: "Generated Speech", detail: "Structured sections turn generated content into something users can review, edit, and refine." },
    { title: "Contextual Refinement", detail: "Users can work through individual sections without losing sight of the complete speech." },
    { title: "Speech Management", detail: "A persistent workspace for returning to generated, practiced, edited, and exported speeches." },
    { title: "Practice Experience", detail: "Extending the experience beyond writing into preparation and delivery." },
  ]

  const upstageDesignDecisions = [
    { title: "Guided Creation", detail: "Break speech creation into smaller decisions rather than presenting one overwhelming form." },
    { title: "Structured Output", detail: "Present generated content as sections that can be reviewed and refined individually." },
    { title: "Continuous Control", detail: "Keep editing, regeneration, feedback, and refinement available within the same speech workspace." },
    { title: "One Connected Journey", detail: "Connect creation, editing, practice, history, and export within the same product environment." },
  ]

  const safartrakDesignDecisions = [
    { title: "Information hierarchy", detail: "Group fleet data into summaries, details, and clear actions." },
    { title: "Status at a glance", detail: "Make vehicle, device, and maintenance status easy to scan." },
    { title: "Actions with context", detail: "Keep controls and command feedback clear at each step." },
    { title: "Consistent interface", detail: "Use a shared visual language across dashboards and workflows." },
  ]

  const safartrakDesignedAreas = [
    { title: "Fleet dashboard", detail: "Vehicle, driver, and fleet operations." },
    { title: "Vehicle operations", detail: "Vehicle details, status, and maintenance." },
    { title: "Remote control", detail: "Mobilize / Immobilize and command feedback." },
    { title: "Support & billing", detail: "Users, tickets, products, and subscriptions." },
    { title: "Marketing website", detail: "Fleet intelligence, products, and industries." },
  ]

  const safartrakSections = [
    {
      eyebrow: "Overview",
      content: <p className={`${caseStudyBodyText} max-w-4xl`}>{project.overview}</p>,
    },
    {
      eyebrow: "What I designed",
      content: (
        <RevealGroup as="ol" className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            {safartrakDesignedAreas.map((area, index) => (
              <RevealItem as="li" key={area.title} className="flex items-start gap-5 border-b border-border py-5">
                <span className="label-mono text-gold">{formatProjectNumber(index)}</span>
                <div>
                  <h3 className="text-lg font-semibold">{area.title}</h3>
                  <p className={`mt-2 max-w-lg ${caseStudyBodyText}`}>{area.detail}</p>
                </div>
              </RevealItem>
            ))}
        </RevealGroup>
      ),
    },
    {
      eyebrow: "Project showcase",
      content: (
        <div>
          <figure className="overflow-hidden rounded-2xl border border-white/10 bg-surface">
            <Image src={project.cover} alt={project.coverAlt} sizes="(min-width: 1280px) 80rem, 100vw" placeholder="blur" className="h-auto w-full" />
          </figure>
          <ShowcaseFlowList items={project.showcaseFlows} />
        </div>
      ),
    },
    {
      eyebrow: "Design decisions",
      content: (
        <RevealGroup as="ul" className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            {safartrakDesignDecisions.map((decision) => (
              <RevealItem as="li" key={decision.title} className="border-t border-border py-5">
                <h3 className="text-lg font-semibold">{decision.title}</h3>
                <p className={`mt-2 max-w-lg ${caseStudyBodyText}`}>{decision.detail}</p>
              </RevealItem>
            ))}
        </RevealGroup>
      ),
    },
    {
      eyebrow: "Outcome",
      content: <p className={`${caseStudyBodyText} max-w-4xl`}>{project.outcome}</p>,
    },
  ]

  const serqDesignAreas = [
    { title: "Onboarding & Authentication", detail: "Getting users into the platform quickly." },
    { title: "Service Discovery", detail: "Categories, services, recommendations, and service details." },
    { title: "Booking & Checkout", detail: "Service selection, location, date, time, and payment." },
    { title: "Booking Management", detail: "Ongoing, completed, cancelled, and expired bookings." },
    { title: "Support & Profile", detail: "Alerts, tickets, payments, locations, and account management." },
  ]

  const serqDesignDecisions = [
    { title: "Clear discovery", detail: "Organizing multiple service categories into an easy-to-scan experience." },
    { title: "Guided booking", detail: "Making service selection, scheduling, location, and checkout feel connected." },
    { title: "Visible status", detail: "Keeping booking, payment, and provider updates easy to understand." },
    { title: "Easy recovery", detail: "Supporting states like payment failure, provider unavailable, cancellation, and support tickets." },
  ]

  const serqSections = [
    {
      eyebrow: "Overview",
      content: <p className={`${caseStudyBodyText} max-w-4xl`}>{project.overview}</p>,
    },
    {
      eyebrow: "What I designed",
      content: (
        <RevealGroup as="ol" className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
          {serqDesignAreas.map((area, index) => (
            <RevealItem as="li" key={area.title} className="flex items-start gap-5 border-b border-border py-5">
              <span className="label-mono text-gold">{formatProjectNumber(index)}</span>
              <div>
                <h3 className="text-lg font-semibold">{area.title}</h3>
                <p className="mt-2 max-w-lg text-base leading-relaxed text-foreground/80">{area.detail}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      ),
    },
    {
      eyebrow: "Project showcase",
      content: (
        <div>
          <figure className="overflow-hidden rounded-2xl border border-white/10 bg-surface">
            <Image
              src={project.cover}
              alt={project.coverAlt}
              sizes="(min-width: 1280px) 80rem, 100vw"
              placeholder="blur"
              className="h-auto w-full"
            />
          </figure>
          <ShowcaseFlowList items={project.showcaseFlows} />
        </div>
      ),
    },
    {
      eyebrow: "Design decisions",
      content: (
        <div>
          <RevealGroup as="ul" className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            {serqDesignDecisions.map((decision) => (
              <RevealItem as="li" key={decision.title} className="border-t border-border py-5">
                <h3 className="text-lg font-semibold">{decision.title}</h3>
                <p className="mt-2 max-w-lg text-base leading-relaxed text-foreground/80">{decision.detail}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      ),
    },
    {
      eyebrow: "Outcome",
      content: <p className={`${caseStudyBodyText} max-w-4xl`}>{project.outcome}</p>,
    },
  ]

  const sybotDesignWork = [
    { title: "AI Agent Setup", detail: "Configure AI agents and their voice." },
    { title: "Campaign Management", detail: "Create and configure sales campaigns." },
    { title: "CRM & Lead Management", detail: "Manage leads, contacts, status, and assignments." },
    { title: "Interaction History", detail: "Track calls, messages, emails, and notes." },
    { title: "Lead Distribution", detail: "Automate or manually distribute leads." },
  ]

  const sybotDesignDecisions = [
    { title: "Progressive setup", detail: "Breaking configuration into focused steps." },
    { title: "Clear hierarchy", detail: "Making operational tasks easy to navigate." },
    { title: "Data-focused UI", detail: "Structuring information for quick scanning." },
    { title: "Flexible automation", detail: "Balancing automated and manual control." },
  ]

  const sybotSections = [
    {
      eyebrow: "Overview",
      content: <p className={`${caseStudyBodyText} max-w-4xl`}>{project.overview}</p>,
    },
    {
      eyebrow: "What I designed",
      content: (
        <RevealGroup as="ol" className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
          {sybotDesignWork.map((item, index) => (
            <RevealItem as="li" key={item.title} className="flex items-start gap-5 border-b border-border py-5">
              <p className="label-mono text-gold">{formatProjectNumber(index)}</p>
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className={`mt-2 max-w-lg ${caseStudyBodyText}`}>{item.detail}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      ),
    },
    {
      eyebrow: "Project showcase",
      content: (
        <div>
          <figure className="overflow-hidden rounded-2xl border border-white/10 bg-surface">
            <Image
              src={project.cover}
              alt="SYBOT sales operations dashboard with agent and campaign tables, performance indicators, and analytics."
              sizes="(min-width: 1280px) 80rem, 100vw"
              placeholder="blur"
              className="h-auto w-full"
            />
          </figure>
          <ShowcaseFlowList items={project.showcaseFlows} />
        </div>
      ),
    },
    {
      eyebrow: "Design decisions",
      content: (
        <div>
          <h2 className="mb-6 text-lg font-semibold leading-snug">Complex Workflows. Clear Interactions.</h2>
          <RevealGroup as="ul" className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            {sybotDesignDecisions.map((decision) => (
              <RevealItem as="li" key={decision.title} className="border-t border-border py-5">
                <h3 className="text-lg font-semibold">{decision.title}</h3>
                <p className={`mt-2 max-w-lg ${caseStudyBodyText}`}>{decision.detail}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      ),
    },
    {
      eyebrow: "Outcome",
      content: <p className={`${caseStudyBodyText} max-w-4xl`}>{project.outcome}</p>,
    },
  ]

  const upstageSections = [
    {
      eyebrow: "Overview",
      content: <p className={`${caseStudyBodyText} max-w-4xl`}>{project.overview}</p>,
    },
    {
      eyebrow: "What I designed",
      content: (
        <RevealGroup as="ol" className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
          {upstageProductSteps.map((step, index) => (
            <RevealItem as="li" key={step.title} className="border-b border-border py-6">
              <p className="label-mono text-gold">{formatProjectNumber(index)}</p>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 max-w-md text-base leading-relaxed text-foreground/80">{step.detail}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      ),
    },
    {
      eyebrow: "Project showcase",
      content: (
        <div>
          <figure className="overflow-hidden rounded-2xl border border-white/10 bg-surface">
            <Image
              src={project.cover}
              alt="Upstage marketing homepage introducing its speech preparation product."
              sizes="(min-width: 1280px) 80rem, 100vw"
              placeholder="blur"
              className="h-auto w-full"
            />
          </figure>
          <ShowcaseFlowList items={project.showcaseFlows} />
        </div>
      ),
    },
    {
      eyebrow: "Design decisions",
      content: (
        <RevealGroup as="ul" className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
          {upstageDesignDecisions.map((decision) => (
            <RevealItem as="li" key={decision.title} className="border-t border-border py-5">
              <h3 className="text-lg font-semibold">{decision.title}</h3>
              <p className="mt-2 max-w-lg text-base leading-relaxed text-foreground/80">{decision.detail}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      ),
    },
    {
      eyebrow: "Outcome",
      content: <p className={`${caseStudyBodyText} max-w-4xl`}>{project.outcome}</p>,
    },
  ]

  const sections =
    project.slug === "safartrak"
      ? safartrakSections
      : project.slug === "serq"
      ? serqSections
      : project.slug === "sybot"
      ? sybotSections
      : project.slug === "upstage"
        ? upstageSections
      : [
          {
            eyebrow: "Overview",
            content: <p className={`${caseStudyBodyText} max-w-4xl`}>{project.overview}</p>,
          },
          {
            eyebrow: "What I designed",
            content: <p className={`${caseStudyBodyText} max-w-4xl`}>{project.designSummary}</p>,
          },
          {
            eyebrow: "Project showcase",
            content: (
              <div>
                <figure className="overflow-hidden rounded-2xl border border-white/10 bg-surface">
                  <Image
                    src={project.cover}
                    alt={project.coverAlt}
                    sizes="(min-width: 1280px) 80rem, 100vw"
                    placeholder="blur"
                    className="h-auto w-full"
                  />
                </figure>
                <ShowcaseFlowList items={project.showcaseFlows} />
              </div>
            ),
          },
          {
            eyebrow: "Design decisions",
            content: (
              <RevealGroup as="ul" className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                {safartrakDesignDecisions.map((decision) => (
                  <RevealItem as="li" key={decision.title} className="border-t border-border py-5">
                    <h3 className="text-lg font-semibold">{decision.title}</h3>
                    <p className={`mt-2 max-w-lg ${caseStudyBodyText}`}>{decision.detail}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            ),
          },
          {
            eyebrow: "Outcome",
            content: (
              <div className="space-y-8">
                <p className={`${caseStudyBodyText} max-w-3xl`}>{project.outcome}</p>
                {project.impact.length > 0 ? (
                  <RevealGroup as="ul" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {project.impact.map((stat) => (
                      <RevealItem as="li" key={stat.label} className="rounded-xl border border-gold/25 p-6 sm:p-8">
                        <p className="heading-display text-[clamp(3rem,6vw,4.5rem)] text-gold">{stat.value}</p>
                        <p className={`mt-4 max-w-xs ${caseStudyBodyText}`}>{stat.label}</p>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                ) : null}
              </div>
            ),
          },
        ]

  return (
    <article className="pt-[calc(var(--header-height)+3rem)] sm:pt-[calc(var(--header-height)+4.5rem)]">
      <JsonLd data={caseStudySchema(project)} />

      <Container>
        <nav aria-label="Breadcrumb">
          <ol className="label-mono flex items-center gap-2 text-muted-foreground">
            <li>
              <Link href="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/#work" className="transition-colors hover:text-foreground">
                Work
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="truncate text-foreground">
              {project.title}
            </li>
          </ol>
        </nav>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-start">
          <div>
            <Eyebrow>Case study · {project.category}</Eyebrow>
            <h1 className="heading-display mt-6 text-[clamp(2.25rem,5vw,4.5rem)]">
              <LineReveal
                immediate
                delay={0.1}
                lines={[
                  <span key="title">
                    {lead}
                    {accent === "." ? null : " "}
                    <Accent>{accent}</Accent>
                  </span>,
                ]}
              />
            </h1>
          </div>
          <Reveal delay={0.4} offset={12}>
            <div className="flex flex-col items-start gap-5 lg:pt-14">
              <p className={caseStudyBodyText}>{project.summary}</p>
              {project.externalLink && project.externalLinkLabel ? (
                <a
                  href={project.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.externalLinkLabel} (opens in a new tab)`}
                  className={buttonVariants({ variant: "outline", size: "sm", shape: "pill" })}
                >
                  {project.externalLinkLabel}
                  <ExternalLinkIcon aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </Reveal>
        </div>

        <RevealGroup
          as="ul"
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]"
        >
          {facts.map((fact) => (
            <RevealItem as="li" key={fact.label} className="bg-background p-5">
              <p className="label-mono text-muted-foreground">{fact.label}</p>
              <p className="mt-2 font-semibold">{fact.value}</p>
            </RevealItem>
          ))}
        </RevealGroup>

      </Container>

      <Container size="default" className="mt-24 flex flex-col gap-20 sm:mt-32 sm:gap-28">
        {sections.map((section, index) => (
          <CaseStudyBlock key={section.eyebrow} eyebrow={section.eyebrow} index={formatProjectNumber(index)}>
            {section.content}
          </CaseStudyBlock>
        ))}
      </Container>

      <Container className="mt-28 mb-24 sm:mt-36">
        <nav aria-label="Case study navigation" className="grid grid-cols-2 gap-6 border-t border-border pt-10">
            <Link href={`/work/${previousProject.slug}`} className="group text-left">
              <p className="label-mono text-muted-foreground">Previous case study</p>
              <p className="heading-display mt-3 flex items-center gap-3 text-[clamp(1.25rem,2.5vw,2rem)] transition-colors group-hover:text-gold">
                <ArrowLeftIcon className="size-[0.8em] shrink-0 transition-transform duration-500 ease-out-expo group-hover:-translate-x-1" />
                {previousProject.title}
              </p>
            </Link>
            <Link href={`/work/${nextProject.slug}`} className="group text-right">
              <p className="label-mono text-muted-foreground">Next case study</p>
              <p className="heading-display mt-3 flex items-center justify-end gap-3 text-[clamp(1.25rem,2.5vw,2rem)] transition-colors group-hover:text-gold">
                {nextProject.title}
                <ArrowRightIcon className="size-[0.8em] shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
              </p>
            </Link>
        </nav>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl bg-surface p-8 sm:flex-row sm:items-center sm:p-10">
          <p className="heading-display text-2xl sm:text-3xl">
            Building something <Accent>complex?</Accent>
          </p>
          <Link href={siteConfig.contactHref} className={buttonVariants({ size: "cta", shape: "pill" })}>
            Contact me
          </Link>
        </div>
      </Container>
    </article>
  )
}

function ShowcaseFlowList({ items }: { items: ShowcaseFlow[] }) {
  return (
    <RevealGroup as="ul" className="mt-8 grid grid-cols-1 gap-x-8 sm:grid-cols-2 xl:grid-cols-5">
      {items.map((item) => (
        <RevealItem as="li" key={item.title} className="border-t border-border py-4">
          <h3 className="text-base font-semibold">{item.title}</h3>
          <p className="mt-1 text-base text-foreground/75">{item.detail}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  )
}

function CaseStudyBlock({ eyebrow, index, children }: { eyebrow: string; index: string; children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-12">
      <div className="flex items-baseline gap-3 lg:flex-col lg:gap-2">
        <span className="label-mono text-muted-foreground">{index}</span>
        <Eyebrow>
          <span>{eyebrow}</span>
        </Eyebrow>
      </div>
      <Reveal offset={16}>{children}</Reveal>
    </section>
  )
}
