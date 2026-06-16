import Link from "next/link"
import { ArrowRight, GitFork, Users, Wrench, BookOpen } from "lucide-react"

interface HeroProps {
  stats: {
    projects: number
    portfolios: number
    tools: number
    libraries: number
  }
}

export function Hero({ stats }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/60 py-20 sm:py-28">
      {/* Radial gradient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
        }}
      />
      {/* Subtle dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] dark:opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex animate-in items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary duration-500 fill-mode-both zoom-in-95 fade-in">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Open source &amp; community driven
          </div>

          <h1 className="animate-in text-4xl font-bold tracking-tight text-foreground delay-150 duration-700 fill-mode-both fade-in slide-in-from-bottom-4 sm:text-5xl lg:text-6xl">
            Discover Bangladeshi{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent dark:from-green-400 dark:via-emerald-400 dark:to-teal-400">
                developers
              </span>
            </span>{" "}
            &amp; open-source creations
          </h1>

          <p className="mt-6 animate-in text-base leading-relaxed text-muted-foreground delay-300 duration-700 fill-mode-both fade-in slide-in-from-bottom-4 sm:text-lg">
            A curated directory of projects, portfolios, tools, and libraries
            built by developers from Bangladesh. Find great work, get
            discovered.
          </p>

          <div className="mt-10 flex animate-in flex-wrap items-center justify-center gap-3 delay-500 duration-700 fill-mode-both fade-in slide-in-from-bottom-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-md"
            >
              Browse Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/80 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-accent"
            >
              Submit Yours →
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-2xl animate-in grid-cols-2 gap-3 delay-700 duration-700 fill-mode-both fade-in slide-in-from-bottom-4 sm:grid-cols-4">
          {[
            {
              label: "Projects",
              value: stats.projects,
              icon: GitFork,
              color: "text-blue-500",
            },
            {
              label: "Portfolios",
              value: stats.portfolios,
              icon: Users,
              color: "text-purple-500",
            },
            {
              label: "Tools",
              value: stats.tools,
              icon: Wrench,
              color: "text-amber-500",
            },
            {
              label: "Libraries",
              value: stats.libraries,
              icon: BookOpen,
              color: "text-emerald-500",
            },
          ].map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card px-4 py-5 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div
                className={`rounded-lg p-2 ${color} bg-current/10`}
                style={{
                  background:
                    "color-mix(in srgb, currentColor 10%, transparent)",
                }}
              >
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {value}+
              </p>
              <p className="text-xs font-medium text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
