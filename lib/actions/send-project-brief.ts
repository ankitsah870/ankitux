"use server"

import {
  HONEYPOT_FIELD,
  readProjectBrief,
  validateProjectBrief,
  type ProjectBriefErrors,
  type ProjectBriefValues,
} from "@/lib/validations/project-brief"

export type ProjectBriefState =
  | { status: "idle" }
  | { status: "invalid"; errors: ProjectBriefErrors; values: ProjectBriefValues }
  | { status: "error"; message: string; values: ProjectBriefValues }
  | { status: "sent" }

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqbrwgg"

/** Delivers the brief through Formspree's configured notification workflow. */
export async function sendProjectBrief(
  _previousState: ProjectBriefState,
  formData: FormData,
): Promise<ProjectBriefState> {
  if (formData.get(HONEYPOT_FIELD)) return { status: "sent" }

  const values = readProjectBrief(formData)
  const result = validateProjectBrief(values)
  if (!result.success) return { status: "invalid", errors: result.errors, values }

  const brief = result.data

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new URLSearchParams({
        name: brief.name,
        email: brief.email,
        inquiry_type: brief.inquiryType,
        ...(brief.scope ? { scope: brief.scope } : {}),
        ...(brief.budgetCurrency ? { budget_currency: brief.budgetCurrency } : {}),
        ...(brief.budget ? { budget: brief.budget } : {}),
        message: brief.message,
        _gotcha: "",
        _subject: `${brief.inquiryType} from ${brief.name}`,
      }),
    })

    if (!response.ok) {
      console.error("[project-brief] Formspree responded with", response.status, await response.text())
      return { status: "error", message: "Couldn’t send that just now. Please try again or email me directly.", values }
    }

    return { status: "sent" }
  } catch (error) {
    console.error("[project-brief] Failed to reach Formspree", error)
    return { status: "error", message: "Couldn’t send that just now. Please try again or email me directly.", values }
  }
}
