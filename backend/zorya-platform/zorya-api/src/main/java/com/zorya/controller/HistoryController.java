package com.zorya.controller;

import com.zorya.dto.AnalyzeResponse;
import com.zorya.service.AnalyzeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/history")
@RequiredArgsConstructor
public class HistoryController {

    private final AnalyzeService analyzeService;

    @GetMapping
    public Page<AnalyzeResponse> getHistory(
            @PageableDefault(size = 20, sort = "timestamp", direction = Sort.Direction.DESC)
            Pageable pageable) {
        return analyzeService.getAllAnalyses(pageable);
    }
}
