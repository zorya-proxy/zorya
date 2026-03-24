export interface PieDonutChartItem {
  id: string;
  label: string;
  value: number;
  color: string;
}

export interface PieDonutChartDatum extends PieDonutChartItem {
  fill: string;
  percent: number;
}

export interface PieHistoryListItem extends PieDonutChartItem {
  percent?: number;
}

export interface PieDonutChartProps {
  data: PieDonutChartItem[];
  className?: string;
  chartClassName?: string;
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
  showPercentInTooltip?: boolean;
}
