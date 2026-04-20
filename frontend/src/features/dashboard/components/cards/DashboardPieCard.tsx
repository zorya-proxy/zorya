import { ChartEmptyState } from "@/components/charts/ChartEmptyState";
import { PieHistoryList } from "@/components/charts/PieHistoryList";
import { DashboardCard } from "@/components/DashboardCard";
import { PieDonutChart } from "@/components/charts/PieDonutChart";
import { DashboardPieCardSkeleton } from "@/features/dashboard/components/charts/DashboardPieCardSkeleton";
import type { DashboardPieCardProps } from "@/features/dashboard/types/dashboard-pie-card-props.interface";
import { buildDashboardPieCardFooter } from "@/features/dashboard/utils/dashboard-pie-card.utils";
import { ChartPie } from "lucide-react";
import { useEffect, useState } from "react";

export function DashboardPieCard({
  title,
  description,
  badgeText,
  data,
  loading = false,
  isRefetching = false,
  emptyStateLabel,
  historyTitle,
  tone = "neutral",
}: DashboardPieCardProps) {
  const [inactiveIds, setInactiveIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setInactiveIds((prev) => {
      const validIds = new Set(data.map((item) => item.id));
      const next = new Set<string>();

      for (const id of prev) {
        if (validIds.has(id)) {
          next.add(id);
        }
      }

      return next;
    });
  }, [data]);

  const visibleData = data.filter((item) => !inactiveIds.has(item.id));

  const handleToggleItem = (itemId: string) => {
    setInactiveIds((prev) => {
      const next = new Set(prev);

      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }

      return next;
    });
  };

  const footerText = loading
    ? undefined
    : visibleData.length
      ? buildDashboardPieCardFooter(visibleData, false)
      : data.length
        ? "All segments are hidden. Click legend items to enable them again."
        : undefined;

  return (
    <DashboardCard
      title={title}
      description={description}
      badgeText={badgeText}
      icon={ChartPie}
      tone={tone}
      isRefetching={isRefetching}
      contentClassName="space-y-5"
      footer={footerText}
    >
      {loading ? (
        <DashboardPieCardSkeleton />
      ) : data.length ? (
        <>
          {visibleData.length ? (
            <PieDonutChart data={visibleData} showPercentInTooltip />
          ) : (
            <ChartEmptyState label="All chart segments are currently hidden." />
          )}

          <PieHistoryList data={data} title={historyTitle} inactiveIds={inactiveIds} onToggleItem={handleToggleItem} />
        </>
      ) : (
        <ChartEmptyState label={emptyStateLabel} />
      )}
    </DashboardCard>
  );
}
