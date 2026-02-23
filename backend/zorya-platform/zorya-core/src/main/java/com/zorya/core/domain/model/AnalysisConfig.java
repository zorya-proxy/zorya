package com.zorya.core.domain.model;

import java.util.List;

public record AnalysisConfig(
        boolean useAi,
        List<String> activeModules
) {}