import type { AnalyzeRequest } from "@/interfaces/analyze/analyze-request.interface";
import type { AnalyzeResponse } from "@/interfaces/analyze/analyze-response.interface";
import { apiClient } from "@/lib/api-client";

export const analyze = async (data: AnalyzeRequest): Promise<AnalyzeResponse> => {
  const res = await apiClient.post<AnalyzeResponse>("/analyze", data);
  return res.data;
};
