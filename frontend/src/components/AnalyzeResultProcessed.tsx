import { AnalysisRiskItem } from "@/components/AnalysisRiskItem";
import type { AnalyzeResponse } from "@/interfaces/analyze/analyze-response.interface";

interface AnalyzeResultProcessedProps {
  result: AnalyzeResponse;
}

export function AnalyzeResultProcessed({ result }: AnalyzeResultProcessedProps) {
  const { processedText, findings } = result;

  const parts = processedText.split(/(\[[A-Z]+_REDACTED\])/g);
  const sortedFindings = [...findings].sort((a, b) => a.startIndex - b.startIndex);

  let findingIndex = 0;
  let currOffset = 0;

  return (
    <>
      {parts.map((part) => {
        const startIndex = currOffset;
        currOffset += part.length;
        if (part.match(/^\[[A-Z]+_REDACTED\]$/)) {
          const finding = sortedFindings[findingIndex];
          findingIndex++;

          if (finding) {
            return (
              <AnalysisRiskItem
                key={`risk-${finding.startIndex}`}
                value={part}
                riskLevel={finding.risk}
                findingValue={finding.value}
              />
            );
          }
        }
        return <span key={`text-${startIndex}`}>{part}</span>;
      })}
    </>
  );
}
