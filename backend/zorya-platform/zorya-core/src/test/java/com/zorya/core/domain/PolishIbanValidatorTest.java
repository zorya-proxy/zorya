package com.zorya.core.domain;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;

public class PolishIbanValidatorTest {

    @ParameterizedTest(name = "Should accept valid IBAN: {0}")
    @ValueSource(strings = {
            "PL27 1890 1038 2511 9195 7361 8370",
            "PL27189010382511919573618370",
            "27189010382511919573618370",
            "pl 27 1890 1038 2511 9195 7361 8370",
            "27-1890-1038-2511-9195-7361-8370"
    })
    void shouldAcceptValidIban(String validIban) {
        boolean isValid = PolishIbanValidator.isValid(validIban);
        assertThat(isValid).isTrue();
    }

    @ParameterizedTest(name = "Should reject invalid IBAN: {0}")
    @ValueSource(strings = {
            "PL 11 1890 8457 7095 2676 5488 3402 4082",
            "11 1890 8457 7095 2676 5488 3402 4082",
            "PL 11 1111 1111 1111 1111 1111 1111",
            "12345"
    })
    void shouldRejectInvalidIban(String invalidIban) {
        boolean isValid = PolishIbanValidator.isValid(invalidIban);
        assertThat(isValid).isFalse();
    }

    @ParameterizedTest(name = "Should reject garbage input: {0}")
    @NullAndEmptySource
    @ValueSource(strings = {
            "     ",
            "This is simple text",
            "abc@example.com"
    })
    void shouldRejectGarbageInput(String garbage) {
        boolean isValid = PolishIbanValidator.isValid(garbage);
        assertThat(isValid).isFalse();
    }
}
