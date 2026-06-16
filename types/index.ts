export interface GitHubRepoStats {
  stars: number
  forks: number
  lastUpdated: string | null
  language: string | null
}

export interface GitHubUserStats {
  totalStars: number
  followers: number
  publicRepos: number
}

export interface Project {
  slug: string
  title: string
  description: string
  github?: string
  website?: string
  author: string
  tags: string[]
  featured: boolean
  status: "active" | "archived" | "wip"
  year: number
  coverImage?: string
  content: string
  githubStats?: GitHubRepoStats
}

export interface Portfolio {
  slug: string
  title: string
  name: string
  description: string
  website?: string
  github?: string
  twitter?: string
  linkedin?: string
  avatar?: string
  tags: string[]
  type: "frontend" | "backend" | "fullstack" | "designer" | "student" | "other"
  featured: boolean
  year: number
  content: string
  githubStats?: GitHubUserStats
}

export interface Tool {
  slug: string
  title: string
  description: string
  website?: string
  github?: string
  author: string
  tags: string[]
  featured: boolean
  free: boolean
  year: number
  coverImage?: string
  content: string
  githubStats?: GitHubRepoStats
}

export interface Library {
  slug: string
  title: string
  description: string
  github?: string
  npm?: string
  author: string
  tags: string[]
  featured: boolean
  year: number
  content: string
  githubStats?: GitHubRepoStats
}

export type ContentType = "project" | "portfolio" | "tool" | "library"
