package com.zorya.service;

import com.zorya.core.domain.PiiProcessor;
import com.zorya.core.domain.model.RiskLevel;
import com.zorya.dto.AnalyzeRequest;
import com.zorya.dto.AnalyzeResponse;
import com.zorya.infra.persistence.entity.AnalysisHistoryEntity;
import com.zorya.infra.persistence.repository.AnalysisHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnalyzeService {
    private final PiiProcessor piiProcessor;
    private final AnalysisHistoryRepository analysisHistoryRepository;

    public AnalyzeResponse processAnalysis(AnalyzeRequest request) {
        String maskedText = piiProcessor.mask(request.text());

        AnalysisHistoryEntity entity = AnalysisHistoryEntity.builder()
                .timestamp(LocalDateTime.now())
                .clientIdentifier("DEMO_USER")
                .maskedText(maskedText)
                .riskLevel(RiskLevel.LOW)
                .build();

        AnalysisHistoryEntity savedEntity = analysisHistoryRepository.save(entity);

        return new AnalyzeResponse(
                savedEntity.getId(),
                savedEntity.getMaskedText(),
                savedEntity.getRiskLevel(),
                savedEntity.getTimestamp(),
                List.of()
        );
    }
}
