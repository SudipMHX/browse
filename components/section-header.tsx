import Link from "next/link"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  href?: string
  hrefLabel?: string
  className?: string
  centered?: boolean
}

export function SectionHeader({
  title,
  subtitle,
  href,
  hrefLabel = "View all",
  className,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-end justify-between gap-4",
        centered && "flex-col items-center text-center",
        className
      )}
    >
      <div
        className={cn("space-y-1", centered && "flex flex-col items-center")}
      >
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {href && !centered && (
        <Link
          href={href}
          className="shrink-0 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {hrefLabel} →
        </Link>
      )}
    </div>
  )
}
