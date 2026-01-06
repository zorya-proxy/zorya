package com.zorya.core.domain;

import com.zorya.core.domain.model.AnalysisResult;
import com.zorya.core.domain.model.PiiEntityType;
import com.zorya.core.domain.model.RiskLevel;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class RegexEmailProcessorTest {
    private final RegexEmailProcessor emailProcessor = new RegexEmailProcessor();

    @Test
    void shouldMaskEmailAddressesInTextAndReturnFindings() {
        String input = """
                Hi, this is my private email: abc@example.com
                and this is a business one: xyz@example.com
                """;

        AnalysisResult result = emailProcessor.mask(input);

        assertThat(result.maskedText()).isEqualTo("""
                Hi, this is my private email: [EMAIL_REDACTED]
                and this is a business one: [EMAIL_REDACTED]
                """);

        assertThat(result.findings()).hasSize(2);

        var firstFinding = result.findings().getFirst();
        assertThat(firstFinding.type()).isEqualTo(PiiEntityType.EMAIL);
        assertThat(firstFinding.value()).isEqualTo("a***@example.com");
        assertThat(firstFinding.riskLevel()).isEqualTo(RiskLevel.MEDIUM);

        var secondFinding = result.findings().get(1);
        assertThat(secondFinding.value()).isEqualTo("x***@example.com");

    }
    @Test
    void shouldHandleShortEmailsCorrectly() {
        String input = "Short email: a@example.com";

        AnalysisResult result = emailProcessor.mask(input);

        assertThat(result.maskedText()).isEqualTo("Short email: [EMAIL_REDACTED]");
        assertThat(result.findings()).hasSize(1);
        assertThat(result.findings().getFirst().value()).isEqualTo("***@example.com");


    }

    @Test
    void shouldReturnEmptyResultWhenInputIsNull() {
        AnalysisResult result = emailProcessor.mask(null);

        assertThat(result.maskedText()).isNull();
        assertThat(result.findings()).isEmpty();
    }

}
