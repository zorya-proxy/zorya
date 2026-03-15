import type { PiiDistribution } from "./pii-distribution-item.interface";
import type { TopSource } from "./top-source-item.interface";

export interface DashboardSummary {
  totalAnalyses: number;
  criticalThreats: number;
  piiDistribution: PiiDistribution[];
  topSources: TopSource[];
}
