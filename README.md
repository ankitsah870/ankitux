# ankitux — Ankit Sah portfolio

Next.js 16 (App Router) · Tailwind CSS v4 · shadcn/ui (Base UI) · Motion.

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev
```

## Structure

```
app/                     routes + metadata files (opengraph-image, sitemap, robots, manifest, llms.txt)
  work/[slug]/           case-study pages, each with its own OG/Twitter image
components/
  ui/                    shadcn primitives (restyled via tokens in app/globals.css)
  layout/                header, footer, container
  home/                  homepage sections
  work/                  selected-work carousel and project card
  contact/               project brief form
  illustrations/         animated SVG artwork and device mockups
  motion/                reveal / line-reveal primitives
  brand/ seo/ typography/ shared/ providers/
config/site.ts           name, URL, email, socials, nav — single source of truth
content/                 typed copy: projects, experience, solutions, tooling
lib/                     actions, validations, seo (metadata, JSON-LD, llms), og renderer
assets/fonts/            static TTFs used only by OG image generation
assets/images/work/      case-study cover images
```

## Content to replace

- `config/site.ts` — X profile URL (the icon appears once it's set) and the
  production domain via `NEXT_PUBLIC_SITE_URL`.
- `content/projects.ts` — case studies come from the CV; Upstage isn't in the
  CV yet, so it only has an overview. Covers live in
  `assets/images/work/<slug>.jpg` (OG images read them by slug).
- `public/ankit-sah-resume.pdf` — the CV served by “Download resume”; replace
  the file to update it.
