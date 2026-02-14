package com.zorya.core.domain;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;

public class LuhnValidatorTest {

    @ParameterizedTest(name = "Should accept valid Luhn sequence: {0}")
    @ValueSource(strings = {
            "4918759550489326",
            "3704 171620 17683",
            "4918 7595 5048 9326",
            "4022-9888-0309-2628",
            "376762549396365"
    })
    void shouldAcceptValidSequence(String validCandidate) {
        boolean isValid = LuhnValidator.isValid(validCandidate);
        assertThat(isValid).isTrue();
    }

    @ParameterizedTest(name = "Should reject invalid Luhn sequence: {0}")
    @ValueSource(strings = {
            "5472391640506362",
            "0000000000000000",
            "123456789012",
            "12345678901234567890"
    })
    void shouldRejectInvalidSequence(String invalidCandidate) {
        boolean isValid = LuhnValidator.isValid(invalidCandidate);
        assertThat(isValid).isFalse();
    }

    @ParameterizedTest(name = "Should reject garbage input: {0}")
    @NullAndEmptySource
    @ValueSource(strings = {
            "     ",
            "This is simple text",
            "4552-abcd-1234-5678",
            "4552_8955_7157_4803"
    })
    void shouldRejectGarbageInput(String garbage) {
        boolean isValid = LuhnValidator.isValid(garbage);
        assertThat(isValid).isFalse();
    }
}
