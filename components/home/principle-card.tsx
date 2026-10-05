"use client"

import { motion } from "motion/react"

import type { Principle } from "@/content/about"
import { EASE_OUT_EXPO } from "@/lib/motion"
import { cn } from "@/lib/utils"

const checkDraw = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1, transition: { delay: 0.5, duration: 0.6, ease: EASE_OUT_EXPO } },
}

export function PrincipleCard({ principle }: { principle: Principle }) {
  const { index, question, prompt, isOutcome } = principle

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
        hover: { y: -4, transition: { duration: 0.4, ease: EASE_OUT_EXPO } },
      }}
      className={cn(
        "group relative flex min-h-36 gap-4 rounded-xl p-6 transition-colors duration-500",
        isOutcome
          ? "border border-dashed border-gold/35 bg-transparent hover:border-gold/70"
          : "bg-surface hover:bg-surface-raised",
      )}
    >
      <span className="text-xl leading-tight font-normal text-gold tabular-nums">{index}</span>
      <div className="flex-1">
        <h3 className="text-xl leading-tight font-semibold">{question}</h3>
        <p className="mt-1.5 max-w-[14rem] text-[0.9375rem] leading-snug text-foreground/75">{prompt}</p>
      </div>
      <span
        aria-hidden
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-500",
          isOutcome ? "border-gold/50 text-gold" : "border-white/25 text-foreground group-hover:border-gold group-hover:text-gold",
        )}
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isOutcome ? (
            <motion.path d="M5 12h14M13 6l6 6-6 6" variants={checkDraw} />
          ) : (
            <motion.path d="M5 12.5l4.5 4.5L19 7.5" variants={checkDraw} />
          )}
        </svg>
      </span>
    </motion.article>
  )
}
