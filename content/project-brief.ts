export const scopeOptions = [
  "Product design (UI/UX)",
  "Dashboard / admin system",
  "Website or landing page",
  "Mobile app",
  "Design system",
  "Brand & marketing",
  "Not sure yet",
] as const

export const budgetOptions = [
  "Under $2k",
  "$2k – $5k",
  "$5k – $10k",
  "$10k+",
  "Let's discuss",
] as const

export type Scope = (typeof scopeOptions)[number]
export type Budget = (typeof budgetOptions)[number]
