import type { RequestSource } from "@/types/theme/analyze/request-source.type";
import type { RiskLevel } from "@/types/theme/analyze/risk-level.type";
import type { RiskType } from "@/types/theme/analyze/risk-type.type";

export interface HistoryFiltersState {
  sources?: RequestSource[];
  riskLevels?: RiskLevel[];
  piiTypes?: RiskType[];
  startDate?: Date;
  endDate?: Date;
}
