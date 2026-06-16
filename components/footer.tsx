import Link from "next/link"
import { Code2 } from "lucide-react"
import { Icons } from "@/components/icons"

const footerLinks = {
  Platform: [
    { href: "/projects", label: "Projects" },
    { href: "/portfolios", label: "Portfolios" },
    { href: "/tools", label: "Tools" },
    { href: "/libraries", label: "Libraries" },
  ],
  Community: [
    { href: "/submit", label: "Submit Yours" },
    { href: "/about", label: "About" },
    { href: "https://github.com/browse-pro-bd/browse", label: "GitHub" },
    {
      href: "https://github.com/browse-pro-bd/browse/blob/main/CONTRIBUTING.md",
      label: "Contributing",
    },
  ],
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-full lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-foreground"
            >
              <Code2 className="h-5 w-5 text-primary" />
              <span>browse.pro.bd</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Discover Bangladeshi developers and open-source creations. A
              curated, community-driven directory for the BD tech ecosystem.
            </p>
            <div className="mt-4 flex gap-3">
              <Link
                href="https://github.com/browse-pro-bd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <Icons.github className="h-4 w-4" />
              </Link>
              <Link
                href="https://twitter.com/browsepro_bd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Twitter"
              >
                <Icons.twitter className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="mb-3 text-xs font-semibold tracking-wider text-foreground uppercase">
                {group}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} browse.pro.bd — Open source & community
            driven.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
