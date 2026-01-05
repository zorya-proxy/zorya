package com.zorya.core.domain;

import com.zorya.core.domain.model.AnalysisResult;

public interface PiiProcessor {
    AnalysisResult mask(String text);
}
