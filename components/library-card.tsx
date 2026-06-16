import Link from "next/link"
import { Package, Star, GitFork } from "lucide-react"
import { Tag } from "@/components/tag"
import type { Library } from "@/types"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface LibraryCardProps {
  library: Library
  className?: string
}

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toString()
}

export function LibraryCard({ library, className }: LibraryCardProps) {
  return (
    <article
      className={cn(
        "group flex animate-in flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 duration-500 fill-mode-both fade-in slide-in-from-bottom-4 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lg",
        className
      )}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-[#cb3837]/10 to-red-500/5 shadow-sm transition-transform duration-300 group-hover:scale-110">
          <Package className="h-5 w-5 text-[#cb3837]/80" />
        </div>

        <div className="min-w-0 flex-1">
          <Link href={`/libraries/${library.slug}`}>
            <h3 className="line-clamp-1 leading-tight font-semibold text-foreground transition-colors hover:text-primary">
              {library.title}
            </h3>
          </Link>
          <p className="mt-0.5 text-xs text-muted-foreground">
            by {library.author}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {library.description}
      </p>

      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {library.tags.slice(0, 4).map((tag) => (
          <Tag key={tag} label={tag} className="px-2 py-0.5 text-[10px]" />
        ))}
        {library.tags.length > 4 && (
          <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            +{library.tags.length - 4}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="mt-2 flex items-center justify-between border-t border-border/50 pt-3">
        {/* Stats */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1 text-amber-500">
            <Star className="h-3 w-3" />
            {formatNumber(library.githubStats!.stars)}
          </span>

          <span className="flex items-center gap-1">
            <GitFork className="h-3 w-3" />
            {formatNumber(library.githubStats!.forks)}
          </span>
        </div>
        {/* Links */}
        <div className="flex items-center gap-1">
          {library.npm && (
            <Link
              href={library.npm}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#cb3837] transition-colors hover:bg-[#cb3837]/10"
            >
              <Package className="h-3.5 w-3.5" />
              npm
            </Link>
          )}
          {library.github && (
            <Link
              href={library.github}
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
