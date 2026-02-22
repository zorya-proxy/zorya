import { AnalysisArea } from "@/features/playground/components/AnalysisArea";
import { AnalysisConfig } from "@/features/playground/components/AnalysisConfig";
import { AnalysisResult } from "@/features/playground/components/AnalysisResult";
import { useAnalyze } from "@/features/playground/hooks/useAnalyze";
import { useState } from "react";

export default function Playground() {
  const [text, setText] = useState<string>("");
  const [useAi, setUseAi] = useState<boolean>(true);
  const { mutate, isPending, data, reset } = useAnalyze();

  const handleChange = (value: string) => {
    setText(value);
  };

  const handleClear = () => {
    setText("");
    reset();
  };

  const handleAnalyze = () => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    mutate({ text: trimmedText, config: { useAi, activeModules: [] } });
  };

  return (
    <main className="flex flex-col justify-center items-center w-full gap-8">
      <div className="flex flex-col w-full gap-6">
        <div className="flex flex-col w-full">
          <h1 className="text-3xl font-bold tracking-tight">Playground</h1>
          <p className="text-muted-foreground mt-2 text-justify">
            Safely test and fine-tune your data loss prevention rules. Enter sample text below to evaluate PII detection
            accuracy, preview redaction behavior, and adjust system configurations in real-time.
          </p>
        </div>
        <div className="flex flex-1 flex-col w-full select-none px-4">
          <AnalysisConfig useAi={useAi} onUseAiChange={setUseAi} />
        </div>
      </div>
      <div className="flex flex-1 flex-col lg:flex-row gap-2 w-full select-none">
        <AnalysisArea
          value={text}
          onChange={handleChange}
          onAnalyze={handleAnalyze}
          onClear={handleClear}
          isAnalyzing={isPending}
        />
        <AnalysisResult result={data ?? null} isLoading={isPending} />
      </div>
    </main>
  );
}
