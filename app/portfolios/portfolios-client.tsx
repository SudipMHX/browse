"use client"

import { useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { FilterBar, type SortOption } from "@/components/filter-bar"
import { PortfolioCard } from "@/components/portfolio-card"
import { Pagination } from "@/components/pagination"
import type { Portfolio } from "@/types"

const ITEMS_PER_PAGE = 12

const TOP_STARS_COUNT = 6

function sortPortfolios(items: Portfolio[], sort: SortOption): Portfolio[] {
  switch (sort) {
    case "default": {
      // Top 6 by totalStars pinned first, then the rest by newest
      const sorted = [...items].sort(
        (a, b) =>
          (b.githubStats?.totalStars ?? 0) - (a.githubStats?.totalStars ?? 0)
      )
      const top = sorted.slice(0, TOP_STARS_COUNT)
      const rest = sorted.slice(TOP_STARS_COUNT).sort((a, b) => b.year - a.year)
      return [...top, ...rest]
    }
    case "newest":
      return [...items].sort((a, b) => b.year - a.year)
    case "oldest":
      return [...items].sort((a, b) => a.year - b.year)
    case "az":
      return [...items].sort((a, b) => a.name.localeCompare(b.name))
    case "za":
      return [...items].sort((a, b) => b.name.localeCompare(a.name))
    case "stars":
      return [...items].sort(
        (a, b) =>
          (b.githubStats?.totalStars ?? 0) - (a.githubStats?.totalStars ?? 0)
      )
    case "followers":
      return [...items].sort(
        (a, b) =>
          (b.githubStats?.followers ?? 0) - (a.githubStats?.followers ?? 0)
      )
    default:
      return items
  }
}

export function PortfoliosClient({
  portfolios,
  allTags,
}: {
  portfolios: Portfolio[]
  allTags: string[]
}) {
  const [filtered, setFiltered] = useState<Portfolio[]>(portfolios)
  const [sort, setSort] = useState<SortOption>("default")
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pageParam = searchParams.get("page")
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1

  function handlePageChange(newPage: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())
    router.push(`${pathname}?${params.toString()}`, { scroll: true })
  }

  function handleFilter(query: string, selectedTags: string[]) {
    let result = portfolios
    if (query) {
      const q = query.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q)
      )
    }
    if (selectedTags.length > 0) {
      result = result.filter((p) =>
        selectedTags.some((t) => p.tags.includes(t))
      )
    }
    setFiltered(result)
    const params = new URLSearchParams(searchParams.toString())
    params.delete("page")
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  function handleSort(newSort: SortOption) {
    setSort(newSort)
  }

  const sorted = sortPortfolios(filtered, sort)
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedPortfolios = sorted.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  return (
    <div className="grid gap-8 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
      <aside className="pr-2 md:sticky md:top-20 md:h-[calc(100vh-6rem)] md:overflow-y-auto">
        <FilterBar
          allTags={allTags}
          totalCount={portfolios.length}
          filteredCount={filtered.length}
          onFilter={handleFilter}
          onSort={handleSort}
          sortOptions={["default", "newest", "oldest", "az", "za", "stars", "followers"]}
        />
      </aside>
      <main>
        {paginatedPortfolios.length > 0 ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {paginatedPortfolios.map((portfolio) => (
                <PortfolioCard key={portfolio.slug} portfolio={portfolio} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">
              No portfolios found matching your criteria.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
