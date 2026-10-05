"use client"

import { useState } from "react"
import Link from "next/link"
import { MenuIcon } from "lucide-react"
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react"

import { LogoMark } from "@/components/brand/logo-mark"
import { Container } from "@/components/layout/container"
import { buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { siteConfig } from "@/config/site"
import { EASE_OUT_EXPO } from "@/lib/motion"
import { cn } from "@/lib/utils"

const HIDE_AFTER_PX = 240

export function SiteHeader() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0
    setIsScrolled(current > 24)
    setIsHidden(current > HIDE_AFTER_PX && current > previous && !isMenuOpen)
  })

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: isHidden ? "-100%" : 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
        isScrolled ? "border-border bg-black/70 backdrop-blur-xl" : "border-transparent bg-transparent",
      )}
    >
      <Container size="wide" className="flex h-(--header-height) items-center justify-between">
        <Link href="/" aria-label={`${siteConfig.name} — home`} className="group -m-2 rounded-md p-2">
          <LogoMark className="h-7 transition-transform duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-110" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="group relative text-sm text-foreground/80 transition-colors hover:text-foreground">
                  {item.label}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={siteConfig.contactHref}
            className={cn(buttonVariants({ variant: "outline", shape: "pill" }), "h-9 px-5 text-xs font-semibold tracking-[0.04em] uppercase")}
          >
            Contact us
          </a>
        </nav>

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger
            className={cn(buttonVariants({ variant: "outline", shape: "pill", size: "icon-lg" }), "md:hidden")}
            aria-label="Open menu"
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="top" className="border-border bg-black/95 pb-10 backdrop-blur-xl">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <Container className="flex flex-col gap-1 pt-20">
              {[...siteConfig.nav, { label: "Contact us", href: siteConfig.contactHref }].map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="heading-display flex items-baseline justify-between border-b border-border py-4 text-3xl transition-colors hover:text-gold"
                >
                  {item.label}
                  <span aria-hidden className="label-mono text-muted-foreground">
                    0{index + 1}
                  </span>
                </Link>
              ))}
            </Container>
          </SheetContent>
        </Sheet>
      </Container>

      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute inset-x-0 -bottom-px h-px origin-left bg-linear-to-r from-ember via-flame to-gold"
      />
    </motion.header>
  )
}
