"use client"

import { useActionState, useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { siteConfig } from "@/config/site"
import { budgetOptions, scopeOptions } from "@/content/project-brief"
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
  const [attempt, setAttempt] = useState(0)

  return (
    <div className={cn("relative overflow-hidden rounded-3xl bg-surface p-6 sm:p-8", className)}>
      <BriefForm key={attempt} onReset={() => setAttempt((count) => count + 1)} />
    </div>
  )
}

function BriefForm({ onReset }: { onReset: () => void }) {
  const [state, formAction, isPending] = useActionState(sendProjectBrief, initialState)

  const values = state.status === "invalid" || state.status === "error" ? state.values : undefined
  const errors = state.status === "invalid" ? state.errors : {}

  useEffect(() => {
    if (state.status === "error") toast.error(state.message)
  }, [state])

  const fieldProps = (field: ProjectBriefField) => ({
    id: `brief-${field}`,
    name: field,
    defaultValue: values?.[field] ?? "",
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `brief-${field}-error` : undefined,
  })

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state.status === "sent" ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="flex min-h-[30rem] flex-col items-start justify-center gap-6"
          role="status"
        >
          <svg viewBox="0 0 64 64" className="size-16 text-gold" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <motion.circle
              cx="32"
              cy="32"
              r="30"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
            />
            <motion.path
              d="M20 33l8 8 16-17"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.6, ease: EASE_OUT_EXPO }}
            />
          </svg>
          <div>
            <h3 className="heading-display text-3xl">Brief received.</h3>
            <p className="mt-3 max-w-sm text-foreground/75">{siteConfig.replyTime}</p>
          </div>
          <Button variant="outline" size="cta" shape="pill" onClick={onReset}>
            Send another
          </Button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          action={formAction}
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -8 }}
          aria-labelledby="project-brief-title"
        >
          <h3 id="project-brief-title" className="text-lg font-semibold text-gold">
            Project Brief
          </h3>

          <FieldGroup className="mt-8 gap-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
              <Field data-invalid={Boolean(errors.name) || undefined}>
                <FieldLabel htmlFor="brief-name" className={labelClassName}>
                  Your name
                </FieldLabel>
                <Input {...fieldProps("name")} autoComplete="name" placeholder="Jane Doe" className={controlClassName} />
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

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
              <Field data-invalid={Boolean(errors.scope) || undefined}>
                <FieldLabel htmlFor="brief-scope" className={labelClassName}>
                  Scope
                </FieldLabel>
                {/* Keyed so React's post-action form reset restores the submitted choice. */}
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
                  Budget
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

            <Field data-invalid={Boolean(errors.message) || undefined}>
              <FieldLabel htmlFor="brief-message" className={labelClassName}>
                About the project
              </FieldLabel>
              <Textarea
                {...fieldProps("message")}
                rows={5}
                placeholder="Context, goals, timeline, what great looks like…"
                className={cn(controlClassName, "min-h-32 resize-y py-3")}
              />
              <FieldError id="brief-message-error">{errors.message}</FieldError>
            </Field>

            <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
              <label htmlFor={HONEYPOT_FIELD}>Website</label>
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
      )}
    </AnimatePresence>
  )
}
