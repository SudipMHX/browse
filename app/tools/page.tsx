import { Suspense } from "react"
import { getTools, getAllTags } from "@/lib/content"
import { ToolsClient } from "./tools-client"
import { SectionHeader } from "@/components/section-header"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Browse free tools and utilities built by Bangladeshi developers.",
}

export default async function ToolsPage() {
  const tools = await getTools()
  const allTags = await getAllTags()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionHeader
        title="Developer Tools"
        subtitle="Free utilities, generators, and APIs to make your life easier."
        className="mb-8"
      />
      <Suspense
        fallback={
          <div className="py-12 text-center text-muted-foreground">
            Loading...
          </div>
        }
      >
        <ToolsClient tools={tools} allTags={allTags} />
      </Suspense>
    </div>
  )
}
