import { DashboardCard } from "@/components/DashboardCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { DashboardMetricCardProps } from "@/features/dashboard/types/dashboard-metric-card-props.interface";

export function DashboardMetricCard({
  title,
  description,
  badgeText,
  icon,
  metricValue,
  metricLabel,
  loading = false,
  isRefetching = false,
  tone = "neutral",
}: DashboardMetricCardProps) {
  return (
    <DashboardCard
      title={title}
      description={description}
      badgeText={badgeText}
      icon={icon}
      tone={tone}
      isRefetching={isRefetching}
    >
      {loading ? (
        <div className="space-y-2">
          <Skeleton className="h-9 w-28" />
          {metricLabel ? <Skeleton className="h-4 w-44" /> : null}
        </div>
      ) : (
        <div className="space-y-1">
          <p className="font-mono text-3xl leading-none font-semibold tracking-tight tabular-nums sm:text-4xl">
            {typeof metricValue === "number" ? metricValue.toLocaleString() : metricValue}
          </p>
          {metricLabel ? <p className="text-xs text-muted-foreground">{metricLabel}</p> : null}
        </div>
      )}
    </DashboardCard>
  );
}
