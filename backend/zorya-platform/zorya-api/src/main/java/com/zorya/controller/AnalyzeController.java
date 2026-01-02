package com.zorya.controller;

import com.zorya.core.domain.PiiProcessor;
import com.zorya.core.domain.RiskLevel;
import com.zorya.dto.AnalyzeRequest;
import com.zorya.dto.AnalyzeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/analyze")
@RequiredArgsConstructor
public class AnalyzeController {

    private final PiiProcessor piiProcessor;

    @PostMapping
    public AnalyzeResponse analyze(@RequestBody AnalyzeRequest request) {
        String maskedText = piiProcessor.mask(request.text());

        return new AnalyzeResponse(
                UUID.randomUUID(),
                maskedText,
                RiskLevel.LOW,
                List.of()
        );
    }
}
