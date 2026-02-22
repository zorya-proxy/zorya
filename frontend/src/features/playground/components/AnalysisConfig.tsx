import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface AnalysisConfigProps {
  useAi: boolean;
  onUseAiChange: (value: boolean) => void;
}

export function AnalysisConfig({ useAi, onUseAiChange }: AnalysisConfigProps) {
  return (
    <div className="flex">
      <Label htmlFor="ai-mode" className="flex flex-col items-start pr-2 cursor-pointer">
        <p>Analyze with AI</p>
        <p className="text-xs text-muted-foreground">
          Use AI to analyze the text for PII and other sensitive information.
        </p>
      </Label>
      <Switch id="ai-mode" className="cursor-pointer" checked={useAi} onCheckedChange={onUseAiChange} />
    </div>
  );
}
