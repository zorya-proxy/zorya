import type { PieDonutChartItem } from "@/components/charts/interfaces/pie-donut-chart.interface";

export interface DashboardPieChartItem extends PieDonutChartItem {
  percent: number;
}
