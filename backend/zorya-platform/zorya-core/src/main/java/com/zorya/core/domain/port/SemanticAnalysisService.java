package com.zorya.core.domain.port;

import com.zorya.core.domain.model.AiFinding;

import java.util.List;

public interface SemanticAnalysisService {
    List<AiFinding> analyze(String text);
}
