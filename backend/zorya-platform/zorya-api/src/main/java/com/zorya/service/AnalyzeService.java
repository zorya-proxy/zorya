package com.zorya.service;

import com.zorya.core.domain.PiiProcessor;
import com.zorya.core.domain.model.AnalysisResult;
import com.zorya.dto.AnalyzeRequest;
import com.zorya.dto.AnalyzeResponse;
import com.zorya.infra.persistence.entity.AnalysisHistoryEntity;
import com.zorya.infra.persistence.repository.AnalysisHistoryRepository;
import com.zorya.mapper.AnalysisMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AnalyzeService {
    private final PiiProcessor piiProcessor;
    private final AnalysisHistoryRepository analysisHistoryRepository;
    private final AnalysisMapper analysisMapper;

    @Transactional
    public AnalyzeResponse processAnalysis(AnalyzeRequest request) {
        AnalysisResult analysisResult = piiProcessor.process(request.text(), request.config());

        AnalysisHistoryEntity entity = analysisMapper.toEntity(analysisResult);

        AnalysisHistoryEntity savedEntity = analysisHistoryRepository.save(entity);

        return analysisMapper.toResponse(savedEntity);
    }

    public Page<AnalyzeResponse> getAllAnalyses(Pageable pageable) {
        return analysisHistoryRepository.findAll(pageable)
                .map(analysisMapper::toResponse);
    }
}
