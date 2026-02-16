import type { RiskLevel } from "@/types/theme/analyze/risk-level.type";
import type { RiskType } from "@/types/theme/analyze/risk-typetype";

export interface AnalyzeFinding {
  type: RiskType;
  value: string;
  startIndex: number;
  endIndex: number;
  risk: RiskLevel;
}
