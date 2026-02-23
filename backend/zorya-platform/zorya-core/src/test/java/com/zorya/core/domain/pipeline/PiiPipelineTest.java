package com.zorya.core.domain.pipeline;

import com.zorya.core.domain.RegexEmailProcessor;
import com.zorya.core.domain.RegexPeselProcessor;
import com.zorya.core.domain.mapper.AiFindingMapper;
import com.zorya.core.domain.model.*;

import com.zorya.core.domain.port.SemanticAnalysisService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

import java.util.List;

public class PiiPipelineTest {
    private SemanticAnalysisService aiServiceMock;
    private PiiPipeline pipeline;
    private final AnalysisConfig TEST_CONFIG_NO_AI = new AnalysisConfig(false, List.of());
    private final AnalysisConfig TEST_CONFIG_WITH_AI = new AnalysisConfig(true, List.of());

    @BeforeEach
    void setUp() {
        aiServiceMock = mock(SemanticAnalysisService.class);
        AiFindingMapper mapper = new AiFindingMapper();

        pipeline = new PiiPipeline(
                List.of(new RegexEmailProcessor(), new RegexPeselProcessor()),
                aiServiceMock,
                mapper
        );
    }

    @Test
    void shouldProcessBothEmailAndPeselInText() {
        String input = """
                Mail: abc123@example.com,
                PESEL: 10272539874
                """;
        AnalysisResult analysisResult = pipeline.process(input, TEST_CONFIG_NO_AI);

        assertThat(analysisResult.maskedText())
                .contains("[EMAIL_REDACTED]")
                .contains("[PESEL_REDACTED]");

        assertThat(analysisResult.maskedText()).isEqualTo("""
                Mail: [EMAIL_REDACTED],
                PESEL: [PESEL_REDACTED]
                """);

        assertThat(analysisResult.overallRisk()).isEqualTo(RiskLevel.HIGH);

        assertThat(analysisResult.findings()).hasSize(2);

        assertThat(analysisResult.findings())
                .extracting(PiiFinding::type)
                .containsExactlyInAnyOrder(PiiEntityType.EMAIL, PiiEntityType.PESEL);

        verifyNoInteractions(aiServiceMock);

    }

    @Test
    void shouldHandleTextWithNoPii() {
        String input = "Input without sensitive data.";

        AnalysisResult analysisResult = pipeline.process(input, TEST_CONFIG_NO_AI);

        assertThat(analysisResult.maskedText()).isEqualTo(input);
        assertThat(analysisResult.findings()).isEmpty();
    }

    @Test
    void shouldCombineRegexAndAiFindingsWhenAiIsEnabled() {
        String input = "Mail: test@example.com, the patient is dealing with tuberculosis.";
        String expectedPreMaskedTextForAi = "Mail: XXXXXXXXXXXXXXXX, the patient is dealing with tuberculosis.";

        when(aiServiceMock.analyze(expectedPreMaskedTextForAi)).thenReturn(
                List.of(new AiFinding(PiiEntityType.MEDICAL, "tuberculosis", "Tuberculosis is a bacterial infection."))
        );
        AnalysisResult analysisResult = pipeline.process(input, TEST_CONFIG_WITH_AI);

        assertThat(analysisResult.findings()).hasSize(2);

        assertThat(analysisResult.findings())
                .extracting(PiiFinding::type)
                .containsExactlyInAnyOrder(PiiEntityType.EMAIL, PiiEntityType.MEDICAL);

        assertThat(analysisResult.maskedText()).isEqualTo(
                "Mail: [EMAIL_REDACTED], the patient is dealing with [MEDICAL_REDACTED]."
        );

        verify(aiServiceMock).analyze(expectedPreMaskedTextForAi);
    }
}
