"use client"

import { useCallback, useRef } from "react"
import { disciplines } from "@/content/about"
import { cn } from "@/lib/utils"

/** Slow, endless band of disciplines that bridges the hero and the about section. */
export function DisciplineMarquee({ className }: { className?: string }) {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const speedFrame = useRef<number | null>(null)

  const transitionSpeed = useCallback((targetSpeed: number) => {
    const animation = marqueeRef.current?.getAnimations()[0]
    if (!animation) return

    if (speedFrame.current !== null) cancelAnimationFrame(speedFrame.current)

    const initialSpeed = animation.playbackRate
    const startTime = performance.now()
    const duration = 450

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = progress * progress * (3 - 2 * progress)
      animation.updatePlaybackRate(initialSpeed + (targetSpeed - initialSpeed) * eased)

      if (progress < 1) {
        speedFrame.current = requestAnimationFrame(step)
      } else {
        speedFrame.current = null
      }
    }

    speedFrame.current = requestAnimationFrame(step)
  }, [])

  return (
    <section
      aria-label="Disciplines"
      className={cn("relative overflow-hidden border-y border-border py-5 sm:py-6", className)}
      onPointerEnter={() => transitionSpeed(0)}
      onPointerLeave={() => transitionSpeed(1)}
    >
      <ul className="sr-only">
        {disciplines.map((discipline) => (
          <li key={discipline}>{discipline}</li>
        ))}
      </ul>
      <div aria-hidden className="mask-fade-x flex">
        <div ref={marqueeRef} className="flex w-max animate-marquee items-center [--marquee-duration:55s] motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {disciplines.map((discipline) => (
                <span key={discipline} className="flex items-center">
                  <span className="heading-display text-outline px-4 whitespace-nowrap text-[clamp(1.575rem,4.2vw,3.5rem)] leading-none transition-colors duration-500 hover:text-foreground sm:px-7">
                    {discipline}
                  </span>
                  <span className="size-2 rotate-45 bg-ember sm:size-3" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
