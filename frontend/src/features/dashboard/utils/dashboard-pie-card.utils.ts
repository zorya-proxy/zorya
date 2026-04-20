import type { DashboardPieChartItem } from "@/features/dashboard/types/dashboard-pie-chart-item.type";
import { getDashboardPieTopSegment, getDashboardPieTotal } from "@/features/dashboard/utils/dashboard-pie.utils";

export function buildDashboardPieCardFooter(data: DashboardPieChartItem[], loading: boolean): string | undefined {
  if (loading) {
    return undefined;
  }

  const topSegment = getDashboardPieTopSegment(data);

  if (!topSegment) {
    return "No records available for selected date range.";
  }

  const total = getDashboardPieTotal(data);

  return `Top segment: ${topSegment.label} (${topSegment.percent}%) | Total: ${total.toLocaleString()}`;
}
