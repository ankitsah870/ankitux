"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useReducedMotion } from "motion/react"

import { Container } from "@/components/layout/container"
import { ProjectCard, type ProjectCardData } from "@/components/work/project-card"
import { cn } from "@/lib/utils"

const TRACK_ID = "selected-work-track"

/* Inline padding that lines the first card up with the page container, while the track bleeds to the right edge. */
const trackInset =
  "px-5 scroll-px-5 sm:px-8 sm:scroll-px-8 xl:px-[calc((100vw-80rem)/2+2rem)] xl:scroll-px-[calc((100vw-80rem)/2+2rem)]"

type WorkCarouselProps = {
  children: React.ReactNode
  projects: ProjectCardData[]
}

/** Staggered, scroll-snapping row of case-study cards with previous/next controls. */
export function WorkCarousel({ children, projects }: WorkCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScroll, setCanScroll] = useState({ previous: false, next: true })

  const updateScrollState = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const maxScroll = track.scrollWidth - track.clientWidth
    setCanScroll({ previous: track.scrollLeft > 4, next: track.scrollLeft < maxScroll - 4 })
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const frame = requestAnimationFrame(updateScrollState)
    const observer = new ResizeObserver(updateScrollState)
    observer.observe(track)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [updateScrollState])

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current
    const firstCard = track?.firstElementChild as HTMLElement | null
    if (!track || !firstCard) return
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
    track.scrollBy({ left: direction * (firstCard.offsetWidth + gap), behavior: prefersReducedMotion ? "auto" : "smooth" })
  }

  return (
    <div>
      <Container className="flex items-end justify-between gap-8">
        {children}
        <div className="hidden shrink-0 gap-5 sm:flex">
          <CarouselButton
            label="Previous project"
            disabled={!canScroll.previous}
            onClick={() => scrollByCard(-1)}
          >
            <ChevronLeftIcon />
          </CarouselButton>
          <CarouselButton label="Next project" disabled={!canScroll.next} onClick={() => scrollByCard(1)}>
            <ChevronRightIcon />
          </CarouselButton>
        </div>
      </Container>

      <ul
        ref={trackRef}
        id={TRACK_ID}
        aria-label="Selected work"
        onScroll={updateScrollState}
        className={cn(
          "mt-16 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto overscroll-x-contain pt-2 pb-10 sm:mt-24 sm:gap-6",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          trackInset,
        )}
      >
        {projects.map((project, index) => (
          <li
            key={project.slug}
            className="w-[min(82vw,23.25rem)] shrink-0 snap-start self-stretch"
          >
            <ProjectCard
              project={project}
              index={index}
              isActive={index === activeIndex}
              onActivate={() => setActiveIndex(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

type CarouselButtonProps = {
  label: string
  disabled: boolean
  onClick: () => void
  children: React.ReactNode
}

function CarouselButton({ label, disabled, onClick, children }: CarouselButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-controls={TRACK_ID}
      disabled={disabled}
      onClick={onClick}
      className="flex size-14 items-center justify-center rounded-full border border-white/15 text-foreground transition-[background-color,border-color,opacity] duration-300 outline-none hover:border-white/40 hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-35 [&_svg]:size-5"
    >
      {children}
    </button>
  )
}
