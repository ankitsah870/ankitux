import { cn } from "@/lib/utils"

/** Gold highlight used for the closing word of every headline. */
export function Accent({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("text-gold", className)} {...props} />
}
