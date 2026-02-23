package com.zorya.core.domain.model;

public record PiiFinding(
        PiiEntityType type,
        String value,
        int startIndex,
        int endIndex,
        RiskLevel riskLevel,
        String replacementText
) {}
