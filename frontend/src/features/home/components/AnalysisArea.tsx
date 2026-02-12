import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Send } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

interface AnalysisAreaProps {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export function AnalysisArea({ value, onChange, onAnalyze, isAnalyzing }: AnalysisAreaProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (value.trim() && !isAnalyzing) {
        onAnalyze();
      }
      e.preventDefault();
    }
  };

  return (
    <div className="w-full mx-auto">
      <div
        className="
          relative flex flex-col 
          rounded-xl border border-input bg-primary-foreground/40 shadow-sm 
          transition-all overflow-hidden
        "
      >
        <div className="px-2 pt-2">
          <TextareaAutosize
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter text for analysis..."
            minRows={2}
            maxRows={15}
            className="
            w-full resize-none
            max-h-[40vh] md:max-h-100
            focus:ring-0 focus:outline-none
            bg-transparent
            text-base p-2
            wrap-break-word
            custom-textarea-scrollbar
            placeholder:text-muted-foreground
          "
          />
        </div>

        <div className="flex justify-between items-center p-2 bg-transparent border-t border-input rounded-b-lg">
          <div className="text-xs">{value.length} characters</div>

          <Button
            onClick={onAnalyze}
            disabled={isAnalyzing || !value.trim()}
            size="sm"
            className="gap-2 rounded-lg cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <Spinner data-icon="inline-start" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                Analyze <Send className="size-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
