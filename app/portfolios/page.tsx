import { Suspense } from "react"
import { getPortfolios, getAllTags } from "@/lib/content"
import { PortfoliosClient } from "./portfolios-client"
import { SectionHeader } from "@/components/section-header"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolios",
  description: "Browse portfolios of Bangladeshi developers and designers.",
}

export default async function PortfoliosPage() {
  const portfolios = await getPortfolios()
  const allTags = await getAllTags()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionHeader
        title="Developer Portfolios"
        subtitle="Discover talented developers and designers from Bangladesh."
        className="mb-8"
      />
      <Suspense
        fallback={
          <div className="py-12 text-center text-muted-foreground">
            Loading...
          </div>
        }
      >
        <PortfoliosClient portfolios={portfolios} allTags={allTags} />
      </Suspense>
    </div>
  )
}
