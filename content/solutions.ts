export type SolutionGlyph = "funnel" | "realtime" | "workflow" | "conversion"

export type Solution = {
  index: number
  title: string
  glyph: SolutionGlyph
}

export const solutionsSummary =
  "Each project starts with a problem worth solving — balancing users, business, and constraints."

export const solutions: Solution[] = [
  { index: 1, title: "Reducing friction in onboarding and booking flows", glyph: "funnel" },
  { index: 2, title: "Designing systems for real-time operations", glyph: "realtime" },
  { index: 3, title: "Simplifying complex workflows", glyph: "workflow" },
  { index: 4, title: "Improving conversion without compromising usability", glyph: "conversion" },
]
