package com.zorya.controller;

import com.zorya.core.domain.model.PiiEntityType;
import com.zorya.core.domain.model.RequestSource;
import com.zorya.core.domain.model.RiskLevel;
import com.zorya.dto.AnalyzeResponse;
import com.zorya.service.AnalyzeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/v1/history")
@RequiredArgsConstructor
public class HistoryController {

    private final AnalyzeService analyzeService;

    @GetMapping
    public Page<AnalyzeResponse> getHistory(
            @RequestParam(defaultValue = "API") List<RequestSource> sources,
            @RequestParam(required = false) List<RiskLevel> riskLevels,
            @RequestParam(required = false) List<PiiEntityType> piiTypes,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @PageableDefault(size = 20, sort = "timestamp", direction = Sort.Direction.DESC)
            Pageable pageable) {
        return analyzeService.getAllAnalyses(sources, riskLevels, piiTypes, startDate, endDate, pageable);
    }
}
