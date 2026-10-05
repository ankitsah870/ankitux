"use client"

import { motion, type HTMLMotionProps, type Variants } from "motion/react"

import { EASE_OUT_EXPO } from "@/lib/motion"

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number
  /** Distance in px the element travels upward while fading in. */
  offset?: number
  /** Animate on mount instead of on scroll — for above-the-fold content. */
  immediate?: boolean
}

/** Fades and lifts its children in once they scroll into view (or on mount when `immediate`). */
export function Reveal({ delay = 0, offset = 24, immediate = false, children, ...props }: RevealProps) {
  const visible = { opacity: 1, y: 0 }
  const trigger = immediate
    ? { animate: visible }
    : { whileInView: visible, viewport: { once: true, margin: "0px 0px -12% 0px" } }

  return (
    <motion.div
      initial={{ opacity: 0, y: offset }}
      {...trigger}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

const groupVariants: Variants = {
  hidden: {},
  visible: (stagger: number = 0.08) => ({
    transition: { staggerChildren: stagger },
  }),
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
}

type RevealGroupProps = HTMLMotionProps<"div"> & {
  as?: "div" | "ul" | "ol"
  stagger?: number
}

/** Staggers the entrance of every `RevealItem` inside it. */
export function RevealGroup({ as = "div", stagger = 0.08, ...props }: RevealGroupProps) {
  const Component = motion[as] as typeof motion.div

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={groupVariants}
      custom={stagger}
      {...props}
    />
  )
}

type RevealItemProps = HTMLMotionProps<"div"> & {
  as?: "div" | "li"
}

export function RevealItem({ as = "div", ...props }: RevealItemProps) {
  const Component = motion[as] as typeof motion.div

  return <Component variants={itemVariants} {...props} />
}
