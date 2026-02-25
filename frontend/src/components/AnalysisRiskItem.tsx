import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { RISK_STYLES } from "@/constants/risk-styles.constant";
import { cn } from "@/lib/utils";
import type { RiskLevel } from "@/types/theme/analyze/risk-level.type";

interface AnalysisRiskItemProps {
  value: string;
  riskLevel: RiskLevel;
  findingValue: string;
}

export function AnalysisRiskItem({ value, riskLevel, findingValue }: AnalysisRiskItemProps) {
  const itemColor = RISK_STYLES[riskLevel];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={cn(
            "inline-flex items-center px-1 py-0.5 rounded-md text-xs font-bold border cursor-pointer",
            itemColor,
          )}
        >
          {value}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <div className="flex flex-col">
          <span className="font-bold">Risk: {riskLevel}</span>
          <p>Value: {findingValue}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
