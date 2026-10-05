import type { Metadata } from "next"
import Link from "next/link"

import { Container } from "@/components/layout/container"
import { Accent } from "@/components/typography/accent"
import { Eyebrow } from "@/components/typography/eyebrow"
import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <Container size="wide" className="flex min-h-[80svh] flex-col justify-center pt-(--header-height)">
      <Eyebrow>Error 404</Eyebrow>
      <h1 className="heading-display mt-6 text-[clamp(2.5rem,6vw,5rem)]">
        This screen was
        <br />
        <Accent>out of scope.</Accent>
      </h1>
      <p className="mt-6 max-w-md text-lg text-foreground/80">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <Link href="/" className={buttonVariants({ size: "cta", className: "mt-10 self-start" })}>
        Back home
      </Link>
    </Container>
  )
}
