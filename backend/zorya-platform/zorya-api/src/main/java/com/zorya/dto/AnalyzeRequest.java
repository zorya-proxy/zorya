package com.zorya.dto;

import com.zorya.core.domain.model.AnalysisConfig;

public record AnalyzeRequest(
        String text,
        AnalysisConfig config
) {
}
