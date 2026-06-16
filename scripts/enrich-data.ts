import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import { fetchRepoStats, fetchUserStats } from "../lib/github"

const CONTENT_DIR = path.join(process.cwd(), "content")
const CATEGORIES = ["projects", "portfolios", "tools", "libraries"]

async function enrichFiles() {
  console.log("Starting data enrichment process...")

  for (const category of CATEGORIES) {
    const categoryPath = path.join(CONTENT_DIR, category)

    try {
      const files = await fs.readdir(categoryPath)
      const mdxFiles = files.filter((f) => f.endsWith(".mdx"))

      for (const file of mdxFiles) {
        const filePath = path.join(categoryPath, file)
        const fileContent = await fs.readFile(filePath, "utf-8")

        // Parse frontmatter
        const parsed = matter(fileContent)
        let isModified = false

        // 1. Ensure `featured` exists (default to false if not present)
        if (typeof parsed.data.featured === "undefined") {
          parsed.data.featured = false
          isModified = true
        }

        // 2. Fetch and set GitHub stats if URL exists
        const githubUrl = parsed.data.github
        if (githubUrl) {
          if (category === "portfolios") {
            const stats = await fetchUserStats(githubUrl)
            // Only update if we successfully fetched data
            if (stats.totalStars > 0 || stats.followers > 0) {
              if (
                parsed.data.githubStats?.totalStars !== stats.totalStars ||
                parsed.data.githubStats?.followers !== stats.followers
              ) {
                parsed.data.githubStats = stats
                isModified = true
              }
            }
          } else {
            // Projects, Tools, Libraries
            const stats = await fetchRepoStats(githubUrl)
            if (stats.stars > 0 || stats.forks > 0) {
              if (
                parsed.data.githubStats?.stars !== stats.stars ||
                parsed.data.githubStats?.forks !== stats.forks ||
                parsed.data.githubStats?.lastUpdated !== stats.lastUpdated
              ) {
                parsed.data.githubStats = stats
                isModified = true
              }
            }
          }
        }

        // 3. Write back to file if modified
        if (isModified) {
          console.log(`Updating ${category}/${file}...`)
          const updatedContent = matter.stringify(parsed.content, parsed.data)
          await fs.writeFile(filePath, updatedContent, "utf-8")
        }
      }
    } catch (err) {
      console.error(`Error processing category ${category}:`, err)
    }
  }

  console.log("Data enrichment complete!")
}

enrichFiles().catch(console.error)
