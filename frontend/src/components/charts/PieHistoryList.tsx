import type { PieHistoryListItem } from "@/components/charts/types/pie-donut-chart.type";
import { cn } from "@/lib/utils";

interface PieHistoryListProps {
  data: PieHistoryListItem[];
  title?: string;
  helperText?: string;
  inactiveIds?: Set<string>;
  onToggleItem?: (id: string) => void;
}

export function PieHistoryList({
  data,
  title = "History",
  helperText,
  inactiveIds,
  onToggleItem,
}: PieHistoryListProps) {
  const isInteractive = typeof onToggleItem === "function";
  const resolvedHelperText = helperText ?? (isInteractive ? "Click to toggle" : null);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-muted-foreground">{title}</p>
        {resolvedHelperText ? <span className="text-[10px] text-muted-foreground">{resolvedHelperText}</span> : null}
      </div>

      <ul className="custom-textarea-scrollbar max-h-36 space-y-1 overflow-auto pr-1">
        {data.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onToggleItem?.(item.id)}
              className={cn(
                "group flex w-full items-center justify-between rounded-md border border-border/60 bg-background/70 px-2.5 py-1.5 text-left transition-colors",
                isInteractive ? "cursor-pointer hover:bg-accent/40" : "cursor-default",
                inactiveIds?.has(item.id) ? "opacity-35 line-through" : "opacity-100 no-underline",
              )}
              aria-pressed={isInteractive ? !inactiveIds?.has(item.id) : undefined}
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="truncate text-xs font-medium" title={item.label}>
                  {item.label}
                </span>
              </div>

              <div className="ml-2 flex shrink-0 items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="font-mono text-foreground tabular-nums">{item.value.toLocaleString()}</span>
                <span>{item.percent}%</span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
