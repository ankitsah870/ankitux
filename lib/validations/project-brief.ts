import { budgetOptions, scopeOptions, type Budget, type Scope } from "@/content/project-brief"

export type ProjectBrief = {
  name: string
  email: string
  scope: Scope
  budget: Budget
  message: string
}

export type ProjectBriefField = keyof ProjectBrief
export type ProjectBriefValues = Record<ProjectBriefField, string>
export type ProjectBriefErrors = Partial<Record<ProjectBriefField, string>>

/** Hidden field real visitors never fill in — bots usually do. */
export const HONEYPOT_FIELD = "website"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function readField(formData: FormData, field: ProjectBriefField) {
  const value = formData.get(field)
  return typeof value === "string" ? value.trim() : ""
}

export function readProjectBrief(formData: FormData): ProjectBriefValues {
  return {
    name: readField(formData, "name"),
    email: readField(formData, "email"),
    scope: readField(formData, "scope"),
    budget: readField(formData, "budget"),
    message: readField(formData, "message"),
  }
}

export function validateProjectBrief(
  values: ProjectBriefValues,
): { success: true; data: ProjectBrief } | { success: false; errors: ProjectBriefErrors } {
  const errors: ProjectBriefErrors = {}

  if (values.name.length < 2) errors.name = "Tell me who you are."
  else if (values.name.length > 80) errors.name = "Keep it under 80 characters."

  if (!EMAIL_PATTERN.test(values.email)) errors.email = "Enter a valid email so I can reply."

  if (!scopeOptions.includes(values.scope as Scope)) errors.scope = "Pick the closest scope."
  if (!budgetOptions.includes(values.budget as Budget)) errors.budget = "Pick a budget range."

  if (values.message.length < 20) errors.message = "A few sentences of context help — at least 20 characters."
  else if (values.message.length > 4000) errors.message = "Keep it under 4,000 characters."

  if (Object.keys(errors).length > 0) return { success: false, errors }

  return { success: true, data: values as ProjectBrief }
}
