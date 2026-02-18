import { analyze } from "@/features/home/services/analyze.service";
import type { AnalyzeRequest } from "@/interfaces/analyze/analyze-request.interface";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAnalyze() {
  return useMutation({
    mutationFn: (data: AnalyzeRequest) => analyze(data),
    onError: (err) => {
      toast.error("Failed to analyze the text. Please try again in a moment.", {
        position: "bottom-right",
        duration: 5000,
        closeButton: true,
      });
      console.log("Failed", err);
    },
  });
}
