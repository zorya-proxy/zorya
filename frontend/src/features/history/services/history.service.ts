import type { AnalyzeResponse } from "@/interfaces/analyze/analyze-response.interface";
import type { Page } from "@/interfaces/core/page.interface";
import type { PageableRequest } from "@/interfaces/core/pageable-request.interface";
import type { AnalyzeHistoryItem } from "@/interfaces/history/analyze-history-item.interface";
import { apiClient } from "@/lib/api-client";

export const getHistory = async (params?: PageableRequest): Promise<Page<AnalyzeHistoryItem>> => {
  const res = await apiClient.get<Page<AnalyzeResponse>>("/history", {
    params,
  });

  const content: AnalyzeHistoryItem[] = res.data.content.map((item) => ({
    ...item,
    findingsLabels: [...new Set(item.findings.map((finding) => finding.type))],
  }));

  return {
    ...res.data,
    content,
  };
};
