"use client"

import { MotionConfig } from "motion/react"

import { Toaster } from "@/components/ui/sonner"

/** Client-side context for the whole app. Respects the OS reduced-motion setting. */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
      <Toaster theme="dark" position="bottom-center" />
    </MotionConfig>
  )
}
