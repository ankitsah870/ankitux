"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"

import { formatProjectNumber, type Project } from "@/content/projects"
import { EASE_OUT_EXPO } from "@/lib/motion"
import { cn } from "@/lib/utils"

export type ProjectCardData = Pick<Project, "slug" | "title" | "summary" | "cover" | "coverAlt">

/* Where the cover sits along the card's bottom edge — varies card to card, as in the design. */
const coverPlacement = ["left-[6%]", "left-0", "right-0", "left-[16%]"]

type ProjectCardProps = {
  project: ProjectCardData
  index: number
  isActive: boolean
  onActivate: () => void
}

export function ProjectCard({ project, index, isActive, onActivate }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: index * 0.1 }}
      className="h-full"
    >
      <Link
        href={`/work/${project.slug}`}
        onPointerEnter={onActivate}
        onFocus={onActivate}
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-[#0a0a0a] outline-none transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-ring",
          isActive ? "border-transparent hover:border-transparent" : "border-white/10 hover:border-white/20",
        )}
      >
        <div className="relative h-60 overflow-hidden sm:h-[16.75rem]">
          <motion.div
            aria-hidden
            initial={false}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            className="absolute inset-0 bg-[radial-gradient(130%_115%_at_96%_0%,#e0691a_0%,#9a2507_36%,#3a0b03_66%,#0a0a0a_100%)]"
          />
          <div
            className={cn(
              "absolute bottom-0 w-[79%] shadow-[0_-12px_40px_-12px_rgb(0_0_0/0.8)] transition-transform duration-700 ease-out-expo group-hover:-translate-y-1.5",
              coverPlacement[index % coverPlacement.length],
            )}
          >
            <Image
              src={project.cover}
              alt={project.coverAlt}
              sizes="(min-width: 640px) 18.5rem, 66vw"
              placeholder="blur"
              className="h-auto w-full"
            />
          </div>
        </div>

        <div className="flex min-h-44 flex-1 flex-col gap-4 border-t border-white/10 p-6 sm:p-8">
          <h3 className="text-lg leading-tight font-semibold sm:text-xl">
            {formatProjectNumber(index)} — {project.title}
          </h3>
          <p className="line-clamp-3 text-base leading-relaxed text-foreground/75">{project.summary}</p>
        </div>
      </Link>
    </motion.div>
  )
}
