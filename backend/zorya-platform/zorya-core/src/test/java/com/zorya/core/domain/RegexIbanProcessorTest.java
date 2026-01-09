package com.zorya.core.domain;

import com.zorya.core.domain.model.AnalysisResult;
import com.zorya.core.domain.model.PiiEntityType;
import com.zorya.core.domain.model.RiskLevel;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class RegexIbanProcessorTest {
    private final RegexIbanProcessor ibanProcessor = new RegexIbanProcessor();

    @Test
    void shouldMaskIbanNumbersInTextAndReturnFindings() {
        String input = """
                The bank transfer to the account:
                PL14189089655552134835086361 or
                PL83189060332267864992513547. Thanks!
                """;

        AnalysisResult result = ibanProcessor.mask(input);

        assertThat(result.maskedText()).isEqualTo("""
                The bank transfer to the account:
                [IBAN_REDACTED] or
                [IBAN_REDACTED]. Thanks!
                """);

        assertThat(result.findings()).hasSize(2);

        var firstFinding = result.findings().getFirst();
        assertThat(firstFinding.type()).isEqualTo(PiiEntityType.IBAN);
        assertThat(firstFinding.value()).isEqualTo("PL...6361");
        assertThat(firstFinding.riskLevel()).isEqualTo(RiskLevel.HIGH);

        var secondFinding = result.findings().get(1);
        assertThat(secondFinding.value()).isEqualTo("PL...3547");
    }

    @Test
    void shouldIgnoreFakeIban() {
        String input = "This is my order id: 11111111111111111111111111";

        AnalysisResult analysisResult = ibanProcessor.mask(input);

        assertThat(analysisResult.maskedText()).isEqualTo(input);
        assertThat(analysisResult.findings()).isEmpty();
    }

    @Test
    void shouldIgnoreTextWithNoIbanNumbers() {
        String input = "Hi. This is my mail: abc@example.com";

        AnalysisResult analysisResult = ibanProcessor.mask(input);

        assertThat(analysisResult.findings()).isEmpty();
        assertThat(analysisResult.maskedText()).isEqualTo(input);
    }
}
