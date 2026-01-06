package com.zorya.core.domain.pipeline;

import com.zorya.core.domain.RegexEmailProcessor;
import com.zorya.core.domain.RegexPeselProcessor;
import com.zorya.core.domain.model.AnalysisResult;
import com.zorya.core.domain.model.PiiEntityType;
import com.zorya.core.domain.model.PiiFinding;
import com.zorya.core.domain.model.RiskLevel;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

public class PiiPipelineTest {
    private final PiiPipeline pipeline = new PiiPipeline(List.of(new RegexEmailProcessor(), new RegexPeselProcessor()));

    @Test
    void shouldMaskBothEmailAndPeselInText() {
        String input = """
                Mail: abc123@example.com,
                PESEL: 10272539874
                """;
        AnalysisResult analysisResult = pipeline.mask(input);

        assertThat(analysisResult.maskedText())
                .contains("[EMAIL_REDACTED]")
                .contains("[PESEL_REDACTED");

        assertThat(analysisResult.maskedText()).isEqualTo("""
                Mail: [EMAIL_REDACTED],
                PESEL: [PESEL_REDACTED]
                """);

        assertThat(analysisResult.overallRisk()).isEqualTo(RiskLevel.HIGH);

        assertThat(analysisResult.findings()).hasSize(2);

        assertThat(analysisResult.findings())
                .extracting(PiiFinding::type)
                .containsExactlyInAnyOrder(PiiEntityType.EMAIL, PiiEntityType.PESEL);

    }

    @Test
    void shouldHandleTextWithNoPii() {
        String input = "Input without sensitive data.";

        AnalysisResult analysisResult = pipeline.mask(input);

        assertThat(analysisResult.maskedText()).isEqualTo(input);
        assertThat(analysisResult.findings()).isEmpty();
    }
}
