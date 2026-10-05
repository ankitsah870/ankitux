"use client"

import { motion, type Variants } from "motion/react"

import { EASE_OUT_EXPO } from "@/lib/motion"
import { cn } from "@/lib/utils"

const containerVariants: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.09, delayChildren: delay },
  }),
}

const lineVariants: Variants = {
  hidden: { y: "105%" },
  visible: { y: "0%", transition: { duration: 1, ease: EASE_OUT_EXPO } },
}

type LineRevealProps = {
  lines: React.ReactNode[]
  className?: string
  lineClassName?: string
  delay?: number
  /** Animate on mount instead of when scrolled into view (above-the-fold copy). */
  immediate?: boolean
}

/**
 * Reveals each line of a headline from behind a mask. Lines stay real text
 * nodes inside the parent heading, so the copy is read and indexed normally.
 */
export function LineReveal({ lines, className, lineClassName, delay = 0, immediate = false }: LineRevealProps) {
  const trigger = immediate
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: { once: true, margin: "0px 0px -10% 0px" } }

  return (
    <motion.span
      className={cn("block", className)}
      initial="hidden"
      variants={containerVariants}
      custom={delay}
      {...trigger}
    >
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
          <motion.span className={cn("block will-change-transform", lineClassName)} variants={lineVariants}>
            {line}
            {index < lines.length - 1 ? " " : null}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
