/**
 * enrich-stats.js — Build-time GitHub stats enrichment for browse.pro.bd
 *
 * Reads MDX files from content/, fetches live GitHub stats via the REST API,
 * and writes the results back into each file's YAML frontmatter.
 *
 * Environment variables:
 *   GH_PAT         — GitHub Personal Access Token (required for authenticated requests).
 *                    In GitHub Actions this is set to: secrets.GH_PAT || secrets.GITHUB_TOKEN
 *   ENRICH_MODE    — "changed" (default) or "full"
 *   CHANGED_FILES  — comma-separated list of paths (used when mode=changed)
 *
 * Usage:
 *   node scripts/enrich-stats.js                       # changed-only mode
 *   ENRICH_MODE=full node scripts/enrich-stats.js      # full mode
 */

import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"

// ─── Configuration ──────────────────────────────────────────────────────────
const CONTENT_DIR = path.join(process.cwd(), "content")
const CATEGORIES = ["projects", "portfolios", "tools", "libraries"]
const API_DELAY_MS = 300 // ms between API calls to avoid secondary rate limits

// Single token variable. In GitHub Actions, the workflow sets:
//   GH_PAT: ${{ secrets.GH_PAT || secrets.GITHUB_TOKEN }}
// When running locally, set GH_PAT in your shell or .env.
const GH_PAT = process.env.GH_PAT || ""

if (!GH_PAT) {
  console.warn("⚠️  No GH_PAT found — API calls will be unauthenticated (60 req/hr limit)")
}

// ─── Helpers ────────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function buildHeaders() {
  const headers = { Accept: "application/vnd.github+json" }
  if (GH_PAT) headers["Authorization"] = `Bearer ${GH_PAT}`
  return headers
}

/** Extract "owner/repo" from any GitHub repo URL */
function extractRepoPath(url) {
  const match = url.match(/github\.com\/([^/]+\/[^/]+?)(?:\.git)?(?:\/.*)?$/)
  return match ? match[1] : null
}

/** Extract "username" from any GitHub profile URL */
function extractUsername(url) {
  const match = url.match(/github\.com\/([^/]+?)(?:\/.*)?$/)
  return match ? match[1] : null
}

// ─── API Fetchers ───────────────────────────────────────────────────────────

/**
 * Fetch repo stats: stars, forks, lastUpdated, language
 * @param {string} githubUrl
 * @returns {Promise<{stars: number, forks: number, lastUpdated: string|null, language: string|null}>}
 */
async function fetchRepoStats(githubUrl) {
  const empty = { stars: 0, forks: 0, lastUpdated: null, language: null }
  if (!githubUrl) return empty

  const repoPath = extractRepoPath(githubUrl)
  if (!repoPath) {
    console.log(`  ⚠️  Could not parse repo path from: ${githubUrl}`)
    return empty
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${repoPath}`, {
      headers: buildHeaders(),
    })

    if (res.status === 404) {
      console.log(`  ⚠️  404 — repo not found: ${repoPath}`)
      return empty
    }
    if (res.status === 403 || res.status === 429) {
      const reset = res.headers.get("x-ratelimit-reset")
      console.log(`  ❌ Rate limited! Resets at ${new Date(reset * 1000).toISOString()}`)
      return empty
    }
    if (!res.ok) {
      console.log(`  ⚠️  HTTP ${res.status} for ${repoPath}`)
      return empty
    }

    const data = await res.json()
    return {
      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
      lastUpdated: data.pushed_at ?? null,
      language: data.language ?? null,
    }
  } catch (err) {
    console.log(`  ❌ Network error fetching ${repoPath}: ${err.message}`)
    return empty
  }
}

/**
 * Fetch user stats: totalStars, followers, publicRepos
 * @param {string} githubUrl
 * @returns {Promise<{totalStars: number, followers: number, publicRepos: number}>}
 */
async function fetchUserStats(githubUrl) {
  const empty = { totalStars: 0, followers: 0, publicRepos: 0 }
  if (!githubUrl) return empty

  const username = extractUsername(githubUrl)
  if (!username) {
    console.log(`  ⚠️  Could not parse username from: ${githubUrl}`)
    return empty
  }

  try {
    const headers = buildHeaders()

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers }),
      fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=stars`,
        { headers }
      ),
    ])

    if (userRes.status === 404) {
      console.log(`  ⚠️  404 — user not found: ${username}`)
      return empty
    }
    if (!userRes.ok) {
      console.log(`  ⚠️  HTTP ${userRes.status} for user ${username}`)
      return empty
    }

    const userData = await userRes.json()
    let totalStars = 0

    if (reposRes.ok) {
      const repos = await reposRes.json()
      if (Array.isArray(repos)) {
        totalStars = repos.reduce(
          (acc, repo) => acc + (repo.stargazers_count ?? 0),
          0
        )
      }
    }

    return {
      totalStars,
      followers: userData.followers ?? 0,
      publicRepos: userData.public_repos ?? 0,
    }
  } catch (err) {
    console.log(`  ❌ Network error fetching user ${username}: ${err.message}`)
    return empty
  }
}

// ─── File Discovery ─────────────────────────────────────────────────────────

