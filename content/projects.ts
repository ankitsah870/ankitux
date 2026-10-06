import type { StaticImageData } from "next/image"

import safartrakCover from "@/assets/images/work/safartrak.jpg"
import serqCover from "@/assets/images/work/serq.jpg"
import sybotCover from "@/assets/images/work/sybot.jpg"
import upstageCover from "@/assets/images/work/upstage.jpg"

/**
 * Case studies shown in "Selected work" and at /work/[slug].
 *
 * Tags and card summaries come from the design; overview, scope, role and
 * results come from Ankit's CV. Upstage isn't in the CV yet, so it only has
 * an overview. Cover files live in `assets/images/work/<slug>.jpg` (the OG
 * images read them by slug).
 */

export type ImpactStat = {
  value: string
  label: string
}

export type ShowcaseFlow = {
  title: string
  detail: string
}

export type Project = {
  slug: string
  title: string
  /** Pill label on the work card, e.g. "Track · Monitor". */
  tag: string
  /** One line on the work card. */
  summary: string
  category: string
  platform: string
  industry: string
  projectType?: string
  externalLink?: string
  externalLinkLabel?: string
  scope?: string
  role?: string
  company?: string
  year?: string
  overview: string
  /** Narrative summary of the design work for the case study. */
  designSummary: string
  /** Narrative description of the project outcome. */
  outcome: string
  /** What Ankit designed on the project. */
  contributions: string[]
  showcaseFlows: ShowcaseFlow[]
  impact: ImpactStat[]
  cover: StaticImageData
  coverAlt: string
  updatedAt: string
}

