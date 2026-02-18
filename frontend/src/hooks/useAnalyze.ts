import { analyze } from "@/features/home/services/analyze.service";
import type { AnalyzeRequest } from "@/interfaces/analyze/analyze-request.interface";
import { useMutation } from "@tanstack/react-query";

export function useAnalyze() {
  return useMutation({
    mutationFn: (data: AnalyzeRequest) => analyze(data),
    onError: (err) => {
      console.log("Failed", err);
    },
  });
}
