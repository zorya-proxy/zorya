import type { AnalysisConfig } from "./analysis-config.interface";

export interface AnalyzeRequest {
  text: string;
  config: AnalysisConfig;
}
