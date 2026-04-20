import type { DashboardSummaryRequest } from "@/interfaces/dashboard/dashboard-summary-request.interface";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "../services/dashboard.service";

export function useDashboardSummary(params: DashboardSummaryRequest = {}) {
  return useQuery({
    queryKey: ["dashboardSummary", params],
    queryFn: () => getDashboardSummary(params),
    staleTime: 0,
    placeholderData: keepPreviousData,
  });
}
