import { buildLlmsIndex } from "@/lib/seo/llms"

export const dynamic = "force-static"

export function GET() {
  return new Response(buildLlmsIndex(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}
