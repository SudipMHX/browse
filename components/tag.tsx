import { cn } from "@/lib/utils"

interface TagProps {
  label: string
  className?: string
  onClick?: () => void
  active?: boolean
}

export function Tag({ label, className, onClick, active }: TagProps) {
  return (
    <span
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
        onClick && "cursor-pointer",
        active
          ? "border-primary/30 bg-primary/10 text-primary"
          : "border-border bg-secondary text-muted-foreground hover:border-primary/30 hover:bg-primary/10 hover:text-primary",
        className
      )}
    >
      {label}
    </span>
  )
}
