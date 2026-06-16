import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Project, Portfolio, Tool, Library } from "@/types"

const contentDir = path.join(process.cwd(), "content")

function getSlug(filename: string) {
  return filename.replace(/\.mdx?$/, "")
}

function readDir(folder: string): string[] {
  const dir = path.join(contentDir, folder)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
}

export async function getProjects(): Promise<Project[]> {
  const files = readDir("projects")
  const items = await Promise.all(
    files.map(async (file) => {
      const raw = fs.readFileSync(
        path.join(contentDir, "projects", file),
        "utf-8"
      )
      const { data, content } = matter(raw)
      const githubStats = data.githubStats || {
        stars: 0,
        forks: 0,
        lastUpdated: null,
        language: null,
      }
      return {
        slug: getSlug(file),
        title: data.title ?? "",
        description: data.description ?? "",
        github: data.github,
        website: data.website,
        author: data.author ?? "",
        tags: data.tags ?? [],
        featured: data.featured ?? false,
        status: data.status ?? "active",
        year: data.year ?? new Date().getFullYear(),
        coverImage: data.coverImage,
        content,
        githubStats,
      } as Project
    })
  )
  return items
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | undefined> {
  const all = await getProjects()
  return all.find((p) => p.slug === slug)
}

export async function getPortfolios(): Promise<Portfolio[]> {
  const files = readDir("portfolios")
  const items = await Promise.all(
    files.map(async (file) => {
      const raw = fs.readFileSync(
        path.join(contentDir, "portfolios", file),
        "utf-8"
      )
      const { data, content } = matter(raw)
      const githubStats = data.githubStats || {
        totalStars: 0,
        followers: 0,
        publicRepos: 0,
      }
      return {
        slug: getSlug(file),
        title: data.title ?? "",
        name: data.name ?? data.title ?? "",
        description: data.description ?? "",
        website: data.website,
        github: data.github,
        twitter: data.twitter,
        linkedin: data.linkedin,
        avatar: data.avatar,
        tags: data.tags ?? [],
        type: data.type ?? "fullstack",
        featured: data.featured ?? false,
        year: data.year ?? new Date().getFullYear(),
        content,
        githubStats,
      } as Portfolio
    })
  )
  return items
}

export async function getPortfolioBySlug(
  slug: string
): Promise<Portfolio | undefined> {
  const all = await getPortfolios()
  return all.find((p) => p.slug === slug)
}

export async function getTools(): Promise<Tool[]> {
  const files = readDir("tools")
  const items = await Promise.all(
    files.map(async (file) => {
      const raw = fs.readFileSync(path.join(contentDir, "tools", file), "utf-8")
      const { data, content } = matter(raw)
      const githubStats = data.githubStats || {
        stars: 0,
        forks: 0,
        lastUpdated: null,
        language: null,
      }
      return {
        slug: getSlug(file),
        title: data.title ?? "",
        description: data.description ?? "",
        website: data.website,
        github: data.github,
        author: data.author ?? "",
        tags: data.tags ?? [],
        featured: data.featured ?? false,
        free: data.free ?? true,
        year: data.year ?? new Date().getFullYear(),
        coverImage: data.coverImage,
        content,
        githubStats,
      } as Tool
    })
  )
  return items
}

export async function getToolBySlug(slug: string): Promise<Tool | undefined> {
  const all = await getTools()
  return all.find((t) => t.slug === slug)
}

export async function getLibraries(): Promise<Library[]> {
  const files = readDir("libraries")
  const items = await Promise.all(
    files.map(async (file) => {
      const raw = fs.readFileSync(
        path.join(contentDir, "libraries", file),
        "utf-8"
      )
      const { data, content } = matter(raw)
      const githubStats = data.githubStats || {
        stars: 0,
        forks: 0,
        lastUpdated: null,
        language: null,
      }
      return {
        slug: getSlug(file),
        title: data.title ?? "",
        description: data.description ?? "",
        github: data.github,
        npm: data.npm,
        author: data.author ?? "",
        tags: data.tags ?? [],
        featured: data.featured ?? false,
        year: data.year ?? new Date().getFullYear(),
        content,
        githubStats,
      } as Library
    })
  )
  return items
}

export async function getLibraryBySlug(
  slug: string
): Promise<Library | undefined> {
  const all = await getLibraries()
  return all.find((l) => l.slug === slug)
}

export async function getAllTags(): Promise<string[]> {
  const [projects, portfolios, tools, libraries] = await Promise.all([
    getProjects(),
    getPortfolios(),
    getTools(),
    getLibraries(),
  ])
  const all = [
    ...projects.flatMap((p) => p.tags),
    ...portfolios.flatMap((p) => p.tags),
    ...tools.flatMap((t) => t.tags),
    ...libraries.flatMap((l) => l.tags),
  ]
  const counts: Record<string, number> = {}
  all.forEach((tag) => {
    counts[tag] = (counts[tag] ?? 0) + 1
  })
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag)
}

export async function getSiteStats() {
  const [projects, portfolios, tools, libraries] = await Promise.all([
    getProjects(),
    getPortfolios(),
    getTools(),
    getLibraries(),
  ])
  return {
    projects: projects.length,
    portfolios: portfolios.length,
    tools: tools.length,
    libraries: libraries.length,
  }
}

export async function getRelatedItems<
  T extends { slug: string; tags: string[] },
>(currentItem: T, allItems: T[], limit: number = 3): Promise<T[]> {
  return allItems
    .filter((item) => item.slug !== currentItem.slug)
    .map((item) => {
      const sharedTags = item.tags.filter((tag) =>
        currentItem.tags.includes(tag)
      )
      return { item, score: sharedTags.length }
    })
    .filter((data) => data.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((data) => data.item)
}
