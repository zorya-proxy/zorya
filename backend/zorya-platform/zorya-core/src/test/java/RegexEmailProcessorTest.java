import com.zorya.core.domain.RegexEmailProcessor;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class RegexEmailProcessorTest {
    private final RegexEmailProcessor emailProcessor = new RegexEmailProcessor();

    @Test
    void shouldMaskEmailAddressesInText() {
        String input = """
                Hi, this is my private email: abc@example.com
                and this is a business one: xyz@example.com
                """;

        String result = emailProcessor.mask(input);

        assertThat(result).isEqualTo("""
                Hi, this is my private email: [EMAIL_REDACTED]
                and this is a business one: [EMAIL_REDACTED]
                """);

    }

    @Test
    void shouldReturnEmptyStringWhenInputIsNull() {
        String result = emailProcessor.mask(null);

        assertThat(result).isEqualTo("");
    }
}
