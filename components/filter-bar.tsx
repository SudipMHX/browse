"use client"

import { useState } from "react"
import { Search, X, ChevronDown, Check, SlidersHorizontal } from "lucide-react"
import { Tag } from "@/components/tag"

export type SortOption =
  | "default"
  | "newest"
  | "oldest"
  | "az"
  | "za"
  | "stars"
  | "forks"
  | "followers"

interface FilterBarProps {
  allTags: string[]
  totalCount: number
  filteredCount: number
  onFilter: (query: string, selectedTags: string[]) => void
  onSort?: (sort: SortOption) => void
  initialTag?: string
  sortOptions?: SortOption[]
}

const sortLabels: Record<SortOption, string> = {
  default: "Top Stars · Newest",
  newest: "Newest first",
  oldest: "Oldest first",
  az: "A → Z",
  za: "Z → A",
  stars: "Most Stars",
  forks: "Most Forks",
  followers: "Most Followers",
}

const sortIcons: Record<SortOption, string> = {
  default: "✦",
  newest: "↓",
  oldest: "↑",
  az: "A",
  za: "Z",
  stars: "★",
  forks: "⑂",
  followers: "👥",
}

export function FilterBar({
  allTags,
  totalCount,
  filteredCount,
  onFilter,
  onSort,
  initialTag,
  sortOptions = ["newest", "oldest", "az", "za"],
}: FilterBarProps) {
  const [query, setQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialTag ? [initialTag] : []
  )
  const [currentSort, setCurrentSort] = useState<SortOption>(sortOptions[0])
  const [sortOpen, setSortOpen] = useState(false)

  function toggleTag(tag: string) {
    const next = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]
    setSelectedTags(next)
    onFilter(query, next)
  }

  function handleQuery(q: string) {
    setQuery(q)
    onFilter(q, selectedTags)
  }

  function handleSort(sort: SortOption) {
    setCurrentSort(sort)
    setSortOpen(false)
    onSort?.(sort)
  }

  function clearAll() {
    setQuery("")
    setSelectedTags([])
    onFilter("", [])
  }

  const hasFilters = query.length > 0 || selectedTags.length > 0
  const isFiltered = filteredCount < totalCount

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          Filters
        </div>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleQuery(e.target.value)}
          placeholder="Search..."
          className="w-full rounded-xl border border-border bg-background py-2.5 pr-9 pl-9 text-sm text-foreground transition-all placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/15 focus:outline-none"
        />
        {query && (
          <button
            onClick={() => handleQuery("")}
            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Sort Dropdown */}
      {onSort && sortOptions.length > 1 && (
        <div>
          <p className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Sort By
          </p>
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex w-full items-center justify-between rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-accent focus:border-primary/50 focus:ring-2 focus:ring-primary/15 focus:outline-none"
            >
              <span className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                  {sortIcons[currentSort]}
                </span>
                {sortLabels[currentSort]}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
              />
            </button>
            {sortOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setSortOpen(false)}
                />
                <div className="absolute top-full left-0 z-20 mt-1.5 w-full overflow-hidden rounded-xl border border-border bg-popover shadow-lg ring-1 ring-black/5">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSort(opt)}
                      className={`flex w-full items-center justify-between px-3.5 py-2.5 text-sm transition-colors hover:bg-accent ${
                        currentSort === opt
                          ? "bg-primary/5 font-semibold text-primary"
                          : "text-foreground"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-muted text-xs font-bold text-muted-foreground">
                          {sortIcons[opt]}
                        </span>
                        {sortLabels[opt]}
                      </span>
                      {currentSort === opt && (
                        <Check className="h-3.5 w-3.5 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Tags */}
      {allTags.length > 0 && (
        <div>
          <p className="mb-2.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Tags
          </p>
          <div className="flex flex-wrap gap-1.5">
            {allTags.slice(0, 30).map((tag) => (
              <Tag
                key={tag}
                label={tag}
                active={selectedTags.includes(tag)}
                onClick={() => toggleTag(tag)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Results count */}
      <div
        className={`rounded-xl border px-3.5 py-3 text-xs transition-colors ${
          isFiltered
            ? "border-primary/20 bg-primary/5"
            : "border-border bg-muted/50"
        }`}
      >
        <span className="text-muted-foreground">Showing </span>
        <span
          className={`font-semibold ${isFiltered ? "text-primary" : "text-foreground"}`}
        >
          {filteredCount}
        </span>
        <span className="text-muted-foreground"> of {totalCount} results</span>
        {isFiltered && (
          <span className="ml-1 text-muted-foreground">
            ({totalCount - filteredCount} filtered)
          </span>
        )}
      </div>
    </div>
  )
}
