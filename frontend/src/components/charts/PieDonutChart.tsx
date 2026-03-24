import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import type { PieDonutChartDatum, PieDonutChartProps } from "@/components/charts/interfaces/pie-donut-chart.interface";
import { buildPieDonutChartConfig, buildPieDonutChartData } from "@/components/charts/utils/pie-donut-chart.utils";
import { useState } from "react";
import { Cell, Pie, PieChart } from "recharts";

export function PieDonutChart({
  data,
  className,
  chartClassName,
  innerRadius = 58,
  outerRadius = 90,
  paddingAngle = 2,
  showPercentInTooltip = true,
}: PieDonutChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const chartData = buildPieDonutChartData(data);
  const chartConfig = buildPieDonutChartConfig(chartData);

  return (
    <div className={cn("rounded-xl border border-border/70 bg-background/80 p-3", className)}>
      <ChartContainer config={chartConfig} className={cn("mx-auto h-55 w-full max-w-80", chartClassName)}>
        <PieChart>
          <ChartTooltip
            content={
              <ChartTooltipContent
                hideLabel
                indicator="dot"
                formatter={(value, _name, item) => {
                  const payload = item.payload as PieDonutChartDatum;

                  return (
                    <div className="flex w-full items-center justify-between gap-3">
                      <span className="font-medium text-foreground">{payload.label}</span>
                      <span className="font-mono text-foreground tabular-nums">
                        {Number(value).toLocaleString()}
                        {showPercentInTooltip ? ` (${payload.percent}%)` : null}
                      </span>
                    </div>
                  );
                }}
              />
            }
          />

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="id"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={paddingAngle}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {chartData.map((item, index) => (
              <Cell
                key={item.id}
                fill={item.fill}
                stroke="var(--color-background)"
                strokeWidth={activeIndex === index ? 3 : 1}
                opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                className="transition-all duration-200"
              />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}
