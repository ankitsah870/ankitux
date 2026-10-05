import { cn } from "@/lib/utils"

/** The small glowing square used as an icon on experience cards. */
export function EmberChip({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative block size-10 overflow-hidden rounded-[0.4rem] bg-rust",
        "bg-[radial-gradient(120%_90%_at_50%_110%,var(--brand-flame)_0%,var(--brand-ember)_35%,var(--brand-rust)_70%,oklch(0.18_0.04_30)_100%)]",
        className,
      )}
    >
      <span className="bg-grain absolute inset-0 opacity-25 mix-blend-overlay" />
    </span>
  )
}
