import type { DashboardCardTone } from "@/components/DashboardCard";
import type { LucideIcon } from "lucide-react";

export interface DashboardMetricCardProps {
  title: string;
  description: string;
  badgeText: string;
  icon: LucideIcon;
  metricValue: number | string;
  metricLabel?: string;
  loading?: boolean;
  isRefetching?: boolean;
  tone?: DashboardCardTone;
}
