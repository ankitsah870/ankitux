"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "motion/react"

import { SolutionGlyph } from "@/components/illustrations/solution-glyph"
import type { Solution } from "@/content/solutions"
import { useMediaQuery } from "@/hooks/use-media-query"
import { EASE_OUT_EXPO } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * The glyph shows the problem at rest and the solved state on hover.
 * On touch screens it resolves as the card crosses the middle of the viewport.
 */
export function SolutionCard({ solution, order }: { solution: Solution; order: number }) {
  const ref = useRef<HTMLElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)")
  const isCentered = useInView(ref, { margin: "-40% 0px -40% 0px" })
  const isActive = isHovered || (!canHover && isCentered)

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: order * 0.08 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "relative flex min-h-48 flex-col justify-between gap-8 overflow-hidden rounded-2xl p-7 transition-colors duration-500 sm:p-8",
        isActive ? "bg-surface-raised" : "bg-surface",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={cn(
            "heading-display text-4xl tabular-nums transition-colors duration-500",
            isActive ? "text-gold" : "text-white/20",
          )}
        >
          {solution.index}
        </span>
        <SolutionGlyph kind={solution.glyph} isActive={isActive} />
      </div>
      <h3 className="max-w-[15rem] text-[1.0625rem] leading-tight font-semibold">{solution.title}</h3>
    </motion.article>
  )
}
