package com.zorya.infra.persistence.repository;

import com.zorya.core.domain.model.RequestSource;
import com.zorya.core.domain.model.RiskLevel;
import com.zorya.infra.persistence.entity.AnalysisHistoryEntity;
import com.zorya.infra.persistence.projection.PiiDistributionProjection;
import com.zorya.infra.persistence.projection.TopSourceProjection;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface DashboardMetricsRepository extends Repository<AnalysisHistoryEntity, UUID> {
    long countByRequestSourceAndTimestampBetween(RequestSource requestSource, LocalDateTime start, LocalDateTime end);

    long countByRiskLevelAndRequestSourceAndTimestampBetween(RiskLevel riskLevel, RequestSource requestSource, LocalDateTime start, LocalDateTime end);

    @Query("SELECT f.type as type, COUNT(f) as count FROM FindingEntity f " +
            "WHERE f.analysisHistory.requestSource = :source " +
            "AND f.analysisHistory.timestamp >= :startDate AND f.analysisHistory.timestamp <= :endDate " +
            "GROUP BY f.type ORDER BY count DESC")
    List<PiiDistributionProjection> getPiiDistribution(
            @Param("source") RequestSource requestSource,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate);

    @Query("SELECT a.clientIdentifier as clientIdentifier, COUNT(a) as count FROM AnalysisHistoryEntity a " +
            "WHERE a.requestSource = :source " +
            "AND a.timestamp >= :startDate AND a.timestamp <= :endDate " +
            "GROUP BY a.clientIdentifier ORDER BY count DESC")
    List<TopSourceProjection> getTopSources(
            @Param("source") RequestSource requestSource,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            Pageable pageable);
}
