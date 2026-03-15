import type { ChartConfig } from "@/components/ui/chart";
import type { PieDonutChartDatum, PieDonutChartItem } from "@/components/charts/types/pie-donut-chart.type";

export function buildPieDonutChartData(data: PieDonutChartItem[]): PieDonutChartDatum[] {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return data.map((item) => ({
    ...item,
    fill: item.color,
    percent: total ? Number(((item.value / total) * 100).toFixed(1)) : 0,
  }));
}

export function buildPieDonutChartConfig(data: PieDonutChartDatum[]): ChartConfig {
  return data.reduce<ChartConfig>((config, item) => {
    config[item.id] = {
      label: item.label,
      color: item.fill,
    };

    return config;
  }, {});
}
