import { cn } from "@/lib/utils";

interface ChartEmptyStateProps {
  label: string;
  className?: string;
}

export function ChartEmptyState({ label, className }: ChartEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-55 items-center justify-center rounded-xl border border-dashed border-border/70 bg-background/40 px-5 text-center text-sm text-muted-foreground",
        className,
      )}
    >
      {label}
    </div>
  );
}
