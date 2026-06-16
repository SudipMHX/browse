import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | browse.pro.bd",
  description: "Terms of service for browse.pro.bd",
}

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground">
        Terms of Service
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Last updated: May 20, 2026
      </p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <p>
          Welcome to <strong>browse.pro.bd</strong>. By using our website, you
          agree to comply with and be bound by the following terms and
          conditions of use.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-foreground">
          1. Acceptance of Terms
        </h2>
        <p>
          By accessing and browsing this site, you accept, without limitation or
          qualification, these Terms of Service. If you do not agree to these
          terms, please do not use the website.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-foreground">
          2. Use License and Content Submission
        </h2>
        <p>
          browse.pro.bd is an open directory showcasing Bangladeshi developers,
          projects, libraries, and tools.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            You retain ownership of any details/metadata you submit through our
            submission system.
          </li>
          <li>
            By submitting, you grant browse.pro.bd a non-exclusive, worldwide,
            royalty-free license to display, index, and organize this
            information publicly.
          </li>
          <li>
            We reserve the right to review, edit, reject, or remove any
            submission at our sole discretion, particularly content that is
            offensive, spammy, or inaccurate.
          </li>
        </ul>

        <h2 className="mt-8 text-xl font-semibold text-foreground">
          3. Disclaimer
        </h2>
        <p>
          The materials on this website are provided on an &apos;as is&apos;
          basis. browse.pro.bd makes no warranties, expressed or implied, and
          hereby disclaims and negates all other warranties including, without
          limitation, implied warranties of merchantability, fitness for a
          particular purpose, or non-infringement of intellectual property.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-foreground">
          4. Limitations of Liability
        </h2>
        <p>
          In no event shall browse.pro.bd or its contributors be liable for any
          damages (including, without limitation, damages for loss of data or
          profit, or due to business interruption) arising out of the use or
          inability to use the materials on this website.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-foreground">
          5. Governing Law
        </h2>
        <p>
          Any claim relating to browse.pro.bd shall be governed by the laws of
          Bangladesh without regard to its conflict of law provisions.
        </p>
      </div>
    </main>
  )
}
