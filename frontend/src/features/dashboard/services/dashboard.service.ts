import type { DashboardSummaryRequest } from "@/interfaces/dashboard/dashboard-summary-request.interface";
import type { DashboardSummary } from "@/interfaces/dashboard/dashboard-summary.interface";
import { apiClient } from "@/lib/api-client";

export const getDashboardSummary = async (params?: DashboardSummaryRequest): Promise<DashboardSummary> => {
  const res = await apiClient.get<DashboardSummary>("/dashboard/summary", {
    params,
  });

  return res.data;
};
