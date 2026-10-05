"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"

import { EmberChip } from "@/components/illustrations/ember-chip"
import { EmberWave } from "@/components/illustrations/ember-wave"
import type { ExperienceHighlight } from "@/content/experience"
import { EASE_OUT_EXPO, SPRING_SOFT } from "@/lib/motion"
import { cn } from "@/lib/utils"

const AUTOPLAY_MS = 4200

/**
 * Four panels; the active one widens and lights up. It cycles on its own
 * until the visitor takes over with hover, focus or tap.
 */
export function ExperienceAccordion({ items }: { items: ExperienceHighlight[] }) {
  const ref = useRef<HTMLUListElement>(null)
  const isInView = useInView(ref, { margin: "-20% 0px" })
  const prefersReducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    if (!isInView || hasInteracted || prefersReducedMotion) return
    const interval = setInterval(() => setActiveIndex((index) => (index + 1) % items.length), AUTOPLAY_MS)
    return () => clearInterval(interval)
  }, [isInView, hasInteracted, prefersReducedMotion, items.length])

  function activate(index: number) {
    setHasInteracted(true)
    setActiveIndex(index)
  }

  return (
    <ul ref={ref} className="flex flex-col gap-4 md:h-[27.5rem] md:flex-row md:gap-5">
      {items.map((item, index) => {
        const isActive = index === activeIndex

        return (
          <motion.li
            key={item.index}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={{ flexGrow: isActive ? 1.9 : 1 }}
            transition={{
              flexGrow: SPRING_SOFT,
              default: { duration: 0.9, ease: EASE_OUT_EXPO, delay: index * 0.08 },
            }}
            className="relative min-w-0 overflow-visible md:basis-0"
          >
            <div className="relative size-full overflow-hidden rounded-xl bg-surface">
              <motion.div
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
              >
                <EmberWave />
              </motion.div>

              <motion.span
                aria-hidden
                initial={false}
                animate={{ x: isActive ? "110%" : "0%", opacity: isActive ? 0 : 0.12 }}
                transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
                className="heading-display pointer-events-none absolute top-2 -right-[0.12em] z-20 text-[7rem] leading-[0.8] font-normal tabular-nums text-white select-none md:text-[8.5rem]"
              >
                {item.index}
              </motion.span>

              <button
                type="button"
                aria-expanded={isActive}
                onMouseEnter={() => activate(index)}
                onFocus={() => activate(index)}
                onClick={() => activate(index)}
                className={cn(
                  "relative flex size-full flex-col p-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                  "transition-[min-height] duration-500 ease-out-expo",
                  isActive ? "min-h-72 justify-start" : "min-h-44 justify-end",
                )}
              >
                <motion.span layout="position" transition={SPRING_SOFT} className="relative flex flex-col">
                  <EmberChip />
                  {isActive ? (
                    <motion.span
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.15 }}
                      className="mt-7 text-base font-semibold tracking-[0.02em] uppercase"
                    >
                      {item.title}
                    </motion.span>
                  ) : null}
                  <span className={cn("max-w-[16rem] text-base leading-tight", isActive ? "mt-2.5 md:text-[1.0625rem]" : "mt-6")}>
                    {item.text}
                  </span>
                </motion.span>
              </button>
            </div>
          </motion.li>
        )
      })}
    </ul>
  )
}
