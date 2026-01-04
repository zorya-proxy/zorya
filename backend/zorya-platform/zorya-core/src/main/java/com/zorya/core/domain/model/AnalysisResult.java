package com.zorya.core.domain.model;

import java.util.List;

public record AnalysisResult(
        String maskedText,
        List<PiiFinding> findings
) {}
