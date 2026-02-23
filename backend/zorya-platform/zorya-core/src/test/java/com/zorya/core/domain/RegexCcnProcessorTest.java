package com.zorya.core.domain;

import com.zorya.core.domain.model.AnalysisConfig;
import com.zorya.core.domain.model.AnalysisResult;
import com.zorya.core.domain.model.PiiEntityType;
import com.zorya.core.domain.model.RiskLevel;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class RegexCcnProcessorTest {
    private final RegexCcnProcessor ccnProcessor = new RegexCcnProcessor();
    private final AnalysisConfig TEST_CONFIG = new AnalysisConfig(false, List.of());

    @Test
    void shouldProcessCcnInTextAndReturnFindings() {
        String input = """
                These are my credit cards:
                4022 9888 0309 2628 or
                4918 7595 5048 9326. Thanks!
                """;
        AnalysisResult result = ccnProcessor.process(input, TEST_CONFIG);

        assertThat(result.maskedText()).isEqualTo(input);
        assertThat(result.findings()).hasSize(2);

        var firstFinding = result.findings().getFirst();
        assertThat(firstFinding.type()).isEqualTo(PiiEntityType.CCN);
        assertThat(firstFinding.value()).isEqualTo("****-****-****-2628");
        assertThat(firstFinding.riskLevel()).isEqualTo(RiskLevel.HIGH);
        assertThat(firstFinding.replacementText()).isEqualTo("[CCN_REDACTED]");

        var secondFinding = result.findings().get(1);
        assertThat(secondFinding.value()).isEqualTo("****-****-****-9326");
    }

    @Test
    void shouldIgnoreFakeCcn() {
        String input = "This is my order id: 1111111111111111";

        AnalysisResult analysisResult = ccnProcessor.process(input, TEST_CONFIG);

        assertThat(analysisResult.maskedText()).isEqualTo(input);
        assertThat(analysisResult.findings()).isEmpty();
    }

    @Test
    void shouldIgnoreTextWithNoCcn() {
        String input = "Hi. This is my mail: abc@example.com";

        AnalysisResult analysisResult = ccnProcessor.process(input, TEST_CONFIG);

        assertThat(analysisResult.findings()).isEmpty();
        assertThat(analysisResult.maskedText()).isEqualTo(input);
    }
}
