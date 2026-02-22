import type { RiskLevel } from "@/types/theme/analyze/risk-level.type";
import type { AnalyzeFinding } from "./analyze-finding.interface";

export interface AnalyzeResponse {
  analysisId: string;
  processedText: string;
  riskLevel: RiskLevel;
  timestamp: string;
  findings: AnalyzeFinding[];
}
