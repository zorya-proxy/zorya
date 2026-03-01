package com.zorya.dto;

import com.zorya.core.domain.model.AnalysisConfig;
import com.zorya.core.domain.model.RequestSource;

public record AnalyzeRequest(
        String text,
        AnalysisConfig config,
        RequestSource source,
        String clientIdentifier
) {
    public AnalyzeRequest {
        if (source == null) {
            source = RequestSource.API;
        }
        if (clientIdentifier == null || clientIdentifier.isBlank()) {
            clientIdentifier= "anonymous-dev";
        }
    }
}
