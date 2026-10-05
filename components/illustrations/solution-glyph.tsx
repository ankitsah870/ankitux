"use client"

import { motion } from "motion/react"

import type { SolutionGlyph as SolutionGlyphKind } from "@/content/solutions"
import { EASE_OUT_EXPO, SPRING_SOFT } from "@/lib/motion"
import { cn } from "@/lib/utils"

type GlyphProps = { isActive: boolean }

/** Funnel bars: steep drop-off at rest, retained users once solved. */
function FunnelGlyph({ isActive }: GlyphProps) {
  const leaking = [40, 28, 18, 11, 6]
  const retained = [40, 36, 33, 31, 29]

  return (
    <>
      {leaking.map((height, index) => {
        const target = isActive ? retained[index] : height
        return (
          <motion.rect
            key={index}
            x={4 + index * 14}
            width="9"
            rx="1.5"
            initial={false}
            animate={{ height: target, y: 44 - target }}
            transition={{ ...SPRING_SOFT, delay: index * 0.05 }}
            className={cn("transition-colors duration-500", isActive ? "fill-ember" : "fill-white/15")}
          />
        )
      })}
    </>
  )
}

/** Live grid: cells tick like incoming events when active. */
function RealtimeGlyph({ isActive }: GlyphProps) {
  return (
    <>
      {Array.from({ length: 12 }, (_, index) => {
        const column = index % 4
        const row = Math.floor(index / 4)
        return (
          <motion.rect
            key={index}
            x={6 + column * 16}
            y={4 + row * 14}
            width="12"
            height="10"
            rx="2"
            className="fill-white/12"
            initial={false}
            animate={isActive ? { fill: ["#ffffff1f", "#e2561a", "#ffffff1f"] } : { fill: "#ffffff1f" }}
            transition={
              isActive
                ? { duration: 1.2, repeat: Infinity, repeatDelay: 1.4, delay: ((index * 7) % 12) * 0.12 }
                : { duration: 0.3 }
            }
          />
        )
      })}
    </>
  )
}

const TANGLED = "M4 24 C 12 2, 20 46, 28 24 S 40 2, 46 24 S 58 46, 68 24"
const STRAIGHT = "M4 24 C 12 24, 20 24, 28 24 S 40 24, 46 24 S 58 24, 68 24"

/** A tangled flow that straightens out. */
function WorkflowGlyph({ isActive }: GlyphProps) {
  return (
    <>
      <motion.path
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        initial={false}
        animate={{ d: isActive ? STRAIGHT : TANGLED }}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
        className={cn("transition-colors duration-500", isActive ? "stroke-ember" : "stroke-white/25")}
      />
      <circle cx="4" cy="24" r="3.5" className="fill-black stroke-white/60" strokeWidth="1.5" />
      <circle
        cx="68"
        cy="24"
        r="3.5"
        strokeWidth="1.5"
        className={cn("transition-colors duration-500", isActive ? "fill-gold stroke-gold" : "fill-black stroke-white/60")}
      />
    </>
  )
}

/** Conversion trend that climbs when active. */
function ConversionGlyph({ isActive }: GlyphProps) {
  return (
    <>
      <path d="M4 40 H68" className="stroke-white/15" strokeWidth="1" strokeDasharray="2 3" />
      <motion.path
        d="M4 38 L18 32 L30 34 L44 22 L56 16 L66 7"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{ pathLength: isActive ? 1 : 0.18 }}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
        className={cn("transition-colors duration-500", isActive ? "stroke-ember" : "stroke-white/30")}
      />
      <motion.path
        d="M59 6 L67 6 L67 14"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -4, y: isActive ? 0 : 4 }}
        transition={{ duration: 0.5, delay: isActive ? 0.55 : 0 }}
        className="stroke-ember"
      />
    </>
  )
}

const glyphs = {
  funnel: FunnelGlyph,
  realtime: RealtimeGlyph,
  workflow: WorkflowGlyph,
  conversion: ConversionGlyph,
} satisfies Record<SolutionGlyphKind, React.ComponentType<GlyphProps>>

export function SolutionGlyph({ kind, isActive, className }: GlyphProps & { kind: SolutionGlyphKind; className?: string }) {
  const Glyph = glyphs[kind]

  return (
    <svg viewBox="0 0 72 48" aria-hidden className={cn("h-12 w-[4.5rem] overflow-visible", className)}>
      <Glyph isActive={isActive} />
    </svg>
  )
}
