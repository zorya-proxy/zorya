package com.zorya.core.domain.pipeline;

import com.zorya.core.domain.PiiProcessor;
import com.zorya.core.domain.model.AnalysisResult;
import com.zorya.core.domain.model.PiiFinding;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Primary
public class PiiPipeline implements PiiProcessor {

    private final List<PiiProcessor> processors;

    public PiiPipeline(List<PiiProcessor> processors) {
        this.processors = processors.stream()
                .filter(p -> !(p instanceof PiiPipeline))
                .toList();
    }

    @Override
    public AnalysisResult mask(String text) {
        String currentText = text;
        List<PiiFinding> findings = new ArrayList<>();

        for (PiiProcessor processor : processors) {
            AnalysisResult analysisResult = processor.mask(currentText);

            currentText = analysisResult.maskedText();
            findings.addAll(analysisResult.findings());
        }
        return new AnalysisResult(currentText, findings);
    }
}