export const projects: Project[] = [
  {
    slug: "safartrak",
    title: "SafarTrak",
    tag: "Track · Monitor",
    summary: "A fleet dashboard and marketing website for vehicle tracking, operations, maintenance, and account management.",
    category: "IoT Tracking & Monitoring Platform",
    platform: "Web · Responsive",
    industry: "IoT · Fleet Management · Telematics",
    role: "UI/UX & Brand Designer",
    company: "Codersbay Technology",
    year: "2026",
    externalLink: "https://www.safartrak.com/",
    externalLinkLabel: "Visit live site",
    overview:
      "SafarTrak is an IoT fleet management platform for vehicle tracking, monitoring, and daily operations. I designed its operational dashboard and workflows to bring vehicle, driver, and device information into a clear, connected experience for fleet teams.",
    designSummary:
      "I designed the fleet dashboard, vehicle and user workflows, remote controls, maintenance and support experiences, plus the public marketing website and visual identity.",
    outcome:
      "SafarTrak connects its marketing experience with the dashboard used to manage vehicles, monitor activity, control operations, schedule maintenance, support users, and manage products. The interface organizes these workflows to help teams understand fleet activity and act on it with clarity.",
    contributions: [
      "Fleet management interfaces",
      "Vehicle and device monitoring",
      "Data-heavy operational dashboards",
      "Tracking and monitoring workflows",
      "Information visualization",
      "Responsive product interfaces",
      "Marketing / landing website",
      "Visual identity and brand guidelines",
    ],
    showcaseFlows: [
      { title: "Fleet Dashboard", detail: "Vehicles, drivers & operations" },
      { title: "Vehicle Intelligence", detail: "Status, tracking & maintenance" },
      { title: "Remote Control", detail: "Commands & execution feedback" },
      { title: "Support & Billing", detail: "Users, tickets & subscriptions" },
      { title: "Marketing Website", detail: "Product, hardware & industries" },
    ],
    impact: [],
    cover: safartrakCover,
    coverAlt: "SafarTrak website hero — “AI Fleet Intelligence for Modern Operations” over a truck on a mountain road",
    updatedAt: "2026-10-04",
  },
  {
    slug: "upstage",
    title: "Upstage",
    tag: "Design · Product",
    summary:
      "A speech preparation product for creating and refining speeches, practicing delivery, and managing saved work.",
    category: "Presentation coaching product",
    platform: "Web App · Responsive",
    industry: "Communication",
    projectType: "Client Project",
    scope: "Product · Website",
    role: "UI/UX Designer",
    year: "2026",
    overview:
      "Upstage brings speech creation, AI-assisted refinement, practice, and speech management into one workspace, supported by a marketing website that introduces the product and its philosophy. Users can shape a speech, refine its sections, keep their work organized, and prepare for delivery within the same connected experience.",
    designSummary:
      "I designed Upstage's product experience across speech creation, audience setup, generated speech editing, speech history, practice, and supporting product states. I also worked across the marketing website, shaping the experience from the first product introduction through to the logged-in workspace.",
    outcome:
      "The design brings speech creation, refinement, practice, and history into one connected experience. Users can move from developing an initial idea through editing and preparation, then return to their saved work. The marketing website extends the same product story outward, creating a consistent journey from discovering Upstage to using the product.",
    contributions: [],
    showcaseFlows: [
      { title: "About", detail: "Product philosophy" },
      { title: "How It Works", detail: "Product methodology" },
      { title: "Pricing", detail: "Plans and pricing" },
      { title: "Blog", detail: "Educational content" },
      { title: "Blog Detail", detail: "Article content" },
      { title: "Contact", detail: "Contact Upstage" },
      { title: "Login", detail: "Enter the product workspace" },
    ],
    impact: [],
    cover: upstageCover,
    coverAlt: "Upstage landing page — “Speak with confidence, even if you’ve never been on stage” with a calm score card",
    updatedAt: "2026-10-04",
  },
  {
    slug: "sybot",
    title: "SYBOT",
    tag: "Automate · Analyze",
    summary: "An AI sales workspace for configuring agents and campaigns, managing leads, and coordinating follow-ups.",
    category: "AI Sales Automation Platform",
    platform: "Web · SaaS",
    industry: "AI · Sales Automation",
    role: "Product Designer",
    company: "US-based Client · Freelance",
    year: "2023",
    externalLink: "https://www.behance.net/ankitsah9",
    externalLinkLabel: "View on Behance",
    overview:
      "SYBOT connects AI agents, campaigns, CRM, lead management, and follow-ups in one workspace. The sales journey moves from configuring an agent and launching a campaign to managing incoming leads, tracking customer interactions, and distributing leads to sales representatives.",
    designSummary:
      "I designed AI agent setup, campaign management, CRM and lead management, interaction history, and lead distribution.",
    outcome:
      "SYBOT brings AI agents, campaigns, leads, interactions, and follow-ups into one connected experience. Teams can move from campaign setup into lead management, review activity across calls and messages, and organize follow-up and distribution within the same sales workspace.",
    contributions: [
      "AI Agent Setup — Configure AI agents and their voice",
      "Campaign Management — Create and configure sales campaigns",
      "CRM & Lead Management — Manage leads, contacts, status, and assignments",
      "Interaction History — Track calls, messages, emails, and notes",
      "Lead Distribution — Automate or manually distribute leads",
    ],
    showcaseFlows: [
      { title: "Onboarding", detail: "Guided workspace setup" },
      { title: "CRM", detail: "Lead and contact management" },
      { title: "Interactions", detail: "Calls, messages, emails & notes" },
      { title: "Follow-ups", detail: "Activity connected to each lead" },
      { title: "Lead Distribution", detail: "Automatic or manual assignment" },
    ],
    impact: [],
    cover: sybotCover,
    coverAlt: "SYBOT dashboard — KPI cards, AI agent and campaign tables, and an AI performance chart",
    updatedAt: "2026-10-04",
  },
  {
    slug: "serq",
    title: "SerQ",
    tag: "Discover · Book",
    summary: "A mobile marketplace for discovering services, booking and paying, tracking progress, and getting support.",
    category: "Mobile Service Marketplace",
    platform: "Mobile",
    industry: "Service Marketplace",
    role: "UI/UX Designer",
    company: "CodeQuery",
    year: "2024–2025",
    externalLink: "https://www.behance.net/ankitsah9",
    externalLinkLabel: "View on Behance",
    overview:
      "SerQ brings service discovery, booking, payments, and support into one mobile experience. Customers can explore service categories and details, choose a location and schedule, and move through checkout. Separate provider workflows support service and booking management across the marketplace.",
    designSummary: "I designed the complete customer experience across onboarding, service discovery, booking, checkout, booking management, support, and profile flows.",
    outcome:
      "The mobile experience connects customers to service providers across the full journey. Customers can discover categories and service details, choose a location and schedule, complete checkout, and follow booking progress. Booking history, invoices, alerts, profile, and support extend the experience after a booking.",
    contributions: [
      "Onboarding & Authentication — Getting users into the platform quickly",
      "Service Discovery — Categories, services, recommendations, and service details",
      "Booking & Checkout — Service selection, location, date, time, and payment",
      "Booking Management — Ongoing, completed, cancelled, and expired bookings",
      "Support & Profile — Alerts, tickets, payments, locations, and account management",
    ],
    showcaseFlows: [
      { title: "Discover", detail: "Services & categories" },
      { title: "Book", detail: "Service, location & schedule" },
      { title: "Pay", detail: "Checkout & payment" },
      { title: "Track", detail: "Booking progress & alerts" },
      { title: "Manage", detail: "History, invoices & support" },
    ],
    impact: [],
    cover: serqCover,
    coverAlt: "SerQ mobile app screen collage showing service discovery, service categories, location selection, and booking tracking.",
    updatedAt: "2026-10-04",
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export function getAdjacentProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug)
  return projects[(index + 1) % projects.length]
}

export function getPreviousProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug)
  return projects[(index - 1 + projects.length) % projects.length]
}

export function formatProjectNumber(index: number) {
  return String(index + 1).padStart(2, "0")
}
