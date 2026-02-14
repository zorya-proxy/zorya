package com.zorya.core.domain;

import com.zorya.core.domain.model.AnalysisResult;
import com.zorya.core.domain.model.PiiEntityType;
import com.zorya.core.domain.model.RiskLevel;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class RegexCcnProcessorTest {
    private final RegexCcnProcessor ccnProcessor = new RegexCcnProcessor();

    @Test
    void shouldMaskCcnInTextAndReturnFindings() {
        String input = """
                These are my credit cards:
                4022 9888 0309 2628 or
                4918 7595 5048 9326. Thanks!
                """;
        AnalysisResult result = ccnProcessor.mask(input);

        assertThat(result.maskedText()).isEqualTo("""
                These are my credit cards:
                [CCN_REDACTED] or
                [CCN_REDACTED]. Thanks!
                """);

        assertThat(result.findings()).hasSize(2);

        var firstFinding = result.findings().getFirst();
        assertThat(firstFinding.type()).isEqualTo(PiiEntityType.CCN);
        assertThat(firstFinding.value()).isEqualTo("****-****-****-2628");
        assertThat(firstFinding.riskLevel()).isEqualTo(RiskLevel.HIGH);

        var secondFinding = result.findings().get(1);
        assertThat(secondFinding.value()).isEqualTo("****-****-****-9326");
    }

    @Test
    void shouldIgnoreFakeCcn() {
        String input = "This is my order id: 1111111111111111";

        AnalysisResult analysisResult = ccnProcessor.mask(input);

        assertThat(analysisResult.maskedText()).isEqualTo(input);
        assertThat(analysisResult.findings()).isEmpty();
    }

    @Test
    void shouldIgnoreTextWithNoCcn() {
        String input = "Hi. This is my mail: abc@example.com";

        AnalysisResult analysisResult = ccnProcessor.mask(input);

        assertThat(analysisResult.findings()).isEmpty();
        assertThat(analysisResult.maskedText()).isEqualTo(input);
    }
}
