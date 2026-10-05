import { buildLlmsFull } from "@/lib/seo/llms"

export const dynamic = "force-static"

export function GET() {
  return new Response(buildLlmsFull(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}
