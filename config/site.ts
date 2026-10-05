export type NavItem = {
  label: string
  href: string
}

export type SocialPlatform = "behance" | "linkedin" | "instagram" | "x"

export type SocialLink = {
  platform: SocialPlatform
  label: string
  /** Leave empty until the profile URL is known — empty links are not rendered. */
  href: string
}

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ankitux.com").replace(/\/$/, "")

const socials: SocialLink[] = [
  { platform: "behance", label: "Behance", href: "https://www.behance.net/ankitsah9" },
  { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/ankit-sah/" },
  { platform: "instagram", label: "Instagram", href: "https://www.instagram.com/ankitsah_87/" },
  { platform: "x", label: "X", href: "https://x.com/AnkitSah87" },
]

export const siteConfig = {
  name: "Ankit Sah",
  role: "UI / UX Designer",
  jobTitle: "UI/UX and Product Designer",
  employer: "Codersbay Technology",
  title: "Ankit Sah — UI/UX & Product Designer",
  tagline: "I design interfaces the way engineers write code — deliberately.",
  shortBio: "UI/UX Designer based in India. I build usable systems.",
  description:
    "Ankit Sah is a UI/UX and product designer based in India who turns complex product ideas, workflows, and data into clear, scalable web and mobile experiences — across SaaS, dashboards, AI, IoT, and service platforms.",
  url: siteUrl,
  locale: "en_IN",
  email: "ankitsah8716@gmail.com",
  resumeHref: "/ankit-sah-resume.pdf",
  resumeFileName: "Ankit-Sah-Resume.pdf",
  location: {
    label: "Based in India",
    city: "Patna",
    country: "India",
    countryCode: "IN",
    timeZone: "Asia/Kolkata",
    timeZoneLabel: "IST",
  },
  availability: "Available Worldwide",
  replyTime: "Replies typically within 24 hours · NDA on request.",
  keywords: [
    "Ankit Sah",
    "UI/UX designer",
    "product designer",
    "UI/UX designer India",
    "SaaS design",
    "dashboard design",
    "AI product design",
    "mobile app design",
    "web design",
    "design systems",
    "Figma",
    "Framer",
    "Webflow",
  ],
  socials,
  nav: [
    { label: "Work", href: "/#work" },
    { label: "About Me", href: "/#about" },
  ] satisfies NavItem[],
  footerNav: [
    { label: "Home", href: "/" },
    { label: "Work", href: "/#work" },
  ] satisfies NavItem[],
  contactHref: "/#contact",
} as const

export type SiteConfig = typeof siteConfig

/** Social profiles that have a URL configured. */
export const activeSocials = siteConfig.socials.filter((social) => social.href.length > 0)
export const aboutSocials = activeSocials.filter((social) => social.platform !== "x")

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteConfig.url}/`).toString()
}

export function gmailComposeUrl() {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteConfig.email)}`
}
