"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface GithubStatsProps {
  repoUrl: string
  className?: string
}

export function GithubStats({ repoUrl, className }: GithubStatsProps) {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    if (!repoUrl || !repoUrl.includes("github.com/")) return

    const fetchStars = async () => {
      try {
        const urlParts = repoUrl.split("github.com/")[1].split("/")
        if (urlParts.length < 2) return

        const owner = urlParts[0]
        const repo = urlParts[1].replace(/\/$/, "") // remove trailing slash if any

        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
        if (!res.ok) return

        const data = await res.json()
        setStars(data.stargazers_count)
      } catch (error) {
        console.error("Failed to fetch github stats", error)
      }
    }

    fetchStars()
  }, [repoUrl])

  if (stars === null) return null

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-amber-500",
        className
      )}
      title={`${stars.toLocaleString()} GitHub stars`}
    >
      <Star className="h-3.5 w-3.5" />
      <span>{stars.toLocaleString()}</span>
    </div>
  )
}
