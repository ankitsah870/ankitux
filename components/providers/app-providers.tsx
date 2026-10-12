"use client"

import { useLayoutEffect } from "react"
import { MotionConfig } from "motion/react"

import { Toaster } from "@/components/ui/sonner"

/** Client-side context for the whole app. Respects the OS reduced-motion setting. */
export function AppProviders({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      {children}
      <Toaster theme="dark" position="bottom-center" />
    </MotionConfig>
  )
}
