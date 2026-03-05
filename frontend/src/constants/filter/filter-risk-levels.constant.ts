import type { RiskLevel } from "@/types/theme/analyze/risk-level.type";

export const RISK_LEVELS: { label: string; value: RiskLevel }[] = [
  { label: "Safe", value: "SAFE" },
  { label: "Low", value: "LOW" },
  { label: "Medium", value: "MEDIUM" },
  { label: "High", value: "HIGH" },
  { label: "Critical", value: "CRITICAL" },
];
