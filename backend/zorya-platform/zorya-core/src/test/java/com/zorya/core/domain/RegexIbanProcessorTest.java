package com.zorya.core.domain;

import com.zorya.core.domain.model.AnalysisConfig;
import com.zorya.core.domain.model.AnalysisResult;
import com.zorya.core.domain.model.PiiEntityType;
import com.zorya.core.domain.model.RiskLevel;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class RegexIbanProcessorTest {
    private final RegexIbanProcessor ibanProcessor = new RegexIbanProcessor();
    private final AnalysisConfig TEST_CONFIG = new AnalysisConfig(false, List.of());

    @Test
    void shouldProcessIbanNumbersInTextAndReturnFindings() {
        String input = """
                The bank transfer to the account:
                PL14189089655552134835086361 or
                PL83189060332267864992513547. Thanks!
                """;

        AnalysisResult result = ibanProcessor.process(input, TEST_CONFIG);

        assertThat(result.maskedText()).isEqualTo(input);

        assertThat(result.findings()).hasSize(2);

        var firstFinding = result.findings().getFirst();
        assertThat(firstFinding.type()).isEqualTo(PiiEntityType.IBAN);
        assertThat(firstFinding.value()).isEqualTo("PL...6361");
        assertThat(firstFinding.riskLevel()).isEqualTo(RiskLevel.HIGH);
        assertThat(firstFinding.replacementText()).isEqualTo("[IBAN_REDACTED]");

        var secondFinding = result.findings().get(1);
        assertThat(secondFinding.value()).isEqualTo("PL...3547");
    }

    @Test
    void shouldIgnoreFakeIban() {
        String input = "This is my order id: 11111111111111111111111111";

        AnalysisResult analysisResult = ibanProcessor.process(input, TEST_CONFIG);

        assertThat(analysisResult.maskedText()).isEqualTo(input);
        assertThat(analysisResult.findings()).isEmpty();
    }

    @Test
    void shouldIgnoreTextWithNoIbanNumbers() {
        String input = "Hi. This is my mail: abc@example.com";

        AnalysisResult analysisResult = ibanProcessor.process(input, TEST_CONFIG);

        assertThat(analysisResult.findings()).isEmpty();
        assertThat(analysisResult.maskedText()).isEqualTo(input);
    }
}
