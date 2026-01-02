package com.zorya.dto;

import com.zorya.core.domain.RiskLevel;

import java.util.List;
import java.util.UUID;

public record AnalyzeResponse(
        UUID analysisId,
        String processedText,
        RiskLevel riskLevel,
        List<Finding> findings
) {
    public record Finding(
            String type,
            String value,
            int startIndex,
            int endIndex,
            RiskLevel risk
    ) {}
}