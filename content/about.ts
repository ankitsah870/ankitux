export const aboutIntro =
  "I’m Ankit Sah, a UI/UX and product designer at Codersbay Technology. My work spans eight domains: fintech, mobility and logistics, IoT and telematics, AI and SaaS, HR tech, consumer services, visual discovery, and agency websites. Across projects like SafarTrak and SerQ, the context changes. The work stays the same: understand the system, find where it breaks down, and make the experience deliberate."

export type Principle = {
  index: string
  question: string
  prompt: string
  /** The final step is the outcome, not a question — it renders differently. */
  isOutcome?: boolean
}

export const principles: Principle[] = [
  { index: "01", question: "What?", prompt: "What is the business trying to achieve?" },
  { index: "02", question: "Where?", prompt: "Where do users struggle?" },
  { index: "03", question: "Why?", prompt: "Why cannot be changed?" },
  { index: "04", question: "Then, how.", prompt: "Only now does the interface get drawn.", isOutcome: true },
]

export const tooling = [
  "Figma",
  "Framer",
  "Webflow",
  "Spline",
  "Wix Studio",
  "Adobe Photoshop",
  "WordPress",
  "Adobe Illustrator",
] as const

export const disciplines = [
  "Product Design",
  "UX Research",
  "Design Systems",
  "Dashboards",
  "Web Design",
  "Prototyping",
  "Brand & Print",
] as const
