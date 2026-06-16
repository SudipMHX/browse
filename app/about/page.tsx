import { Metadata } from "next"
import { SectionHeader } from "@/components/section-header"
import { Code2 } from "lucide-react"
import { Icons } from "@/components/icons"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the mission behind browse.pro.bd",
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="mb-12 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Code2 className="h-8 w-8" />
        </div>
      </div>

      <SectionHeader
        title="About browse.pro.bd"
        subtitle="A public showcase for the Bangladeshi tech ecosystem."
        className="mb-12 text-center"
        centered
      />

      <div className="prose prose-neutral dark:prose-invert mx-auto max-w-none">
        <p className="lead text-center text-lg text-muted-foreground">
          Our mission is to create a unified, high-quality directory that
          highlights the incredible work being done by software developers and
          designers in Bangladesh.
        </p>

        <hr className="my-12 border-border/60" />

        <h2 className="text-2xl font-semibold text-foreground">
          Why we built this
        </h2>
        <p className="mt-4 text-muted-foreground">
          Bangladesh has a rapidly growing tech sector with thousands of
          talented developers building open-source tools, robust SaaS platforms,
          and beautiful products. However, there was no single place to discover
          these creations or find the developers behind them.
        </p>
        <p className="mt-4 text-muted-foreground">
          <code>browse.pro.bd</code> was created to solve this problem. It acts
          as a curated &quot;Awesome List&quot; combined with a developer
          showcase.
        </p>

        <h2 className="mt-12 text-2xl font-semibold text-foreground">
          Open Source Philosophy
        </h2>
        <p className="mt-4 text-muted-foreground">
          We believe in the power of open source. That&apos;s why this entire
          platform is open-source and database-free. Every project, portfolio,
          tool, and library listed on the site is a Markdown file in our GitHub
          repository.
        </p>
        <p className="mt-4 text-muted-foreground">
          This means the community owns the data. Anyone can suggest edits, fix
          typos, or submit new entries via standard Pull Requests.
        </p>

        <div className="mt-16 flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-8 text-center">
          <h3 className="text-lg font-semibold text-foreground">
            Join the Community
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="https://github.com/browse-pro-bd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              <Icons.github className="h-4 w-4" />
              GitHub Organization
            </Link>
            <Link
              href="https://twitter.com/browsepro_bd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <Icons.twitter className="h-4 w-4" />
              Follow on Twitter
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
