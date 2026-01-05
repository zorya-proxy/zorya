package com.zorya.dto;

import com.zorya.core.domain.model.PiiEntityType;
import com.zorya.core.domain.model.RiskLevel;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record AnalyzeResponse(
        UUID analysisId,
        String processedText,
        RiskLevel riskLevel,
        LocalDateTime timestamp,
        List<Finding> findings
) {
    public record Finding(
            PiiEntityType type,
            String value,
            int startIndex,
            int endIndex,
            RiskLevel risk
    ) {}
}