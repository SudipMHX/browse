"use client"

import { useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { FilterBar, type SortOption } from "@/components/filter-bar"
import { ProjectCard } from "@/components/project-card"
import { Pagination } from "@/components/pagination"
import type { Project } from "@/types"

const ITEMS_PER_PAGE = 12

const TOP_STARS_COUNT = 6

function sortProjects(items: Project[], sort: SortOption): Project[] {
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

export function ProjectsClient({
  projects,
  allTags,
}: {
  projects: Project[]
  allTags: string[]
}) {
  const [filtered, setFiltered] = useState<Project[]>(projects)
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
    let result = projects
    if (query) {
      const q = query.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q)
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

  const sorted = sortProjects(filtered, sort)
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProjects = sorted.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  return (
    <div className="grid gap-8 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
      <aside className="pr-2 md:sticky md:top-20 md:h-[calc(100vh-6rem)] md:overflow-y-auto">
        <FilterBar
          allTags={allTags}
          totalCount={projects.length}
          filteredCount={filtered.length}
          onFilter={handleFilter}
          onSort={handleSort}
          sortOptions={["default", "newest", "oldest", "az", "za", "stars", "forks"]}
        />
      </aside>
      <main>
        {paginatedProjects.length > 0 ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {paginatedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
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
              No projects found matching your criteria.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
