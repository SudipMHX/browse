"use client"

import { useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { FilterBar, type SortOption } from "@/components/filter-bar"
import { LibraryCard } from "@/components/library-card"
import { Pagination } from "@/components/pagination"
import type { Library } from "@/types"

const ITEMS_PER_PAGE = 12

const TOP_STARS_COUNT = 6

function sortLibraries(items: Library[], sort: SortOption): Library[] {
  switch (sort) {
    case "default": {
      // Top 6 by stars pinned first, then the rest by newest
      const sorted = [...items].sort(
        (a, b) => (b.githubStats?.stars ?? 0) - (a.githubStats?.stars ?? 0)
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
      return [...items].sort((a, b) => a.title.localeCompare(b.title))
    case "za":
      return [...items].sort((a, b) => b.title.localeCompare(a.title))
    case "stars":
      return [...items].sort(
        (a, b) => (b.githubStats?.stars ?? 0) - (a.githubStats?.stars ?? 0)
      )
    case "forks":
      return [...items].sort(
        (a, b) => (b.githubStats?.forks ?? 0) - (a.githubStats?.forks ?? 0)
      )
    default:
      return items
  }
}

export function LibrariesClient({
  libraries,
  allTags,
}: {
  libraries: Library[]
  allTags: string[]
}) {
  const [filtered, setFiltered] = useState<Library[]>(libraries)
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
    let result = libraries
    if (query) {
      const q = query.toLowerCase()
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.author.toLowerCase().includes(q)
      )
    }
    if (selectedTags.length > 0) {
      result = result.filter((library) =>
        selectedTags.some((tag) => library.tags.includes(tag))
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

  const sorted = sortLibraries(filtered, sort)
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedLibraries = sorted.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  return (
    <div className="grid gap-8 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
      <aside className="pr-2 md:sticky md:top-20 md:h-[calc(100vh-6rem)] md:overflow-y-auto">
        <FilterBar
          allTags={allTags}
          totalCount={libraries.length}
          filteredCount={filtered.length}
          onFilter={handleFilter}
          onSort={handleSort}
          sortOptions={["default", "newest", "oldest", "az", "za", "stars", "forks"]}
        />
      </aside>
      <main>
        {paginatedLibraries.length > 0 ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {paginatedLibraries.map((library) => (
                <LibraryCard key={library.slug} library={library} />
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
              No libraries found matching your criteria.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
