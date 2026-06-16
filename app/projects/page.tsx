import { Suspense } from "react"
import { getProjects, getAllTags } from "@/lib/content"
import { ProjectsClient } from "./projects-client"
import { SectionHeader } from "@/components/section-header"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse open-source projects built by Bangladeshi developers.",
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  const allTags = await getAllTags()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionHeader
        title="Projects"
        subtitle="Open-source apps, tools, and platforms from the community."
        className="mb-8"
      />
      <Suspense
        fallback={
          <div className="py-12 text-center text-muted-foreground">
            Loading...
          </div>
        }
      >
        <ProjectsClient projects={projects} allTags={allTags} />
      </Suspense>
    </div>
  )
}
