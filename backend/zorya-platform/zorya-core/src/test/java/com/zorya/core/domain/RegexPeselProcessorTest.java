package com.zorya.core.domain;

import com.zorya.core.domain.model.AnalysisConfig;
import com.zorya.core.domain.model.AnalysisResult;
import com.zorya.core.domain.model.PiiEntityType;
import com.zorya.core.domain.model.RiskLevel;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class RegexPeselProcessorTest {
    private final RegexPeselProcessor peselProcessor = new RegexPeselProcessor();
    private final AnalysisConfig TEST_CONFIG = new AnalysisConfig(false, List.of());

    @Test
    void shouldProcessPeselNumbersInTextAndReturnFindings() {
        String input = """
                My PESEL is: 62092254565
                and my husband's PESEL is: 64111739699
                """;

        AnalysisResult result = peselProcessor.process(input, TEST_CONFIG);

        assertThat(result.maskedText()).isEqualTo(input);

        assertThat(result.findings()).hasSize(2);

        var firstFinding = result.findings().getFirst();
        assertThat(firstFinding.type()).isEqualTo(PiiEntityType.PESEL);
        assertThat(firstFinding.value()).isEqualTo("62*********");
        assertThat(firstFinding.riskLevel()).isEqualTo(RiskLevel.HIGH);
        assertThat(firstFinding.replacementText()).isEqualTo("[PESEL_REDACTED]");

        var secondFinding = result.findings().get(1);
        assertThat(secondFinding.value()).isEqualTo("64*********");
    }

    @Test
    void shouldIgnoreFakePesel() {
        String input = "This is my order id: 12345678910";

        AnalysisResult analysisResult = peselProcessor.process(input, TEST_CONFIG);

        assertThat(analysisResult.maskedText()).isEqualTo(input);
        assertThat(analysisResult.findings()).isEmpty();
    }

    @Test
    void shouldIgnoreShortNumbers() {
        String input = "Phone number: 500100600";

        AnalysisResult analysisResult = peselProcessor.process(input, TEST_CONFIG);

        assertThat(analysisResult.findings()).isEmpty();
    }
}
