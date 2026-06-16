import { Metadata } from "next"
import Link from "next/link"
import { Home } from "lucide-react"

export const metadata: Metadata = {
  title: "404 - Page Not Found | browse.pro.bd",
  description: "The page you are looking for does not exist.",
}

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="space-y-4">
        <h1 className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-8xl font-extrabold tracking-tight text-transparent sm:text-9xl">
          404
        </h1>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Page Not Found
        </h2>
        <p className="mx-auto max-w-md text-muted-foreground">
          Oops! The page you are looking for doesn&apos;t exist, has been
          removed, or is temporarily unavailable.
        </p>
      </div>
      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
        >
          <Home className="h-4 w-4" />
          Back to Homepage
        </Link>
      </div>
    </main>
  )
}
