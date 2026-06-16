import Link from "next/link"
import { Globe, Wrench, Star, GitFork } from "lucide-react"
import { Tag } from "@/components/tag"
import type { Tool } from "@/types"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface ToolCardProps {
  tool: Tool
  className?: string
}

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toString()
}

export function ToolCard({ tool, className }: ToolCardProps) {
  return (
    <article
      className={cn(
        "group flex animate-in flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 duration-500 fill-mode-both fade-in slide-in-from-bottom-4 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lg",
        className
      )}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-muted to-muted/60 shadow-sm transition-transform duration-300 group-hover:scale-110">
          <Wrench className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/tools/${tool.slug}`}>
              <h3 className="line-clamp-1 leading-tight font-semibold text-foreground transition-colors hover:text-primary">
                {tool.title}
              </h3>
            </Link>
            {/* {tool.free && (
              <span className="shrink-0 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400">
                Free
              </span>
            )} */}
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{tool.author}</p>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {tool.description}
      </p>

      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {tool.tags.slice(0, 4).map((tag) => (
          <Tag key={tag} label={tag} className="px-2 py-0.5 text-[10px]" />
        ))}
        {tool.tags.length > 4 && (
          <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            +{tool.tags.length - 4}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="mt-2 flex items-center justify-between border-border/50 pt-3">
        {/* Stats */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1 text-amber-500">
            <Star className="h-3 w-3" />
            {formatNumber(tool.githubStats!.stars)}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="h-3 w-3" />
            {formatNumber(tool.githubStats!.forks)}
          </span>
        </div>
        {/* Links */}
        <div className="flex items-center gap-1">
          {tool.website && (
            <Link
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Globe className="h-3.5 w-3.5" />
              Visit
            </Link>
          )}
          {tool.github && (
            <Link
              href={tool.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Icons.github className="h-3.5 w-3.5" />
              Source
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
