export const scopeOptions = [
  "Product design (UI/UX)",
  "Dashboard / admin system",
  "Website or landing page",
  "Mobile app",
  "Design system",
  "Brand & marketing",
  "Not sure yet",
] as const

export const inquiryTypes = [
  "Freelance project",
  "Full-time opportunity",
  "Contract opportunity",
  "General question",
] as const

export const budgetCurrencyOptions = ["USD", "INR"] as const

export const budgetOptionsByCurrency = {
  USD: ["Under $2k", "$2k – $5k", "$5k – $10k", "$10k+", "Let's discuss"],
  INR: ["Under ₹1 lakh", "₹1 – ₹3 lakh", "₹3 – ₹5 lakh", "₹5 lakh+", "Let's discuss"],
} as const

export type Scope = (typeof scopeOptions)[number]
export type BudgetCurrency = (typeof budgetCurrencyOptions)[number]
export type Budget = (typeof budgetOptionsByCurrency)[BudgetCurrency][number]
export type InquiryType = (typeof inquiryTypes)[number]
