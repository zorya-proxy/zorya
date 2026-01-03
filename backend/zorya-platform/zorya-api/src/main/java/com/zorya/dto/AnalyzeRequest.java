package com.zorya.dto;

import java.util.List;

public record AnalyzeRequest(
        String text,
        AnalysisConfig config
) {
    public record AnalysisConfig(
            boolean useAi,
            List<String> activeModules
    ) {}
}
