import { absoluteUrl, activeSocials, siteConfig } from "@/config/site"
import { disciplines, tooling } from "@/content/about"
import type { Project } from "@/content/projects"

const PERSON_ID = absoluteUrl("/#person")
const WEBSITE_ID = absoluteUrl("/#website")

export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: siteConfig.name,
    jobTitle: siteConfig.jobTitle,
    worksFor: { "@type": "Organization", name: siteConfig.employer },
    description: siteConfig.description,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    image: absoluteUrl("/opengraph-image"),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressCountry: siteConfig.location.countryCode,
    },
    knowsAbout: [...disciplines, ...tooling],
    ...(activeSocials.length > 0 ? { sameAs: activeSocials.map((social) => social.href) } : {}),
  }
}

export function homeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": absoluteUrl("/#profile"),
        url: siteConfig.url,
        name: siteConfig.title,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
      },
      personSchema(),
    ],
  }
}

export function caseStudySchema(project: Project) {
  const url = absoluteUrl(`/work/${project.slug}`)

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        url,
        name: project.title,
        headline: project.title,
        description: project.overview,
        genre: project.category,
        keywords: project.tag.split(" · ").join(", "),
        about: project.industry,
        image: `${url}/opengraph-image`,
        dateModified: project.updatedAt,
        ...(project.year ? { dateCreated: project.year.slice(0, 4) } : {}),
        inLanguage: "en",
        creator: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Work", item: absoluteUrl("/#work") },
          { "@type": "ListItem", position: 3, name: project.title, item: url },
        ],
      },
      personSchema(),
    ],
  }
}
