import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const containerVariants = cva("mx-auto w-full px-5 sm:px-8", {
  variants: {
    size: {
      narrow: "max-w-[68rem]",
      default: "max-w-[80rem]",
      wide: "max-w-[90rem]",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

type ContainerProps = React.ComponentProps<"div"> & VariantProps<typeof containerVariants>

export function Container({ className, size, ...props }: ContainerProps) {
  return <div className={cn(containerVariants({ size }), className)} {...props} />
}
