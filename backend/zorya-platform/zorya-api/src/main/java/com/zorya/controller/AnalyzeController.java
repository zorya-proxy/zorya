package com.zorya.controller;

import com.zorya.dto.AnalyzeRequest;
import com.zorya.dto.AnalyzeResponse;
import com.zorya.service.AnalyzeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/v1/analyze")
@RequiredArgsConstructor
public class AnalyzeController {

    private final AnalyzeService analyzeService;

    @PostMapping
    public AnalyzeResponse analyze(@RequestBody AnalyzeRequest request) {
        return analyzeService.processAnalysis(request);
    }
}
