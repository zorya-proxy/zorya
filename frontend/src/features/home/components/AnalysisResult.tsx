import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AnalysisRiskItem } from "./AnalysisRiskItem";
import type { AnalyzeResponse } from "@/interfaces/analyze/analyze-response.interface";
import { RISK_TEXT_STYLES } from "@/constants/risk-styles.constant";

interface AnalysisResultProps {
  result: AnalyzeResponse | null;
  isLoading: boolean;
}

export function AnalysisResult({ result, isLoading }: AnalysisResultProps) {
  const [copied, setCopied] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const riskColor = result ? RISK_TEXT_STYLES[result.riskLevel] : null;

  const renderedContent = () => {
    if (!result) return null;

    const { processedText, findings } = result;

    const parts = processedText.split(/(\[[A-Z]+_REDACTED\])/g);
    const sortedFindings = [...findings].sort((a, b) => a.startIndex - b.startIndex);

    let findingIndex = 0;
    let currOffset = 0;

    return parts.map((part) => {
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
    });
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.processedText);
    setCopied(true);
    setIsTooltipOpen(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            ) : (
              renderedContent() || (
                <span className="text-muted-foreground opacity-50">Here will be result of the analysis</span>
              )
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
          <TooltipProvider>
            <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={handleCopy}
                  disabled={!result}
                  size="icon"
                  className="cursor-pointer"
                >
                  {copied ? <Check /> : <Copy />}
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                <p>{copied ? "Copied!" : "Copy result"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
