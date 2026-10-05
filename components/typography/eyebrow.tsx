import { cn } from "@/lib/utils"

/** "— HOW I THINK" style section label. */
export function Eyebrow({ className, children, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("flex items-center gap-2 text-[0.8125rem] font-medium tracking-[0.04em] text-gold uppercase", className)}
      {...props}
    >
      <span aria-hidden className="h-px w-4 bg-current" />
      {children}
    </p>
  )
}
