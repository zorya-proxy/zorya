package com.zorya.core.domain.model;

import java.util.List;

public record AnalysisResult(
        String maskedText,
        List<PiiFinding> findings
) {
    public RiskLevel overallRisk() {
        return findings.stream()
                .map(PiiFinding::riskLevel)
                .max(RiskLevel::compareTo)
                .orElse(RiskLevel.SAFE);
    }
}
