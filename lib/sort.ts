import type { Project, Tool, Library, Portfolio } from "@/types"

// ─── Types ──────────────────────────────────────────────────────────────────
type SortableRepoItem = Project | Tool | Library
type SortKey = "stars" | "forks" | "recent" | "trending" | "year"
type PortfolioSortKey = "stars" | "followers" | "year"

// ─── Repo-based sorting (Projects, Tools, Libraries) ────────────────────────

/**
 * Sort items by GitHub stars (descending).
 */
export function sortByStars<T extends SortableRepoItem>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => (b.githubStats?.stars ?? 0) - (a.githubStats?.stars ?? 0)
  )
}

/**
 * Sort items by GitHub forks (descending).
 */
export function sortByForks<T extends SortableRepoItem>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => (b.githubStats?.forks ?? 0) - (a.githubStats?.forks ?? 0)
  )
}

/**
 * Sort items by most recent activity — `lastUpdated` field (descending).
 * Items without a date are pushed to the end.
 */
export function sortByRecentActivity<T extends SortableRepoItem>(
  items: T[]
): T[] {
  return [...items].sort((a, b) => {
    const dateA = a.githubStats?.lastUpdated
    const dateB = b.githubStats?.lastUpdated
    if (!dateA && !dateB) return 0
    if (!dateA) return 1
    if (!dateB) return -1
    return new Date(dateB).getTime() - new Date(dateA).getTime()
  })
}

/**
 * Sort items by a trending score: `stars × 0.7 + forks × 0.3` (descending).
 */
export function sortByTrending<T extends SortableRepoItem>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const scoreA =
      (a.githubStats?.stars ?? 0) * 0.7 + (a.githubStats?.forks ?? 0) * 0.3
    const scoreB =
      (b.githubStats?.stars ?? 0) * 0.7 + (b.githubStats?.forks ?? 0) * 0.3
    return scoreB - scoreA
  })
}

/**
 * Sort items by year (descending — newest first).
 */
export function sortByYear<T extends { year: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => b.year - a.year)
}

/**
 * Convenience dispatcher for repo-based items.
 * Use this in page components with a dynamic sort key from searchParams.
 *
 * @example
 * const sorted = sortRepoItems(projects, searchParams.sort ?? "trending")
 */
export function sortRepoItems<T extends SortableRepoItem>(
  items: T[],
  sortKey: SortKey
): T[] {
  switch (sortKey) {
    case "stars":
      return sortByStars(items)
    case "forks":
      return sortByForks(items)
    case "recent":
      return sortByRecentActivity(items)
    case "trending":
      return sortByTrending(items)
    case "year":
      return sortByYear(items)
    default:
      return sortByYear(items)
  }
}

// ─── Portfolio-specific sorting ─────────────────────────────────────────────

/**
 * Sort portfolios by total GitHub stars across all repos (descending).
 */
export function sortPortfoliosByStars(items: Portfolio[]): Portfolio[] {
  return [...items].sort(
    (a, b) =>
      (b.githubStats?.totalStars ?? 0) - (a.githubStats?.totalStars ?? 0)
  )
}

/**
 * Sort portfolios by GitHub followers (descending).
 */
export function sortPortfoliosByFollowers(items: Portfolio[]): Portfolio[] {
  return [...items].sort(
    (a, b) =>
      (b.githubStats?.followers ?? 0) - (a.githubStats?.followers ?? 0)
  )
}

/**
 * Convenience dispatcher for portfolio items.
 *
 * @example
 * const sorted = sortPortfolioItems(portfolios, searchParams.sort ?? "stars")
 */
export function sortPortfolioItems(
  items: Portfolio[],
  sortKey: PortfolioSortKey
): Portfolio[] {
  switch (sortKey) {
    case "stars":
      return sortPortfoliosByStars(items)
    case "followers":
      return sortPortfoliosByFollowers(items)
    case "year":
      return sortByYear(items)
    default:
      return sortPortfoliosByStars(items)
  }
}

// ─── Exported sort key constants (for UI dropdowns / validation) ────────────

export const REPO_SORT_OPTIONS = [
  { value: "trending", label: "Trending" },
  { value: "stars", label: "Most Stars" },
  { value: "forks", label: "Most Forks" },
  { value: "recent", label: "Recently Active" },
  { value: "year", label: "Newest First" },
] as const

export const PORTFOLIO_SORT_OPTIONS = [
  { value: "stars", label: "Most Stars" },
  { value: "followers", label: "Most Followers" },
  { value: "year", label: "Newest First" },
] as const
