package com.zorya.dto;

import com.zorya.core.domain.model.PiiEntityType;

import java.util.List;

public record DashboardSummaryResponse(
        long totalAnalyses,
        long criticalThreats,
        List<PiiDistributionDto> piiDistribution,
        List<TopSourceDto> topSources
) {

    public record PiiDistributionDto(
            PiiEntityType type,
            long count
    ) {
    }

    public record TopSourceDto(
            String clientIdentifier,
            long count
    ) {
    }
}
