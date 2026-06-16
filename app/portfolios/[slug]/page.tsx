import {
  getPortfolioBySlug,
  getPortfolios,
  getRelatedItems,
} from "@/lib/content"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { Globe, Star, Users } from "lucide-react"
import { Icons } from "@/components/icons"
import { Tag } from "@/components/tag"
import { MDXContent } from "@/components/mdx-content"
import { cn } from "@/lib/utils"
import { PortfolioCard } from "@/components/portfolio-card"
import Link from "next/link"

export async function generateStaticParams() {
  const portfolios = await getPortfolios()
  return portfolios.map((p) => ({
    slug: p.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const portfolio = await getPortfolioBySlug(resolvedParams.slug)
  if (!portfolio) return {}
  return {
    title: portfolio.name,
    description: portfolio.description,
  }
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const portfolio = await getPortfolioBySlug(resolvedParams.slug)
  if (!portfolio) notFound()

  const allPortfolios = await getPortfolios()
  const relatedPortfolios = await getRelatedItems(portfolio, allPortfolios, 2)
  const githubStats = portfolio.githubStats

  const typeColors: Record<typeof portfolio.type, string> = {
    frontend: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    backend: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    fullstack: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    designer: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
    student: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    other: "bg-muted text-muted-foreground",
  }

  return (
    <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-12">
        {/* Sidebar */}
        <aside className="relative">
          <div className="sticky top-24 overflow-hidden rounded-3xl p-7 shadow-sm backdrop-blur">
            {/* Avatar */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-full border bg-muted text-4xl font-semibold tracking-tight">
                {portfolio.name.charAt(0)}
              </div>

              <div className="mt-5 space-y-3">
                <span
                  className={cn(
                    "inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-[0.18em] uppercase",
                    typeColors[portfolio.type]
                  )}
                >
                  {portfolio.type}
                </span>

                <div>
                  <h1 className="text-2xl font-bold tracking-tight">
                    {portfolio.name}
                  </h1>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {portfolio.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="mt-7 flex items-center justify-center gap-2 border-t pt-6">
              {portfolio.website && (
                <Link
                  href={portfolio.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border bg-background p-2.5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-foreground"
                >
                  <Globe className="h-4 w-4" />
                </Link>
              )}
              {portfolio.github && (
                <Link
                  href={portfolio.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border bg-background p-2.5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-foreground"
                >
                  <Icons.github className="h-4 w-4" />
                </Link>
              )}
              {portfolio.twitter && (
                <Link
                  href={portfolio.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border bg-background p-2.5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-foreground"
                >
                  <Icons.twitter className="h-4 w-4" />
                </Link>
              )}
              {portfolio.linkedin && (
                <Link
                  href={portfolio.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border bg-background p-2.5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-foreground"
                >
                  <Icons.linkedin className="h-4 w-4" />
                </Link>
              )}
            </div>

            {/* GitHub Stats */}
            {githubStats &&
              (githubStats.totalStars > 0 || githubStats.followers > 0) && (
                <div className="mt-7 border-t pt-6">
                  <h3 className="mb-4 text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                    GitHub Stats
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border bg-background p-3 text-center">
                      <div className="flex items-center justify-center gap-1 text-amber-500">
                        <Star className="h-3.5 w-3.5" />
                        <span className="text-lg font-bold text-foreground">
                          {githubStats!.totalStars.toLocaleString()}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Total Stars
                      </p>
                    </div>
                    <div className="rounded-xl border bg-background p-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-lg font-bold text-foreground">
                          {githubStats!.followers.toLocaleString()}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Followers
                      </p>
                    </div>
                  </div>
                </div>
              )}

            {/* Skills */}
            <div className="mt-7 border-t pt-6">
              <h3 className="mb-4 text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                Skills &amp; Tech
              </h3>
              <div className="flex flex-wrap gap-2">
                {portfolio.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="min-w-0">
          <div className="overflow-hidden rounded-3xl bg-card/80 shadow-sm backdrop-blur">
            <div className="px-8 py-8 sm:px-10">
              <div className="prose prose-neutral dark:prose-invert prose-headings:scroll-mt-24 prose-pre:rounded-2xl prose-img:rounded-2xl max-w-none">
                <MDXContent source={portfolio.content} />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Related */}
      {relatedPortfolios.length > 0 && (
        <section className="mt-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                Explore More
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                Related Developers
              </h2>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {relatedPortfolios.map((p) => (
              <PortfolioCard key={p.slug} portfolio={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
