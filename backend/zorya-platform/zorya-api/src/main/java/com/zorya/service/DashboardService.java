package com.zorya.service;

import com.zorya.core.domain.model.RequestSource;
import com.zorya.core.domain.model.RiskLevel;
import com.zorya.dto.DashboardSummaryResponse;
import com.zorya.infra.persistence.repository.DashboardMetricsRepository;
import com.zorya.mapper.DashboardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final DashboardMetricsRepository dashboardMetricsRepository;
    private final DashboardMapper dashboardMapper;

    public DashboardSummaryResponse getSummary(RequestSource source, LocalDateTime startDate, LocalDateTime endDate) {
        LocalDateTime end = (endDate != null) ? endDate : LocalDateTime.now();
        LocalDateTime start = (startDate != null) ? startDate : end.minusDays(30);

        long totalAnalyses = dashboardMetricsRepository.countByRequestSourceAndTimestampBetween(source, start, end);
        long criticalThreats = dashboardMetricsRepository.countByRiskLevelAndRequestSourceAndTimestampBetween(RiskLevel.HIGH, source, start, end);

        var piiProjections = dashboardMetricsRepository.getPiiDistribution(source, start, end);
        var sourceProjections = dashboardMetricsRepository.getTopSources(source, start, end, PageRequest.of(0, 5));

        return dashboardMapper.toResponse(
                totalAnalyses,
                criticalThreats,
                piiProjections,
                sourceProjections);


    }
}
