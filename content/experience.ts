export type ExperienceHighlight = {
  index: number
  /** Shown when the panel is expanded. */
  title: string
  text: string
}

export const experienceSummary =
  "4+ years across product design, UI/UX, and digital experiences — working across different products, industries, and levels of complexity."

export const experienceHighlights: ExperienceHighlight[] = [
  { index: 1, title: "Product design", text: "From early flows to polished interfaces." },
  { index: 2, title: "SaaS & dashboards", text: "Dashboards, SaaS platforms, AI tools, and operational workflows." },
  { index: 3, title: "Design systems", text: "Reusable patterns that keep products consistent as they grow." },
  { index: 4, title: "Collaboration", text: "Design with users, business goals, and development realities in mind." },
]
