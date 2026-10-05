"use client"

import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/* Both paths share the same command structure so `d` can morph between them. */
const WAVE_A =
  "M0 0 H300 V168 C 268 168, 262 196, 214 196 C 160 196, 156 228, 96 232 C 56 235, 22 236, 0 240 Z"
const WAVE_B =
  "M0 0 H300 V184 C 262 180, 250 214, 200 210 C 148 206, 146 240, 88 244 C 50 247, 20 246, 0 252 Z"

/**
 * Molten light rising under a slowly breathing dark wave —
 * the artwork of the expanded experience card.
 */
export function EmberWave({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <motion.div
        className="absolute inset-x-[-10%] bottom-0 h-[60%] bg-[radial-gradient(75%_95%_at_66%_105%,var(--brand-flame)_0%,var(--brand-ember)_30%,var(--brand-rust)_62%,oklch(0.2_0.06_30)_100%)]"
        animate={prefersReducedMotion ? undefined : { x: ["-4%", "4%", "-4%"], scale: [1, 1.06, 1] }}
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
      />
      <div className="bg-grain absolute inset-0 opacity-20 mix-blend-overlay" />
      <svg viewBox="0 0 300 300" preserveAspectRatio="none" className="absolute inset-0 size-full">
        <motion.path
          className="fill-surface"
          initial={{ d: WAVE_A }}
          animate={prefersReducedMotion ? undefined : { d: [WAVE_A, WAVE_B, WAVE_A] }}
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
        />
      </svg>
    </div>
  )
}