/**
 * Determine which MDX files to process based on ENRICH_MODE.
 * @returns {Promise<{category: string, filePath: string}[]>}
 */
async function discoverFiles() {
  const mode = process.env.ENRICH_MODE || "changed"
  const changedRaw = process.env.CHANGED_FILES || ""

  if (mode === "changed" && changedRaw.trim()) {
    // Only process the files that were changed in the latest commit
    const changedPaths = changedRaw
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))

    console.log(`📝 Changed-only mode: ${changedPaths.length} file(s) to process`)

    return changedPaths
      .map((relPath) => {
        // relPath is like "content/projects/abc.mdx"
        const parts = relPath.split("/")
        if (parts.length < 3 || parts[0] !== "content") return null
        const category = parts[1]
        if (!CATEGORIES.includes(category)) return null
        return { category, filePath: path.join(process.cwd(), relPath) }
      })
      .filter(Boolean)
  }

  // Full mode: scan all categories
  console.log("📦 Full mode: scanning all content directories")
  const files = []

  for (const category of CATEGORIES) {
    const categoryPath = path.join(CONTENT_DIR, category)
    try {
      const entries = await fs.readdir(categoryPath)
      const mdxFiles = entries.filter(
        (f) => f.endsWith(".mdx") || f.endsWith(".md")
      )
      for (const file of mdxFiles) {
        files.push({ category, filePath: path.join(categoryPath, file) })
      }
    } catch {
      // Directory doesn't exist yet — skip
    }
  }

  console.log(`📦 Found ${files.length} total MDX file(s)`)
  return files
}

// ─── Main Enrichment Loop ───────────────────────────────────────────────────

async function enrichFiles() {
  console.log("🚀 Starting GitHub stats enrichment...\n")

  const files = await discoverFiles()
  if (files.length === 0) {
    console.log("✅ No files to process. Done!")
    return
  }

  let updatedCount = 0
  let skippedCount = 0
  let errorCount = 0

  for (const { category, filePath } of files) {
    const filename = path.basename(filePath)
    console.log(`\n── ${category}/${filename} ──`)

    try {
      const raw = await fs.readFile(filePath, "utf-8")
      const parsed = matter(raw)
      let isModified = false

      // Ensure `featured` field exists
      if (typeof parsed.data.featured === "undefined") {
        parsed.data.featured = false
        isModified = true
      }

      const githubUrl = parsed.data.github
      if (!githubUrl) {
        console.log("  ⏭️  No github URL — skipping API fetch")
        skippedCount++

        // Still write if other fields were modified (e.g., featured)
        if (isModified) {
          const updatedContent = matter.stringify(parsed.content, parsed.data)
          await fs.writeFile(filePath, updatedContent, "utf-8")
          updatedCount++
          console.log("  ✏️  Updated (non-stats fields only)")
        }
        continue
      }

      // Rate limit delay
      await sleep(API_DELAY_MS)

      if (category === "portfolios") {
        // ─── Portfolio: fetch user-level stats ───
        const stats = await fetchUserStats(githubUrl)
        const prev = parsed.data.githubStats || {}

        if (
          prev.totalStars !== stats.totalStars ||
          prev.followers !== stats.followers ||
          prev.publicRepos !== stats.publicRepos
        ) {
          parsed.data.githubStats = stats
          isModified = true
          console.log(
            `  📊 Stars: ${stats.totalStars} | Followers: ${stats.followers} | Repos: ${stats.publicRepos}`
          )
        } else {
          console.log("  ✅ Stats unchanged")
        }
      } else {
        // ─── Projects / Tools / Libraries: fetch repo-level stats ───
        const stats = await fetchRepoStats(githubUrl)
        const prev = parsed.data.githubStats || {}

        if (
          prev.stars !== stats.stars ||
          prev.forks !== stats.forks ||
          prev.lastUpdated !== stats.lastUpdated ||
          prev.language !== stats.language
        ) {
          parsed.data.githubStats = stats
          isModified = true
          console.log(
            `  📊 ⭐ ${stats.stars} | 🍴 ${stats.forks} | 🗓️ ${stats.lastUpdated} | 💻 ${stats.language}`
          )
        } else {
          console.log("  ✅ Stats unchanged")
        }
      }

      // Write back if anything changed
      if (isModified) {
        const updatedContent = matter.stringify(parsed.content, parsed.data)
        await fs.writeFile(filePath, updatedContent, "utf-8")
        updatedCount++
        console.log("  ✏️  File updated")
      }
    } catch (err) {
      errorCount++
      console.error(`  ❌ Error processing ${filename}: ${err.message}`)
    }
  }

  // ─── Summary ────────────────────────────────────────────────────────────
  console.log("\n" + "═".repeat(50))
  console.log(`✅ Enrichment complete!`)
  console.log(`   📝 Updated:  ${updatedCount}`)
  console.log(`   ⏭️  Skipped:  ${skippedCount}`)
  console.log(`   ❌ Errors:   ${errorCount}`)
  console.log(`   📦 Total:    ${files.length}`)
  console.log("═".repeat(50))
}

enrichFiles().catch((err) => {
  console.error("💥 Fatal error:", err)
  process.exit(1)
})
