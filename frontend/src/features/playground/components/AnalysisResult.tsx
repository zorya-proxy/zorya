import type { AnalyzeResponse } from "@/interfaces/analyze/analyze-response.interface";
import { RISK_TEXT_STYLES } from "@/constants/risk-styles.constant";
import { CopyButton } from "@/components/CopyButton";
import { AnalyzeResultProcessed } from "@/components/AnalyzeResultProcessed";

interface AnalysisResultProps {
  result: AnalyzeResponse | null;
  isLoading: boolean;
}

export function AnalysisResult({ result, isLoading }: AnalysisResultProps) {
  const riskColor = result ? RISK_TEXT_STYLES[result.riskLevel] : null;

  return (
    <div className="w-full mx-auto">
      <div
        className="
          relative flex flex-col
          rounded-xl border border-input bg-primary-foreground/40 shadow-sm
          transition-all overflow-hidden
          min-h-35
        "
      >
        <div className="px-2 pt-2">
          <div
            className="p-2 mb-1.5 max-h-100 min-h-100 
            wrap-break-word whitespace-pre-wrap font-mono text-sm md:text-base select-text 
            overflow-auto custom-textarea-scrollbar"
          >
            {isLoading ? (
              <div className="animate-pulse text-muted-foreground">Analyzing...</div>
            ) : result ? (
              <AnalyzeResultProcessed result={result} />
            ) : (
              <span className="text-muted-foreground opacity-50">Here will be result of the analysis</span>
            )}
          </div>
        </div>

        <div className="flex justify-between p-2 border-t border-input rounded-b-lg h-14">
          <div className="flex items-center">
            {result && riskColor ? (
              <span className="text-xs text-muted-foreground">
                Risk: <span className={riskColor}>{result.riskLevel}</span>
              </span>
            ) : (
              ""
            )}
          </div>
          <CopyButton textToCopy={result?.processedText ?? null} />
        </div>
      </div>
    </div>
  );
}
