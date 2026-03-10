import { AnalyzeResultProcessed } from "@/components/AnalyzeResultProcessed";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RISK_STYLES } from "@/constants/risk-styles.constant";
import { capitalize } from "@/lib/utils";
import type { AnalyzeHistoryItem } from "@/interfaces/history/analyze-history-item.interface";

interface HistoryPreviewDialogProps {
  item: AnalyzeHistoryItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HistoryPreviewDialog({ item, open, onOpenChange }: HistoryPreviewDialogProps) {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full max-h-full h-screen md:h-auto md:max-w-4xl md:max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Analysis Preview</DialogTitle>
          <DialogDescription>ID: {item.analysisId}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Risk Level:</span>
            <Badge className={RISK_STYLES[item.riskLevel]}>{capitalize(item.riskLevel)}</Badge>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Timestamp:</span>
            <span className="text-sm text-muted-foreground">{new Date(item.timestamp).toLocaleString()}</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Processed Text:</span>
            <div className="relative flex flex-col rounded-xl border border-input bg-primary-foreground/40 shadow-sm transition-all">
              <div className="px-2 pt-2">
                <div className="max-h-[60vh] md:max-h-100 p-2 mb-1.5 wrap-break-word whitespace-pre-wrap font-mono text-sm md:text-base select-text overflow-auto custom-textarea-scrollbar">
                  <AnalyzeResultProcessed result={item} />
                </div>
              </div>
            </div>
          </div>

          {item.findings.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Findings ({item.findings.length}):</span>
              <div className="flex gap-2 px-2 custom-textarea-scrollbar">
                {item.findingsLabels.map((label) => {
                  return <Badge key={label}>{capitalize(label)}</Badge>;
                })}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
