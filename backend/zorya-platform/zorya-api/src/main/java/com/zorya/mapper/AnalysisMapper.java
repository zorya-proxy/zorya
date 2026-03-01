package com.zorya.mapper;

import com.zorya.core.domain.model.AnalysisResult;
import com.zorya.core.domain.model.PiiFinding;
import com.zorya.dto.AnalyzeRequest;
import com.zorya.dto.AnalyzeResponse;
import com.zorya.infra.persistence.entity.AnalysisHistoryEntity;
import com.zorya.infra.persistence.entity.FindingEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class AnalysisMapper {

    public AnalysisHistoryEntity toEntity(AnalysisResult analysisResult, AnalyzeRequest request) {
        AnalysisHistoryEntity entity = AnalysisHistoryEntity.builder()
                .timestamp(LocalDateTime.now())
                .clientIdentifier(request.clientIdentifier())
                .requestSource(request.source())
                .maskedText(analysisResult.maskedText())
                .riskLevel(analysisResult.overallRisk())
                .build();

        if (analysisResult.findings() != null) {
            for (PiiFinding piiFinding : analysisResult.findings()) {
                FindingEntity findingEntity = FindingEntity.builder()
                        .type(piiFinding.type())
                        .value(piiFinding.value())
                        .startIndex(piiFinding.startIndex())
                        .endIndex(piiFinding.endIndex())
                        .riskLevel(piiFinding.riskLevel())
                        .analysisHistory(entity)
                        .build();

                entity.getFindings().add(findingEntity);
            }
        }
        return entity;
    }

    public AnalyzeResponse toResponse(AnalysisHistoryEntity entity) {
        List<AnalyzeResponse.Finding> findingDtos = entity.getFindings().stream()
                .map(f -> new AnalyzeResponse.Finding(
                        f.getType(),
                        f.getValue(),
                        f.getStartIndex(),
                        f.getEndIndex(),
                        f.getRiskLevel()
                )).toList();

        return new AnalyzeResponse(
                entity.getId(),
                entity.getMaskedText(),
                entity.getRiskLevel(),
                entity.getTimestamp(),
                findingDtos
        );
    }
}
