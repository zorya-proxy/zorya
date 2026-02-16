import { AnalysisArea } from "@/features/home/components/AnalysisArea";
import { AnalysisResult } from "@/features/home/components/AnalysisResult";
import type { AnalyzeResponse } from "@/interfaces/analyze/analyze-response.interface";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState<string>("");
  const [processedData, setProcessedData] = useState<AnalyzeResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleChange = (value: string) => {
    setText(value);
  };

  const handleClear = () => {
    setText("");
    setProcessedData(null);
  };

  const handleAnalyze = () => {
    console.log("Analyzing:", text.trim());
    setIsAnalyzing(true);
    setProcessedData(null);

    setTimeout(() => {
      setIsAnalyzing(false);

      const mockResponse: AnalyzeResponse = {
        analysisId: "12345",
        riskLevel: "LOW",
        timestamp: new Date().toISOString(),
        processedText:
          "Moj email to [EMAIL_REDACTED] bo go lubie a ten niezbyt [EMAIL_REDACTED]. Mój pesel to: [PESEL_REDACTED], zły pesel to 04183009618.",
        findings: [
          { type: "EMAIL", value: "a***@gmail.com", startIndex: 13, endIndex: 29, risk: "LOW" },
          { type: "EMAIL", value: "x***@wp.pl", startIndex: 56, endIndex: 86, risk: "MEDIUM" },
          { type: "PESEL", value: "01*********", startIndex: 88, endIndex: 99, risk: "CRITICAL" },
        ],
      };
      setProcessedData(mockResponse);
    }, 1000);
  };

  return (
    <main className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-1 flex-col lg:flex-row gap-2 w-full h-screen select-none">
        <AnalysisArea
          value={text}
          onChange={handleChange}
          onAnalyze={handleAnalyze}
          onClear={handleClear}
          isAnalyzing={isAnalyzing}
        />
        <AnalysisResult result={processedData} isLoading={isAnalyzing} />
      </div>
    </main>
  );
}
