import { getProjectBySlug, getProjects, getRelatedItems } from "@/lib/content"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { Globe, User, Tag as TagIcon, Star, GitFork, Clock } from "lucide-react"
import { Tag } from "@/components/tag"
import { MDXContent } from "@/components/mdx-content"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ProjectCard } from "@/components/project-card"
import Link from "next/link"
import Image from "next/image"

export const dynamicParams = false

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const project = await getProjectBySlug(resolvedParams.slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.description,
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const project = await getProjectBySlug(resolvedParams.slug)
  if (!project) notFound()

  const allProjects = await getProjects()
  const relatedProjects = await getRelatedItems(project, allProjects, 4)
  const githubStats = project.githubStats

  const statusColors = {
    active: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    wip: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    archived: "bg-muted text-muted-foreground",
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      {/* Header */}
      <header className="mb-12">
        <div className="mb-6 flex items-center gap-3">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
              statusColors[project.status]
            )}
          >
            {project.status}
          </span>
          <span className="text-sm text-muted-foreground">{project.year}</span>
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {project.title}
        </h1>
        <p className="text-lg text-muted-foreground sm:text-xl">
          {project.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-y border-border/60 py-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="font-medium text-foreground">
              {project.author}
            </span>
          </div>
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Icons.github className="h-4 w-4" />
              Source Code
            </Link>
          )}
          {project.website && (
            <Link
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Globe className="h-4 w-4" />
              Live Website
            </Link>
          )}
        </div>

        {githubStats && (githubStats.stars > 0 || githubStats.forks > 0) && (
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4 border-b border-border/60 pb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2" title="GitHub Stars">
              <Star className="h-4 w-4 text-amber-500" />
              <span className="font-medium text-foreground">
                {githubStats.stars.toLocaleString()}
              </span>
              <span>stars</span>
            </div>
            <div className="flex items-center gap-2" title="GitHub Forks">
              <GitFork className="h-4 w-4" />
              <span className="font-medium text-foreground">
                {githubStats.forks.toLocaleString()}
              </span>
              <span>forks</span>
            </div>
            {githubStats.lastUpdated && (
              <div className="flex items-center gap-2" title="Last Updated">
                <Clock className="h-4 w-4" />
                <span>
                  Updated{" "}
                  {new Date(githubStats.lastUpdated).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "short", day: "numeric" }
                  )}
                </span>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Cover Image */}
      {project.coverImage && (
        <div className="mb-12 overflow-hidden rounded-2xl border border-border bg-muted">
          <Image
            width={1200}
            height={600}
            quality={80}
            loading="lazy"
            src={project.coverImage}
            alt={project.title}
            className="w-full object-cover"
          />
        </div>
      )}

      {/* Tags */}
      <div className="mb-12 flex items-center gap-3">
        <TagIcon className="h-4 w-4 text-muted-foreground" />
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXContent source={project.content} />
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <div className="mt-24 border-t border-border/60 pt-12">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
            Related Projects
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {relatedProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
