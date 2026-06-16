import Link from "next/link"
import { Globe, User, Star, GitFork } from "lucide-react"
import { Tag } from "@/components/tag"
import type { Project } from "@/types"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import Image from "next/image"

interface ProjectCardProps {
  project: Project
  className?: string
}

const statusConfig: Record<
  Project["status"],
  { label: string; className: string }
> = {
  active: {
    label: "Active",
    className:
      "bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400",
  },
  wip: {
    label: "WIP",
    className:
      "bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/20 dark:text-amber-400",
  },
  archived: {
    label: "Archived",
    className: "bg-muted text-muted-foreground ring-1 ring-border",
  },
}

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toString()
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const status = statusConfig[project.status]
  const hasStats =
    project.githubStats &&
    (project.githubStats.stars > 0 || project.githubStats.forks > 0)

  return (
    <article
      className={cn(
        "group relative flex animate-in flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 duration-500 fill-mode-both fade-in slide-in-from-bottom-4 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lg",
        className
      )}
    >
      {/* Cover image / gradient banner */}
      <Link
        href={`/projects/${project.slug}`}
        className="block shrink-0 overflow-hidden"
      >
        <div className="relative flex h-40 items-center justify-center border-b border-border bg-gradient-to-br from-muted/60 via-muted to-muted/40 transition-transform duration-500 group-hover:scale-[1.03]">
          {project.coverImage ? (
            <Image
              width={1200}
              height={600}
              quality={80}
              loading="lazy"
              src={project.coverImage}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-5xl font-black text-muted-foreground/10 transition-all duration-300 select-none group-hover:text-muted-foreground/15">
              {project.title.charAt(0)}
            </span>
          )}
          <div
            className={cn(
              "absolute top-3 flex w-full px-2",
              hasStats ? "justify-between" : "justify-end"
            )}
          >
            {hasStats && (
              <div
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold",
                  status.className
                )}
              >
                {project.githubStats!.stars > 0 && (
                  <span className="flex items-center gap-0.5 text-amber-500">
                    <Star className="h-3 w-3" />
                    {formatNumber(project.githubStats!.stars)}
                  </span>
                )}

                {project.githubStats!.forks > 0 && (
                  <span className="flex items-center gap-0.5">
                    <GitFork className="h-3 w-3" />
                    {formatNumber(project.githubStats!.forks)}
                  </span>
                )}
              </div>
            )}

            {/* Status badge */}
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs font-semibold",
                status.className
              )}
            >
              {status.label}
            </span>
          </div>
        </div>
      </Link>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Title */}
        <Link href={`/projects/${project.slug}`}>
          <h3 className="line-clamp-1 leading-snug font-semibold text-foreground transition-colors hover:text-primary">
            {project.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <Tag key={tag} label={tag} className="px-2 text-[9px]" />
          ))}
          {project.tags.length > 3 && (
            <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-3">
          {/* Left: author + stats */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3 shrink-0" />
              <span className="max-w-[80px] truncate">{project.author}</span>
            </span>
          </div>
          {/* Right: links */}
          <div className="flex shrink-0 items-center gap-1.5">
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="GitHub repository"
              >
                <Icons.github className="h-3.5 w-3.5" />
              </Link>
            )}
            {project.website && (
              <Link
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Live website"
              >
                <Globe className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
