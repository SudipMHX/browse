import { getToolBySlug, getTools, getRelatedItems } from "@/lib/content"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { Globe, Wrench, User } from "lucide-react"
import { Tag } from "@/components/tag"
import { MDXContent } from "@/components/mdx-content"
import { Icons } from "@/components/icons"
import { ToolCard } from "@/components/tool-card"
import Link from "next/link"
import Image from "next/image"

export const dynamicParams = false

export async function generateStaticParams() {
  const tools = await getTools()
  return tools.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const tool = await getToolBySlug(resolvedParams.slug)
  if (!tool) return {}
  return {
    title: tool.title,
    description: tool.description,
  }
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const tool = await getToolBySlug(resolvedParams.slug)
  if (!tool) notFound()

  const allTools = await getTools()
  const relatedTools = await getRelatedItems(tool, allTools, 3)

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <header className="mb-12 flex flex-col items-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-muted">
          <Wrench className="h-8 w-8 text-muted-foreground" />
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {tool.title}
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
          {tool.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span className="font-medium text-foreground">{tool.author}</span>
          </div>
          {tool.free && (
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Free to use
            </span>
          )}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          {tool.website && (
            <Link
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Globe className="h-4 w-4" />
              Visit Website
            </Link>
          )}
          {tool.github && (
            <Link
              href={tool.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              <Icons.github className="h-4 w-4" />
              Source Code
            </Link>
          )}
        </div>
      </header>

      {tool.coverImage && (
        <div className="mb-12 overflow-hidden rounded-2xl border border-border bg-muted">
          <Image
            width={1200}
            height={600}
            quality={80}
            loading="lazy"
            src={tool.coverImage}
            alt={tool.title}
            className="w-full object-cover"
          />
        </div>
      )}

      <div className="mb-12 flex flex-wrap justify-center gap-2 border-y border-border/60 py-6">
        {tool.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXContent source={tool.content} />
      </div>

      {relatedTools.length > 0 && (
        <div className="mt-24 border-t border-border/60 pt-12">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
            Related Tools
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
