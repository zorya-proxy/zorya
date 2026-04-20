import type { DashboardCardTone } from "@/components/DashboardCard";
import type { DashboardPieChartItem } from "@/features/dashboard/types/dashboard-pie-chart-item.type";

export interface DashboardPieCardProps {
  title: string;
  description: string;
  badgeText: string;
  data: DashboardPieChartItem[];
  loading?: boolean;
  isRefetching?: boolean;
  emptyStateLabel: string;
  historyTitle?: string;
  tone?: DashboardCardTone;
}
