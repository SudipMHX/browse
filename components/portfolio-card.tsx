import Link from "next/link"
import { Globe, Star, Users } from "lucide-react"
import { Icons } from "@/components/icons"
import { Tag } from "@/components/tag"
import type { Portfolio } from "@/types"
import { cn } from "@/lib/utils"

interface PortfolioCardProps {
  portfolio: Portfolio
  className?: string
}

const typeConfig: Record<
  Portfolio["type"],
  { label: string; className: string; initial: string }
> = {
  frontend: {
    label: "Frontend",
    className:
      "bg-blue-500/10 text-blue-600 ring-1 ring-blue-500/20 dark:text-blue-400",
    initial: "bg-gradient-to-br from-blue-400 to-blue-600",
  },
  backend: {
    label: "Backend",
    className:
      "bg-purple-500/10 text-purple-600 ring-1 ring-purple-500/20 dark:text-purple-400",
    initial: "bg-gradient-to-br from-purple-400 to-purple-600",
  },
  fullstack: {
    label: "Full Stack",
    className:
      "bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400",
    initial: "bg-gradient-to-br from-emerald-400 to-teal-500",
  },
  designer: {
    label: "Designer",
    className:
      "bg-pink-500/10 text-pink-600 ring-1 ring-pink-500/20 dark:text-pink-400",
    initial: "bg-gradient-to-br from-pink-400 to-rose-500",
  },
  student: {
    label: "Student",
    className:
      "bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/20 dark:text-amber-400",
    initial: "bg-gradient-to-br from-amber-400 to-orange-500",
  },
  other: {
    label: "Other",
    className: "bg-muted text-muted-foreground ring-1 ring-border",
    initial: "bg-gradient-to-br from-muted to-muted-foreground/30",
  },
}

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toString()
}

export function PortfolioCard({ portfolio, className }: PortfolioCardProps) {
  const type = typeConfig[portfolio.type]

  return (
    <article
      className={cn(
        "group flex animate-in flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 duration-500 fill-mode-both fade-in slide-in-from-bottom-4 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lg",
        className
      )}
    >
      {/* Header: avatar + name + type badge */}
      <div className="flex items-start gap-3.5">
        {/* Avatar */}
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white shadow-sm",
            type.initial
          )}
        >
          {portfolio.name.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/portfolios/${portfolio.slug}`} className="min-w-0">
              <h3 className="truncate leading-tight font-semibold text-foreground transition-colors hover:text-primary">
                {portfolio.name}
              </h3>
            </Link>
            {/* <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider", type.className)}>
              {type.label}
            </span> */}
          </div>

          {/* GitHub stats inline */}
          <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1 text-amber-500">
              <Star className="h-3.5 w-3.5 fill-amber-500/20" />
              {formatNumber(portfolio.githubStats!.totalStars)}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {formatNumber(portfolio.githubStats!.followers)}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {portfolio.description}
      </p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {portfolio.tags.slice(0, 4).map((tag) => (
          <Tag key={tag} label={tag} className="px-1.5 py-0.5 text-[9px]" />
        ))}
        {portfolio.tags.length > 4 && (
          <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[9px] font-medium text-muted-foreground">
            +{portfolio.tags.length - 4}
          </span>
        )}
      </div>

      {/* Footer: social links */}
      <div className="mt-4 mt-auto flex items-center gap-1 pt-4">
        {portfolio.website && (
          <Link
            href={portfolio.website}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Portfolio website"
          >
            <Globe className="h-4 w-4" />
          </Link>
        )}
        {portfolio.github && (
          <Link
            href={portfolio.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="GitHub profile"
          >
            <Icons.github className="h-4 w-4" />
          </Link>
        )}
        {portfolio.linkedin && (
          <Link
            href={portfolio.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="LinkedIn"
          >
            <Icons.linkedin className="h-4 w-4" />
          </Link>
        )}
        <Link
          href={`/portfolios/${portfolio.slug}`}
          className="ml-auto shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-primary transition-colors hover:bg-primary/10"
        >
          View Profile &rarr;
        </Link>
      </div>
    </article>
  )
}
