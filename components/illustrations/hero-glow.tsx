"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * Molten light behind the hero: a bright core with two arms and a long rust
 * tail, built from blurred layers so it can breathe and lean toward the cursor.
 */
export function HeroGlow({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion()
  const offsetX = useMotionValue(0)
  const offsetY = useMotionValue(0)
  const x = useSpring(offsetX, { stiffness: 40, damping: 20 })
  const y = useSpring(offsetY, { stiffness: 40, damping: 20 })

  useEffect(() => {
    if (prefersReducedMotion) return

    function handlePointerMove(event: PointerEvent) {
      offsetX.set((event.clientX / window.innerWidth - 0.5) * 48)
      offsetY.set((event.clientY / window.innerHeight - 0.5) * 32)
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    return () => window.removeEventListener("pointermove", handlePointerMove)
  }, [prefersReducedMotion, offsetX, offsetY])

  const breathe = prefersReducedMotion ? undefined : { scale: [1, 1.06, 0.98, 1], rotate: [0, 2.5, -1.5, 0] }

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <motion.div style={{ x, y }} className="absolute top-[54%] right-[-12%] aspect-[1.45] w-[min(58rem,64vw)] -translate-y-1/2">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="absolute inset-0 will-change-transform"
            animate={breathe}
            transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
          >
            {/* Long rust tail trailing left */}
            <div className="absolute top-[40%] left-[2%] h-[22%] w-[62%] rounded-full bg-[#6e1604] opacity-80 blur-[70px]" />
            {/* Upper and lower arms */}
            <div className="absolute top-[24%] left-[44%] h-[20%] w-[42%] -rotate-[32deg] rounded-full bg-[#c4420b] blur-[56px]" />
            <div className="absolute top-[54%] left-[47%] h-[17%] w-[44%] rotate-[24deg] rounded-full bg-[#b5360a] blur-[56px]" />
            {/* Core */}
            <div className="absolute top-[36%] left-[34%] h-[26%] w-[32%] rounded-full bg-[radial-gradient(closest-side,#e58a1d,#d24a0e_70%,transparent)] blur-[40px]" />
            <motion.div
              className="absolute top-[42%] left-[44%] h-[13%] w-[16%] rounded-full bg-[#f2a93b] blur-[30px]"
              animate={prefersReducedMotion ? undefined : { opacity: [0.75, 1, 0.8, 0.75] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
      <div className="bg-grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
    </div>
  )
}
