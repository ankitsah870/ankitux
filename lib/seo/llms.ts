import { absoluteUrl, activeSocials, siteConfig } from "@/config/site"
import { aboutIntro, disciplines, principles, tooling } from "@/content/about"
import { experienceHighlights, experienceSummary } from "@/content/experience"
import { projects } from "@/content/projects"
import { solutions } from "@/content/solutions"

/*
 * Plain-markdown summaries of the site for language models, following the
 * llms.txt convention (https://llmstxt.org): `/llms.txt` is the index,
 * `/llms-full.txt` inlines every case study.
 */

function header() {
  return [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    aboutIntro,
    "",
    `Based in ${siteConfig.location.country}, ${siteConfig.availability.toLowerCase()}. Tagline: "${siteConfig.tagline}"`,
    "",
    `- Contact: ${siteConfig.email} or ${absoluteUrl(siteConfig.contactHref)}`,
    `- Disciplines: ${disciplines.join(", ")}`,
    `- Tooling: ${tooling.join(", ")}`,
    ...activeSocials.map((social) => `- ${social.label}: ${social.href}`),
  ]
}

function approach() {
  return [
    "## Approach",
    "",
    "Design is approached the way a senior engineer approaches code: read the problem, map constraints, reduce scope, then ship.",
    "",
    ...principles.map((principle) => `- ${principle.question} ${principle.prompt}`),
    "",
    "## Experience",
    "",
    experienceSummary,
    "",
    ...experienceHighlights.map((highlight) => `- ${highlight.title}: ${highlight.text}`),
    "",
    "## Problems solved",
    "",
    ...solutions.map((solution) => `- ${solution.title}`),
  ]
}

export function buildLlmsIndex() {
  return [
    ...header(),
    "",
    ...approach(),
    "",
    "## Case studies",
    "",
    ...projects.map(
      (project) => `- [${project.title}](${absoluteUrl(`/work/${project.slug}`)}): ${project.category} (${project.tag}) — ${project.summary}`,
    ),
    "",
    "## Optional",
    "",
    `- [Full content](${absoluteUrl("/llms-full.txt")}): every case study in one file`,
    "",
  ].join("\n")
}

export function buildLlmsFull() {
  return [
    ...header(),
    "",
    ...approach(),
    "",
    "## Case studies",
    ...projects.flatMap((project) => [
      "",
      `### ${project.title}`,
      "",
      `URL: ${absoluteUrl(`/work/${project.slug}`)}`,
      [
        `Type: ${project.category}`,
        `Focus: ${project.tag}`,
        `Platform: ${project.platform}`,
        `Industry: ${project.industry}`,
        project.role && `Role: ${project.role}`,
        project.company && `Company: ${project.company}`,
        project.year && `Year: ${project.year}`,
      ]
        .filter(Boolean)
        .join(" · "),
      "",
      project.overview,
      ...(project.contributions.length > 0
        ? ["", "**What I designed.**", ...project.contributions.map((contribution) => `- ${contribution}`)]
        : []),
      ...(project.impact.length > 0
        ? ["", "**Impact.**", ...project.impact.map((stat) => `- ${stat.value}: ${stat.label}`)]
        : []),
    ]),
    "",
  ].join("\n")
}
