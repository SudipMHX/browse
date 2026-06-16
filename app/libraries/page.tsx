import { Suspense } from "react"
import { getLibraries, getAllTags } from "@/lib/content"
import { LibrariesClient } from "./libraries-client"
import { SectionHeader } from "@/components/section-header"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Libraries",
  description:
    "Browse open-source libraries and SDKs built by Bangladeshi developers.",
}

export default async function LibrariesPage() {
  const libraries = await getLibraries()
  const allTags = await getAllTags()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionHeader
        title="Libraries & Packages"
        subtitle="Open-source npm packages, SDKs, and UI kits."
        className="mb-8"
      />
      <Suspense
        fallback={
          <div className="py-12 text-center text-muted-foreground">
            Loading...
          </div>
        }
      >
        <LibrariesClient libraries={libraries} allTags={allTags} />
      </Suspense>
    </div>
  )
}
