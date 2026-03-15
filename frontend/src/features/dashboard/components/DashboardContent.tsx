import { DashboardMetricCard } from "@/features/dashboard/components/cards/DashboardMetricCard";
import { DashboardPieCard } from "@/features/dashboard/components/cards/DashboardPieCard";
import type { DashboardContentProps } from "@/features/dashboard/types/dashboard-content-props.interface";
import { buildDashboardPieData } from "@/features/dashboard/utils/dashboard-pie.utils";
import { AlertTriangle, Database } from "lucide-react";

export function DashboardContent({
  data,
  isLoading = false,
  isFetching = false,
  isError = false,
}: DashboardContentProps) {
  const isInitialLoading = isLoading;
  const isRefetching = isFetching && !isLoading;

  const piiData = buildDashboardPieData(
    (data?.piiDistribution ?? []).map((item) => ({
      label: item.type,
      value: item.count,
    })),
  );

  const topSourcesData = buildDashboardPieData(
    (data?.topSources ?? []).map((item) => ({
      label: item.clientIdentifier,
      value: item.count,
    })),
  );

  return (
    <section className="@container space-y-4">
      {isError ? (
        <div className="rounded-xl border border-red-500/40 bg-red-500/5 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          We could not refresh dashboard data. Showing last available values.
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 @[48rem]:grid-cols-2">
        <DashboardMetricCard
          title="Total analyses"
          description="All processed analyses in selected date range"
          badgeText="Volume"
          icon={Database}
          metricValue={data?.totalAnalyses ?? 0}
          metricLabel="Includes all sources and risk levels"
          loading={isInitialLoading}
          isRefetching={isRefetching}
        />

        <DashboardMetricCard
          title="Critical threats"
          description="Combined count of high and critical findings"
          badgeText="Risk"
          icon={AlertTriangle}
          metricValue={data?.criticalThreats ?? 0}
          metricLabel="Requires immediate validation"
          loading={isInitialLoading}
          isRefetching={isRefetching}
          tone="critical"
        />

        <DashboardPieCard
          title="PII distribution"
          description="How sensitive data types are distributed"
          badgeText="PII"
          data={piiData}
          loading={isInitialLoading}
          isRefetching={isRefetching}
          emptyStateLabel="No PII entries were found in this date range."
        />

        <DashboardPieCard
          title="Top sources"
          description="Most client identifiers by findings"
          badgeText="Sources"
          data={topSourcesData}
          loading={isInitialLoading}
          isRefetching={isRefetching}
          emptyStateLabel="No source activity was found in this date range."
        />
      </div>
    </section>
  );
}
