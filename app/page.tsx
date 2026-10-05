import { AboutSection } from "@/components/home/about-section"
import { ApproachSection } from "@/components/home/approach-section"
import { ContactSection } from "@/components/home/contact-section"
import { DisciplineMarquee } from "@/components/home/discipline-marquee"
import { ExperienceSection } from "@/components/home/experience-section"
import { HeroSection } from "@/components/home/hero-section"
import { SolutionsSection } from "@/components/home/solutions-section"
import { WorkSection } from "@/components/home/work-section"
import { JsonLd } from "@/components/seo/json-ld"
import { createPageMetadata } from "@/lib/seo/metadata"
import { homeSchema } from "@/lib/seo/structured-data"

export const metadata = createPageMetadata({ path: "/", type: "profile" })

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeSchema()} />
      <HeroSection />
      <DisciplineMarquee />
      <AboutSection />
      <ApproachSection />
      <ExperienceSection />
      <SolutionsSection />
      <WorkSection />
      <ContactSection />
    </>
  )
}
