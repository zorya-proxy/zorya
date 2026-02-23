package com.zorya.core.domain;

import com.zorya.core.domain.model.AnalysisConfig;
import com.zorya.core.domain.model.AnalysisResult;

public interface PiiProcessor {
    AnalysisResult process(String text, AnalysisConfig config);
}
