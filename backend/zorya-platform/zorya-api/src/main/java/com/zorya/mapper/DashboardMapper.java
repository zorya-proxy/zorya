package com.zorya.mapper;

import com.zorya.dto.DashboardSummaryResponse;
import com.zorya.infra.persistence.projection.PiiDistributionProjection;
import com.zorya.infra.persistence.projection.TopSourceProjection;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DashboardMapper {

    public DashboardSummaryResponse toResponse(
            long totalAnalyses,
            long criticalThreats,
            List<PiiDistributionProjection> piiProjections,
            List<TopSourceProjection> sourceProjections
    ) {
        List<DashboardSummaryResponse.PiiDistributionDto> piiDistribution = piiProjections.stream()
                .map(p -> new DashboardSummaryResponse.PiiDistributionDto(p.getType(), p.getCount()))
                .toList();

        List<DashboardSummaryResponse.TopSourceDto> topSources = sourceProjections.stream()
                .map(p -> new DashboardSummaryResponse.TopSourceDto(p.getClientIdentifier(), p.getCount()))
                .toList();

        return new DashboardSummaryResponse(
                totalAnalyses,
                criticalThreats,
                piiDistribution,
                topSources
        );
    }
}
