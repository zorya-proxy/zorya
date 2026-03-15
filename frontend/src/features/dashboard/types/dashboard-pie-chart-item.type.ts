import type { PieDonutChartItem } from "@/components/charts/types/pie-donut-chart.type";

export interface DashboardPieChartItem extends PieDonutChartItem {
  percent: number;
}
