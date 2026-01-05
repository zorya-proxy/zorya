package com.zorya.core.domain;

import com.zorya.core.domain.model.AnalysisResult;
import com.zorya.core.domain.model.PiiEntityType;
import com.zorya.core.domain.model.RiskLevel;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class RegexPeselProcessorTest {
    private final RegexPeselProcessor peselProcessor = new RegexPeselProcessor();

    @Test
    void shouldMaskPeselNumbersInTextAndReturnFindings() {
        String input = """
                My PESEL is: 62092254565
                and my husband's PESEL is: 64111739699
                """;

        AnalysisResult result = peselProcessor.mask(input);

        assertThat(result.maskedText()).isEqualTo("""
                My PESEL is: [PESEL_REDACTED]
                and my husband's PESEL is: [PESEL_REDACTED]
                """);

        assertThat(result.findings()).hasSize(2);

        var firstFinding = result.findings().getFirst();
        assertThat(firstFinding.type()).isEqualTo(PiiEntityType.PESEL);
        assertThat(firstFinding.value()).isEqualTo("62*********");
        assertThat(firstFinding.riskLevel()).isEqualTo(RiskLevel.HIGH);

        var secondFinding = result.findings().get(1);
        assertThat(secondFinding.value()).isEqualTo("64*********");
    }

    @Test
    void shouldIgnoreFakePesel() {
        String input = "This is my order id: 12345678910";

        AnalysisResult analysisResult = peselProcessor.mask(input);

        assertThat(analysisResult.maskedText()).isEqualTo(input);
        assertThat(analysisResult.findings()).isEmpty();
    }

    @Test
    void shouldIgnoreShortNumbers() {
        String input = "Phone number: 500100600";

        AnalysisResult analysisResult = peselProcessor.mask(input);

        assertThat(analysisResult.findings()).isEmpty();
    }
}
