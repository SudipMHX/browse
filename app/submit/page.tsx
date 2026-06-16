import { Metadata } from "next"
import { SectionHeader } from "@/components/section-header"
import { CheckCircle2 } from "lucide-react"
import { Icons } from "@/components/icons"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Submit a Project",
  description:
    "Learn how to submit your project, portfolio, tool, or library to browse.pro.bd",
}

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <SectionHeader
        title="Submit Your Work"
        subtitle="Get discovered by the Bangladeshi developer community."
        className="mb-12"
      />

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="lead text-lg text-muted-foreground">
          browse.pro.bd is completely open-source and content is managed via
          GitHub. Submitting your work is as easy as creating a Pull Request
          with a single Markdown file.
        </p>

        <div className="my-10 space-y-6">
          <div className="flex gap-4 rounded-xl border border-border bg-card p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              1
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Fork the repository
              </h3>
              <p className="mt-2 text-muted-foreground">
                Head over to our GitHub repository and create a fork to your own
                account.
              </p>
              <Link
                href="https://github.com/browse-pro-bd/browse"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                <Icons.github className="h-4 w-4" />
                View Repository
              </Link>
            </div>
          </div>

          <div className="flex gap-4 rounded-xl border border-border bg-card p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              2
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Create an MDX file
              </h3>
              <p className="mt-2 text-muted-foreground">
                Add a new <code>.mdx</code> file in the appropriate folder (
                <code>content/projects/</code>, <code>content/portfolios/</code>
                , etc.).
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-xl border border-border bg-card p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              3
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Submit a Pull Request
              </h3>
              <p className="mt-2 text-muted-foreground">
                Commit your changes and open a PR against our main repository.
                We usually review within 24 hours!
              </p>
            </div>
          </div>
        </div>

        <h3 className="mt-12 text-xl font-semibold text-foreground">
          Example MDX Template
        </h3>
        <p className="text-muted-foreground">
          Here&apos;s what a project submission looks like:
        </p>

        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-muted/50 p-4 text-sm">
          <code>{`---
title: "My Awesome Project"
description: "A short, punchy description of what it does."
github: "https://github.com/username/repo"
website: "https://myproject.com"
author: "Your Name"
tags:
  - nextjs
  - open-source
featured: false
status: active
year: 2026
---

# About the project

Write a longer description here. You can use markdown to add features, 
explain the tech stack, and talk about why you built it.
`}</code>
        </pre>

        <div className="mt-12 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
            Quality Guidelines
          </h3>
          <ul className="mt-4 space-y-2 text-emerald-800/80 dark:text-emerald-200/80">
            <li>• Project must be created by a Bangladeshi developer/team</li>
            <li>• Include a high-quality description</li>
            <li>• Ensure all links are working</li>
            <li>• No spam or duplicate submissions</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
