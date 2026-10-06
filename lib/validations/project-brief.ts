import { budgetOptions, inquiryTypes, scopeOptions, type Budget, type InquiryType, type Scope } from "@/content/project-brief"

export type ProjectBrief = {
  name: string
  email: string
  inquiryType: InquiryType
  scope?: Scope
  budget?: Budget
  message: string
}

export type ProjectBriefField = keyof ProjectBrief
export type ProjectBriefValues = Record<ProjectBriefField, string>
export type ProjectBriefErrors = Partial<Record<ProjectBriefField, string>>

/** Hidden field real visitors never fill in — bots usually do. */
export const HONEYPOT_FIELD = "_gotcha"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function readField(formData: FormData, field: ProjectBriefField) {
  const value = formData.get(field)
  return typeof value === "string" ? value.trim() : ""
}

export function readProjectBrief(formData: FormData): ProjectBriefValues {
  return {
    name: readField(formData, "name"),
    email: readField(formData, "email"),
    inquiryType: readField(formData, "inquiryType"),
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

  if (!inquiryTypes.includes(values.inquiryType as InquiryType)) errors.inquiryType = "Choose what you’re contacting me about."

  if (values.inquiryType === "Freelance project") {
    if (!scopeOptions.includes(values.scope as Scope)) errors.scope = "Pick the closest scope."
    if (!budgetOptions.includes(values.budget as Budget)) errors.budget = "Pick a budget range."
  }

  const words = values.message.split(/\s+/).filter(Boolean)
  if (values.message.length < 35 || words.length < 5) errors.message = "Please add a little more context (at least 5 words)."
  else if (values.message.length > 2000) errors.message = "Keep it under 2,000 characters."
  else if (/\b(\w+)(?:\s+\1){2,}\b/i.test(values.message) || /(.)\1{9,}/u.test(values.message)) {
    errors.message = "Please enter a message with a little more detail."
  } else if ((values.message.match(/https?:\/\//gi) ?? []).length > 2) {
    errors.message = "Please limit your message to two links."
  }

  if (Object.keys(errors).length > 0) return { success: false, errors }

  return { success: true, data: values as ProjectBrief }
}
