package com.zorya.service;

import com.zorya.core.domain.PiiProcessor;
import com.zorya.core.domain.model.AnalysisResult;
import com.zorya.core.domain.model.PiiEntityType;
import com.zorya.core.domain.model.RequestSource;
import com.zorya.core.domain.model.RiskLevel;
import com.zorya.dto.AnalyzeRequest;
import com.zorya.dto.AnalyzeResponse;
import com.zorya.infra.persistence.entity.AnalysisHistoryEntity;
import com.zorya.infra.persistence.repository.AnalysisHistoryRepository;
import com.zorya.infra.persistence.repository.AnalysisHistorySpecifications;
import com.zorya.mapper.AnalysisMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class AnalyzeService {
    private final PiiProcessor piiProcessor;
    private final AnalysisHistoryRepository analysisHistoryRepository;
    private final AnalysisMapper analysisMapper;

    @Transactional
    public AnalyzeResponse processAnalysis(AnalyzeRequest request) {
        AnalysisResult analysisResult = piiProcessor.process(request.text(), request.config());

        AnalysisHistoryEntity entity = analysisMapper.toEntity(analysisResult, request);

        AnalysisHistoryEntity savedEntity = analysisHistoryRepository.save(entity);

        return analysisMapper.toResponse(savedEntity);
    }

    public Page<AnalyzeResponse> getAllAnalyses(List<RequestSource> sources,
                                                List<RiskLevel> riskLevels,
                                                List<PiiEntityType> piiTypes,
                                                LocalDateTime startDate,
                                                LocalDateTime endDate,
                                                Pageable pageable) {
        Specification<AnalysisHistoryEntity> specification = Specification.allOf(
                AnalysisHistorySpecifications.hasSources(sources),
                AnalysisHistorySpecifications.hasRiskLevels(riskLevels),
                AnalysisHistorySpecifications.hasPiiEntityTypes(piiTypes),
                AnalysisHistorySpecifications.fromDate(startDate),
                AnalysisHistorySpecifications.toDate(endDate)
        );

        return analysisHistoryRepository.findAll(specification, pageable)
                .map(analysisMapper::toResponse);
    }
}
