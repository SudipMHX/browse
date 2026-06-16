"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, Code2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchTrigger } from "@/components/search-dialog"

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/portfolios", label: "Portfolios" },
  { href: "/tools", label: "Tools" },
  { href: "/libraries", label: "Libraries" },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-foreground"
        >
          <Code2 className="h-5 w-5 text-primary" />
          <span className="text-sm sm:text-base">browse.pro.bd</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                pathname.startsWith(link.href)
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <SearchTrigger />
          <Link
            href="/submit"
            className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Submit yours
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <SearchTrigger />
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname.startsWith(link.href)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/submit"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground"
            >
              Submit yours
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
