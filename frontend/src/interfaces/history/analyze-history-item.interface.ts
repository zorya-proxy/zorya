import type { RiskType } from "@/types/theme/analyze/risk-type.type";
import type { AnalyzeResponse } from "../analyze/analyze-response.interface";

export interface AnalyzeHistoryItem extends AnalyzeResponse {
  findingsLabels: RiskType[];
}
