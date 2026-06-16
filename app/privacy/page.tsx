import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | browse.pro.bd",
  description: "Privacy policy for browse.pro.bd",
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground">
        Privacy Policy
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Last updated: May 20, 2026
      </p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <p>
          At <strong>browse.pro.bd</strong>, we value and respect your privacy.
          This Privacy Policy explains how we collect, use, and protect your
          information when you visit our website.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-foreground">
          1. Information We Collect
        </h2>
        <p>
          Since browse.pro.bd is a static site directory, we do not require user
          registration, and we do not maintain a database of personal user
          accounts.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Submission Data:</strong> When you submit a project,
            portfolio, tool, or library, the information you provide (name,
            email, URL, social links) is processed to generate static content
            pages. Only the information intended for public display is
            published.
          </li>
          <li>
            <strong>Analytics:</strong> We may use privacy-friendly static web
            analytics (e.g., Cloudflare Web Analytics) which do not track
            individual users or store personal data.
          </li>
        </ul>

        <h2 className="mt-8 text-xl font-semibold text-foreground">
          2. Cookies
        </h2>
        <p>
          We do not set tracking cookies or sell your personal data. Any cookie
          usage is limited to essential configurations, such as dark/light mode
          theme persistence.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-foreground">
          3. Third-Party Links
        </h2>
        <p>
          Our platform lists links to external developer portfolios, GitHub
          repositories, and external tools. We are not responsible for the
          privacy practices or content of these external sites.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-foreground">
          4. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be reflected on this page with an updated modification date.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-foreground">
          5. Contact Us
        </h2>
        <p>
          If you have any questions about this privacy policy, you can contact
          us via our public GitHub repository issue tracker.
        </p>
      </div>
    </main>
  )
}
