package com.zorya.core.domain.pipeline;

import com.zorya.core.domain.PiiProcessor;
import com.zorya.core.domain.mapper.AiFindingMapper;
import com.zorya.core.domain.model.AnalysisConfig;
import com.zorya.core.domain.model.AnalysisResult;
import com.zorya.core.domain.model.PiiFinding;
import com.zorya.core.domain.port.SemanticAnalysisService;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@Primary
public class PiiPipeline implements PiiProcessor {

    private final List<PiiProcessor> regexProcessors;
    private final SemanticAnalysisService aiService;
    private final AiFindingMapper aiFindingMapper;


    public PiiPipeline(List<PiiProcessor> regexProcessors, SemanticAnalysisService aiService, AiFindingMapper aiFindingMapper) {
        this.regexProcessors = regexProcessors.stream()
                .filter(p -> !(p instanceof PiiPipeline))
                .toList();
        this.aiService = aiService;
        this.aiFindingMapper = aiFindingMapper;
    }

    @Override
    public AnalysisResult process(String text, AnalysisConfig config) {
        if (text == null || text.isBlank()) {
            return new AnalysisResult(text, List.of());
        }

        List<PiiFinding> findings = collectRegexFindings(text, config);

        if (config.useAi()) {
            findings.addAll(collectAiFindings(text, findings));
        }

        String maskedText = applyFinalMasking(text, findings);

        return new AnalysisResult(maskedText, findings);
    }

    private List<PiiFinding> collectRegexFindings(String text, AnalysisConfig config) {
        List<PiiFinding> findings = new ArrayList<>();

        for (PiiProcessor processor : regexProcessors) {
            AnalysisResult analysisResult = processor.process(text, config);
            findings.addAll(analysisResult.findings());
        }
        return findings;
    }

    private List<PiiFinding> collectAiFindings(String originalText, List<PiiFinding> regexFindings) {
        String preMaskedText = createLengthPreservedText(originalText, regexFindings);
        var rawAiFindings = aiService.analyze(preMaskedText);
        return aiFindingMapper.toDomain(rawAiFindings, originalText);
    }

    private String createLengthPreservedText(String text, List<PiiFinding> findings) {
        StringBuilder sb = new StringBuilder(text);
        for (PiiFinding finding : findings) {
            int length = finding.endIndex() - finding.startIndex();
            sb.replace(finding.startIndex(), finding.endIndex(), "X".repeat(length));
        }
        return sb.toString();
    }

    private String applyFinalMasking(String text, List<PiiFinding> findings) {
        findings.sort(Comparator.comparingInt(PiiFinding::startIndex));

        StringBuilder sb = new StringBuilder(text);
        for (int i = findings.size() - 1; i >= 0; i--) {
            PiiFinding f = findings.get(i);
            sb.replace(f.startIndex(), f.endIndex(), f.replacementText());
        }
        return sb.toString();

    }
}
