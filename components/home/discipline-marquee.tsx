import { disciplines } from "@/content/about"
import { cn } from "@/lib/utils"

/** Slow, endless band of disciplines that bridges the hero and the about section. */
export function DisciplineMarquee({ className }: { className?: string }) {
  return (
    <section aria-label="Disciplines" className={cn("group relative overflow-hidden border-y border-border py-5 sm:py-6", className)}>
      <ul className="sr-only">
        {disciplines.map((discipline) => (
          <li key={discipline}>{discipline}</li>
        ))}
      </ul>
      <div aria-hidden className="mask-fade-x flex">
        <div className="flex w-max animate-marquee items-center [--marquee-duration:55s] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
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
