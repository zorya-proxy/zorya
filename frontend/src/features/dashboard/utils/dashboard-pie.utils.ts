import type { DashboardPieChartItem } from "@/features/dashboard/types/dashboard-pie-chart-item.type";
import type { DashboardPieInputItem } from "@/features/dashboard/types/dashboard-pie-input-item.interface";

const DASHBOARD_PIE_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "oklch(0.72 0.16 25)",
  "oklch(0.69 0.16 145)",
  "oklch(0.66 0.2 285)",
];

export function buildDashboardPieData(items: DashboardPieInputItem[]): DashboardPieChartItem[] {
  const normalizedItems = items
    .map((item) => ({
      label: item.label?.trim() || "Unknown",
      value: Number.isFinite(item.value) ? Math.max(item.value, 0) : 0,
    }))
    .filter((item) => item.value)
    .sort((a, b) => b.value - a.value);

  const total = normalizedItems.reduce((sum, item) => sum + item.value, 0);

  if (!total) return [];

  return normalizedItems.map((item, index) => ({
    id: `segment-${index + 1}`,
    label: item.label,
    value: item.value,
    percent: Number(((item.value / total) * 100).toFixed(1)),
    color: DASHBOARD_PIE_COLORS[index % DASHBOARD_PIE_COLORS.length],
  }));
}

export function getDashboardPieTotal(data: DashboardPieChartItem[]): number {
  return data.reduce((sum, item) => sum + item.value, 0);
}

export function getDashboardPieTopSegment(data: DashboardPieChartItem[]): DashboardPieChartItem | undefined {
  return data[0];
}
