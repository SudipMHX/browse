import type { GitHubRepoStats, GitHubUserStats } from "@/types"

function extractRepoPath(url: string): string | null {
  try {
    const match = url.match(/github\.com\/([^/]+\/[^/]+?)(?:\.git)?(?:\/.*)?$/)
    return match ? match[1] : null
  } catch {
    return null
  }
}

function extractUsername(url: string): string | null {
  try {
    const match = url.match(/github\.com\/([^/]+?)(?:\/.*)?$/)
    return match ? match[1] : null
  } catch {
    return null
  }
}

function buildHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  }
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  return headers
}

export async function fetchRepoStats(
  githubUrl: string
): Promise<GitHubRepoStats> {
  const empty: GitHubRepoStats = { stars: 0, forks: 0, lastUpdated: null, language: null }
  if (!githubUrl) return empty

  const repoPath = extractRepoPath(githubUrl)
  if (!repoPath) return empty

  try {
    const res = await fetch(`https://api.github.com/repos/${repoPath}`, {
      headers: buildHeaders(),
    })

    if (!res.ok) return empty

    const data = await res.json()
    return {
      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
      lastUpdated: data.pushed_at ?? null,
      language: data.language ?? null,
    }
  } catch {
    return empty
  }
}

export async function fetchUserStats(
  githubUrl: string
): Promise<GitHubUserStats> {
  const empty: GitHubUserStats = { totalStars: 0, followers: 0, publicRepos: 0 }
  if (!githubUrl) return empty

  const username = extractUsername(githubUrl)
  if (!username) return empty

  try {
    const headers = buildHeaders()

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers }),
      fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&type=owner`,
        { headers }
      ),
    ])

    if (!userRes.ok) return empty

    const userData = await userRes.json()
    let totalStars = 0

    if (reposRes.ok) {
      const repos = await reposRes.json()
      if (Array.isArray(repos)) {
        totalStars = repos.reduce(
          (acc: number, repo: { stargazers_count?: number }) =>
            acc + (repo.stargazers_count ?? 0),
          0
        )
      }
    }

    return {
      totalStars,
      followers: userData.followers ?? 0,
      publicRepos: userData.public_repos ?? 0,
    }
  } catch {
    return empty
  }
}
