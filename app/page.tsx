import { Hero } from "@/components/hero"
import { SectionHeader } from "@/components/section-header"
import { ProjectCard } from "@/components/project-card"
import { PortfolioCard } from "@/components/portfolio-card"
import { ToolCard } from "@/components/tool-card"
import { LibraryCard } from "@/components/library-card"
import { Tag } from "@/components/tag"
import {
  getProjects,
  getPortfolios,
  getTools,
  getLibraries,
  getSiteStats,
  getAllTags,
} from "@/lib/content"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Icons } from "@/components/icons"

export default async function HomePage() {
  const projects = await getProjects()
  const portfolios = await getPortfolios()
  const tools = await getTools()
  const libraries = await getLibraries()
  const stats = await getSiteStats()
  const allTags = (await getAllTags()).slice(0, 20)

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3)
  const latestProjects = projects.slice(0, 6)
  const featuredPortfolios = portfolios.filter((p) => p.featured).slice(0, 3)
  const featuredTools = tools.filter((t) => t.featured).slice(0, 3)
  const featuredLibraries = libraries.filter((l) => l.featured).slice(0, 2)

  return (
    <>
      <Hero stats={stats} />

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 sm:px-6">
        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <section>
            <SectionHeader
              title="Featured Projects"
              subtitle="Handpicked open-source creations from the BD community"
              href="/projects"
            />
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* Latest Added */}
        <section>
          <SectionHeader
            title="Latest Added"
            subtitle="Fresh projects submitted by the community"
            href="/projects"
          />
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latestProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        {/* Tags cloud */}
        {allTags.length > 0 && (
          <section>
            <SectionHeader
              title="Browse by Tag"
              subtitle="Filter content by technology or category"
            />
            <div className="mt-5 flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/projects?tag=${encodeURIComponent(tag)}`}
                >
                  <Tag
                    label={tag}
                    className="cursor-pointer px-3 py-1 text-sm"
                  />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Featured Portfolios */}
        {featuredPortfolios.length > 0 && (
          <section>
            <SectionHeader
              title="Featured Developers"
              subtitle="Talented Bangladeshi developers putting their best work forward"
              href="/portfolios"
            />
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPortfolios.map((portfolio) => (
                <PortfolioCard key={portfolio.slug} portfolio={portfolio} />
              ))}
            </div>
          </section>
        )}

        {/* Tools & Libraries side by side */}
        <div className="grid gap-10 lg:grid-cols-2">
          {featuredTools.length > 0 && (
            <section>
              <SectionHeader title="Trending Tools" href="/tools" />
              <div className="mt-5 grid gap-4">
                {featuredTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </section>
          )}

          {featuredLibraries.length > 0 && (
            <section>
              <SectionHeader title="Popular Libraries" href="/libraries" />
              <div className="mt-5 grid gap-4">
                {featuredLibraries.map((library) => (
                  <LibraryCard key={library.slug} library={library} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* CTA */}
        <section className="rounded-2xl border border-dashed border-border/80 bg-muted/30 p-10 text-center">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            Built something awesome? 🚀
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Submit your project, portfolio, tool, or library to get discovered
            by the Bangladeshi developer community.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Submit Yours
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="https://github.com/browse-pro-bd/browse"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              <Icons.github className="h-4 w-4" />
              Star on GitHub
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
