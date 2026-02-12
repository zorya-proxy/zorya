import { AnalysisArea } from "@/features/home/components/AnalysisArea";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState<string>("");
  const [processedText, setProcessedText] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleChange = (value: string) => {
    setText(value);
  };

  const handleAnalyze = () => {
    console.log("Analyzing:", text.trim());
    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      setProcessedText(`${text}`);
    }, 1000);
  };

  return (
    <main className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-1 w-full h-screen select-none">
        <AnalysisArea value={text} onChange={handleChange} onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
      </div>
    </main>
  );
}
