"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"

import { LogoMark } from "@/components/brand/logo-mark"
import { LocalTime } from "@/components/shared/local-time"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import portrait from "../../assets/images/Ankit sah.png"

/** Identity card from the "How I think" section, with a gently animated molten gradient. */
export function PortraitCard({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <figure className={cn("flex flex-col overflow-hidden rounded-2xl bg-surface", className)}>
      <div className="relative isolate min-h-[26rem] flex-1 overflow-hidden bg-[linear-gradient(145deg,#f27612_0%,#bd2c07_34%,#711304_64%,#120402_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_58%_92%,#050100_0%,transparent_70%)]" />
        <motion.div
          aria-hidden
          className="absolute -inset-1/4 bg-[radial-gradient(35%_30%_at_30%_25%,oklch(0.78_0.17_55/0.55),transparent_70%)]"
          animate={prefersReducedMotion ? undefined : { x: ["0%", "12%", "-6%", "0%"], y: ["0%", "8%", "14%", "0%"] }}
          transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
        />
        <div aria-hidden className="bg-grain absolute inset-0 opacity-30 mix-blend-overlay" />
        <Image
          src={portrait}
          alt={`${siteConfig.name} portrait`}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="pointer-events-none object-contain object-bottom"
        />

        <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 text-sm font-semibold">
            <span>{siteConfig.location.label}</span>
            <span className="flex items-center gap-2 font-mono text-xs font-medium text-white/80">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/70 motion-reduce:animate-none" />
                <span className="relative inline-flex size-1.5 rounded-full bg-white" />
              </span>
              {siteConfig.location.timeZoneLabel} <LocalTime timeZone={siteConfig.location.timeZone} />
            </span>
          </div>
          <p className="font-mono text-[0.7rem] font-semibold tracking-[0.12em] text-black/80">20.59° N · 78.96° E</p>
        </div>
      </div>

      <figcaption className="flex items-center gap-4 px-6 py-7 sm:px-8">
        <LogoMark className="h-10 shrink-0" />
        <div>
          <p className="text-lg font-semibold">{siteConfig.name}</p>
          <p className="text-sm text-foreground/75">
            {siteConfig.role} · {siteConfig.availability}
          </p>
        </div>
      </figcaption>
    </figure>
  )
}
