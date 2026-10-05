"use client"

import { useSyncExternalStore } from "react"

type LocalTimeProps = {
  timeZone: string
  /** "11:56 pm" instead of "23:56". */
  hour12?: boolean
  className?: string
}

function subscribe(onTick: () => void) {
  const interval = setInterval(onTick, 1000)
  return () => clearInterval(interval)
}

/** Live clock for a given IANA time zone. Renders a placeholder on the server. */
export function LocalTime({ timeZone, hour12 = false, className }: LocalTimeProps) {
  const time = useSyncExternalStore(
    subscribe,
    () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: hour12 ? "numeric" : "2-digit",
        minute: "2-digit",
        hour12,
        timeZone,
      }).format(new Date()),
    () => null,
  )

  return (
    <time className={className} suppressHydrationWarning>
      {time ?? "--:--"}
    </time>
  )
}
