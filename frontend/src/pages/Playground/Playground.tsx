import { AnalysisArea } from "@/features/playground/components/AnalysisArea";
import { AnalysisResult } from "@/features/playground/components/AnalysisResult";
import { useAnalyze } from "@/features/playground/hooks/useAnalyze";
import { useState } from "react";

export default function Playground() {
  const [text, setText] = useState<string>("");
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

    mutate({ text: trimmedText });
  };

  return (
    <main className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-1 flex-col lg:flex-row gap-2 w-full h-screen select-none">
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
