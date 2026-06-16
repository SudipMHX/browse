/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import * as React from "react"
import { Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface SearchResult {
  id: string
  url: string
  meta: {
    title: string
  }
  excerpt: string
}

interface PagefindSearchResult {
  id: string
  data: () => Promise<{
    url: string
    meta: {
      title: string
    }
    excerpt: string
  }>
}

interface PagefindInstance {
  init: () => Promise<void>
  search: (query: string) => Promise<{
    results: PagefindSearchResult[]
  }>
}

export function SearchTrigger() {
  const handleOpen = () => {
    window.dispatchEvent(new CustomEvent("open-search"))
  }
  const shortcut = navigator.platform.includes("Mac") ? "⌘K" : "Ctrl+K"

  return (
    <button
      onClick={handleOpen}
      className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted"
    >
      <Search className="h-3.5 w-3.5" />
      <span>Search...</span>
      <kbd className="pointer-events-none hidden rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] font-medium select-none sm:inline-block">
        {shortcut}
      </kbd>
    </button>
  )
}

export function SearchDialog() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<SearchResult[]>([])
  const [pagefind, setPagefind] = React.useState<PagefindInstance | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  // Listen for Cmd+K, Ctrl+K, and custom open event
  React.useEffect(() => {
    const handleOpen = () => setOpen(true)
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", down)
    window.addEventListener("open-search", handleOpen)
    return () => {
      document.removeEventListener("keydown", down)
      window.removeEventListener("open-search", handleOpen)
    }
  }, [])

  // Initialize Pagefind when the dialog opens
  React.useEffect(() => {
    if (open && !pagefind) {
      const initPagefind = async () => {
        try {
          const pagefindPath = "/pagefind/pagefind.js"
          const pf = await import(/* webpackIgnore: true */ pagefindPath)
          await pf.init()
          setPagefind(pf)
        } catch (e) {
          console.error("Failed to load pagefind index", e)
        }
      }
      initPagefind()
    }
  }, [open, pagefind])

  // Trigger search when query changes
  React.useEffect(() => {
    if (!pagefind || !query.trim()) {
      setResults([])
      return
    }

    const delayDebounce = setTimeout(async () => {
      setIsLoading(true)
      try {
        const search = await pagefind.search(query)
        const topResults = search.results.slice(0, 5)
        const loadedResults = await Promise.all(
          topResults.map(async (r) => {
            const data = await r.data()
            return {
              id: r.id,
              url: data.url,
              meta: data.meta,
              excerpt: data.excerpt,
            }
          })
        )
        setResults(loadedResults)
      } catch (e) {
        console.error("Search failed", e)
      } finally {
        setIsLoading(false)
      }
    }, 150) // Debounce 150ms

    return () => clearTimeout(delayDebounce)
  }, [query, pagefind])

  // Clean Next.js static exported URLs (e.g. /projects/x.html -> /projects/x)
  const cleanUrl = (url: string) => {
    return url.replace(/\.html$/, "").replace(/\/index$/, "/")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl gap-0 overflow-hidden border-border bg-background p-0">
        <DialogHeader className="border-b border-border p-4">
          <DialogTitle className="sr-only">Search database</DialogTitle>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, portfolios, tools, libraries..."
              className="h-9 border-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus
            />
          </div>
        </DialogHeader>
        <div className="max-h-[300px] overflow-y-auto p-2">
          {!pagefind && open && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Initializing search engine...
            </div>
          )}
          {pagefind && query && results.length === 0 && !isLoading && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No results found for &quot;{query}&quot;.
            </div>
          )}
          {isLoading && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Searching...
            </div>
          )}
          {results.length > 0 && (
            <div className="space-y-1">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={cleanUrl(result.url)}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg p-3 text-left transition-colors hover:bg-muted"
                >
                  <div className="text-sm font-medium text-foreground">
                    {result.meta.title}
                  </div>
                  <div
                    className="mt-1 line-clamp-2 text-xs text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: result.excerpt }}
                  />
                </Link>
              ))}
            </div>
          )}
          {!query && pagefind && (
            <div className="py-6 text-center text-xs text-muted-foreground">
              Type to start searching...
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
