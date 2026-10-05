import { useId } from "react"

import { LogoSvg } from "@/components/brand/logo-svg"
import { cn } from "@/lib/utils"

type LogoMarkProps = Omit<React.ComponentProps<"svg">, "viewBox"> & {
  title?: string
}

export function LogoMark({ className, title, ...props }: LogoMarkProps) {
  const idPrefix = useId()

  return (
    <LogoSvg
      idPrefix={idPrefix}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn("h-7 w-auto", className)}
      {...props}
    />
  )
}
