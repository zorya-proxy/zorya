import type { DashboardSummary } from "@/interfaces/dashboard/dashboard-summary.interface";

export interface DashboardContentProps {
  data: DashboardSummary | undefined;
  isLoading?: boolean;
  isFetching?: boolean;
  isError?: boolean;
}
