import type { RiskLevel } from "@/types/theme/analyze/risk-level.type";

export const RISK_STYLES: Record<RiskLevel, string> = {
  SAFE: "bg-green-500/15 text-green-700 dark:text-green-300 border-green-500/30 hover:bg-green-500/25",
  LOW: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30 hover:bg-blue-500/25",
  MEDIUM: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 border-yellow-500/30 hover:bg-yellow-500/25",
  HIGH: "bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/30 hover:bg-orange-500/25",
  CRITICAL: "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30 hover:bg-red-500/25",
};

export const RISK_TEXT_STYLES: Record<RiskLevel, string> = {
  SAFE: "text-green-600 dark:text-green-400 font-medium",
  LOW: "text-blue-600 dark:text-blue-400 font-medium",
  MEDIUM: "text-yellow-600 dark:text-yellow-400 font-medium",
  HIGH: "text-orange-600 dark:text-orange-400 font-medium",
  CRITICAL: "text-red-600 dark:text-red-400 font-bold",
};
