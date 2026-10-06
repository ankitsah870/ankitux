"use client"

import { useActionState, useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { siteConfig } from "@/config/site"
import { budgetOptions, inquiryTypes, scopeOptions } from "@/content/project-brief"
import { sendProjectBrief, type ProjectBriefState } from "@/lib/actions/send-project-brief"
import { EASE_OUT_EXPO } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { HONEYPOT_FIELD, type ProjectBriefField } from "@/lib/validations/project-brief"

const initialState: ProjectBriefState = { status: "idle" }

const controlClassName = "h-11 rounded-md border-white/10 bg-black/40 px-3.5 text-[0.9375rem] dark:bg-black/40"
const selectClassName =
  "w-full [&_select]:h-11 [&_select]:rounded-md [&_select]:border-white/10 [&_select]:bg-black/40 [&_select]:px-3.5 [&_select]:text-[0.9375rem] dark:[&_select]:bg-black/40"
const labelClassName = "text-[0.8125rem] font-medium tracking-[0.03em] uppercase"

export function ProjectBriefForm({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-3xl bg-surface p-6 sm:p-8", className)}>
      <BriefForm />
    </div>
  )
}

function BriefForm() {
  const [state, formAction, isPending] = useActionState(sendProjectBrief, initialState)
  const [showSuccess, setShowSuccess] = useState(false)
  const [inquiryType, setInquiryType] = useState("")

  const values = state.status === "invalid" || state.status === "error" ? state.values : undefined
  const errors = state.status === "invalid" ? state.errors : {}
  const selectedInquiry = inquiryType || values?.inquiryType || ""

  useEffect(() => {
    if (state.status === "error") toast.error(state.message)
    if (state.status === "invalid" || state.status === "error") {
      setInquiryType(state.values.inquiryType)
    }
    if (state.status !== "sent") return

    setInquiryType("")
    setShowSuccess(true)
    const timeout = window.setTimeout(() => setShowSuccess(false), 4500)
    return () => window.clearTimeout(timeout)
  }, [state])

  const fieldProps = (field: ProjectBriefField) => ({
    id: `brief-${field}`,
    name: field,
    defaultValue: values?.[field] ?? "",
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `brief-${field}-error` : undefined,
  })

  return (
    <>
      <motion.form
          action={formAction}
          noValidate
          autoComplete="on"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          aria-labelledby="project-brief-title"
        >
          <h3 id="project-brief-title" className="text-lg font-semibold text-gold">
            Get in touch
          </h3>

          <FieldGroup className="mt-8 gap-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
              <Field data-invalid={Boolean(errors.name) || undefined}>
                <FieldLabel htmlFor="brief-name" className={labelClassName}>
                  Your name
                </FieldLabel>
                <Input
                  {...fieldProps("name")}
                  type="text"
                  autoComplete="name"
                  autoCapitalize="words"
                  placeholder="Jane Doe"
                  className={controlClassName}
                />
                <FieldError id="brief-name-error">{errors.name}</FieldError>
              </Field>
              <Field data-invalid={Boolean(errors.email) || undefined}>
                <FieldLabel htmlFor="brief-email" className={labelClassName}>
                  Email
                </FieldLabel>
                <Input
                  {...fieldProps("email")}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  className={controlClassName}
                />
                <FieldError id="brief-email-error">{errors.email}</FieldError>
              </Field>
            </div>

            <Field data-invalid={Boolean(errors.inquiryType) || undefined}>
              <FieldLabel htmlFor="brief-inquiryType" className={labelClassName}>
                I’m reaching out about
              </FieldLabel>
              <NativeSelect
                id="brief-inquiryType"
                name="inquiryType"
                value={selectedInquiry}
                onChange={(event) => setInquiryType(event.target.value)}
                aria-invalid={errors.inquiryType ? true : undefined}
                aria-describedby={errors.inquiryType ? "brief-inquiryType-error" : undefined}
                className={selectClassName}
              >
                <NativeSelectOption value="" disabled>
                  Select an inquiry type
                </NativeSelectOption>
                {inquiryTypes.map((option) => (
                  <NativeSelectOption key={option} value={option}>
                    {option}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              <FieldError id="brief-inquiryType-error">{errors.inquiryType}</FieldError>
            </Field>

            {selectedInquiry === "Freelance project" ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
                <Field data-invalid={Boolean(errors.scope) || undefined}>
                  <FieldLabel htmlFor="brief-scope" className={labelClassName}>
                    Project scope
                  </FieldLabel>
                  <NativeSelect key={values?.scope} {...fieldProps("scope")} className={selectClassName}>
                    <NativeSelectOption value="" disabled>
                      What do you need?
                    </NativeSelectOption>
                    {scopeOptions.map((option) => (
                      <NativeSelectOption key={option} value={option}>
                        {option}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <FieldError id="brief-scope-error">{errors.scope}</FieldError>
                </Field>
                <Field data-invalid={Boolean(errors.budget) || undefined}>
                  <FieldLabel htmlFor="brief-budget" className={labelClassName}>
                    Project budget
                  </FieldLabel>
                  <NativeSelect key={values?.budget} {...fieldProps("budget")} className={selectClassName}>
                    <NativeSelectOption value="" disabled>
                      Estimated budget
                    </NativeSelectOption>
                    {budgetOptions.map((option) => (
                      <NativeSelectOption key={option} value={option}>
                        {option}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <FieldError id="brief-budget-error">{errors.budget}</FieldError>
                </Field>
              </div>
            ) : null}

            <Field data-invalid={Boolean(errors.message) || undefined}>
              <FieldLabel htmlFor="brief-message" className={labelClassName}>
                {selectedInquiry === "Freelance project" ? "About the project" : "Your message"}
              </FieldLabel>
              <Textarea
                {...fieldProps("message")}
                rows={5}
                placeholder="Share a little context about the project or opportunity…"
                className={cn(controlClassName, "min-h-32 resize-y py-3")}
              />
              <FieldError id="brief-message-error">{errors.message}</FieldError>
            </Field>

            <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
              <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
              <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
            </div>
          </FieldGroup>

          <div className="mt-10 flex flex-col items-start gap-4">
            <Button type="submit" size="cta" shape="pill" disabled={isPending} className="min-w-40">
              {isPending ? <Spinner /> : null}
              {isPending ? "Sending" : "Contact me"}
            </Button>
            <p className="text-sm text-muted-foreground">{siteConfig.replyTime}</p>
          </div>
      </motion.form>
      <AnimatePresence initial={false}>
        {showSuccess ? (
          <motion.div
            key="brief-success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
            className="mt-5 flex items-center gap-2.5 rounded-xl border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-gold"
            role="status"
          >
            <Check aria-hidden className="size-4 shrink-0" />
            <span>Message sent! I’ll reply within 24 hours.</span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
