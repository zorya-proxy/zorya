package com.zorya.core.domain;

import com.zorya.core.domain.model.AnalysisConfig;
import com.zorya.core.domain.model.AnalysisResult;
import com.zorya.core.domain.model.PiiEntityType;
import com.zorya.core.domain.model.RiskLevel;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class RegexEmailProcessorTest {
    private final RegexEmailProcessor emailProcessor = new RegexEmailProcessor();
    private final AnalysisConfig TEST_CONFIG = new AnalysisConfig(false, List.of());

    @Test
    void shouldProcessEmailAddressesInTextAndReturnFindings() {
        String input = """
                Hi, this is my private email: abc@example.com
                and this is a business one: xyz@example.com
                """;

        AnalysisResult result = emailProcessor.process(input, TEST_CONFIG);

        assertThat(result.maskedText()).isEqualTo(input);

        assertThat(result.findings()).hasSize(2);

        var firstFinding = result.findings().getFirst();
        assertThat(firstFinding.type()).isEqualTo(PiiEntityType.EMAIL);
        assertThat(firstFinding.value()).isEqualTo("a***@example.com");
        assertThat(firstFinding.riskLevel()).isEqualTo(RiskLevel.MEDIUM);
        assertThat(firstFinding.replacementText()).isEqualTo("[EMAIL_REDACTED]");

        var secondFinding = result.findings().get(1);
        assertThat(secondFinding.value()).isEqualTo("x***@example.com");

    }
    @Test
    void shouldHandleShortEmailsCorrectly() {
        String input = "Short email: a@example.com";

        AnalysisResult result = emailProcessor.process(input, TEST_CONFIG);

        assertThat(result.maskedText()).isEqualTo(input);
        assertThat(result.findings()).hasSize(1);
        assertThat(result.findings().getFirst().value()).isEqualTo("***@example.com");
        assertThat(result.findings().getFirst().replacementText()).isEqualTo("[EMAIL_REDACTED]");


    }

    @Test
    void shouldReturnEmptyResultWhenInputIsNull() {
        AnalysisResult result = emailProcessor.process(null, TEST_CONFIG);

        assertThat(result.maskedText()).isNull();
        assertThat(result.findings()).isEmpty();
    }

}
