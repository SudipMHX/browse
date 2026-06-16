import { getLibraryBySlug, getLibraries, getRelatedItems } from "@/lib/content"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { Package, User } from "lucide-react"
import { Tag } from "@/components/tag"
import { MDXContent } from "@/components/mdx-content"
import { Icons } from "@/components/icons"
import { LibraryCard } from "@/components/library-card"
import Link from "next/link"

export const dynamicParams = false

export async function generateStaticParams() {
  const libs = await getLibraries()
  return libs.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const lib = await getLibraryBySlug(resolvedParams.slug)
  if (!lib) return {}
  return {
    title: lib.title,
    description: lib.description,
  }
}

export default async function LibraryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const lib = await getLibraryBySlug(resolvedParams.slug)
  if (!lib) notFound()

  const allLibs = await getLibraries()
  const relatedLibs = await getRelatedItems(lib, allLibs, 3)

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <header className="mb-12 flex flex-col items-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-muted">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {lib.title}
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
          {lib.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span className="font-medium text-foreground">{lib.author}</span>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          {lib.npm && (
            <Link
              href={lib.npm}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#cb3837] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Package className="h-4 w-4" />
              View on npm
            </Link>
          )}
          {lib.github && (
            <Link
              href={lib.github}
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

      <div className="mb-12 flex flex-wrap justify-center gap-2 border-y border-border/60 py-6">
        {lib.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXContent source={lib.content} />
      </div>

      {relatedLibs.length > 0 && (
        <div className="mt-24 border-t border-border/60 pt-12">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
            Related Libraries
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedLibs.map((l) => (
              <LibraryCard key={l.slug} library={l} />
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
