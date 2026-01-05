package com.zorya.core.domain;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;

class PeselValidatorTest {

    @ParameterizedTest(name = "Should accept valid PESEL: {0}")
    @ValueSource(strings = {
            "74101806685",
            "06292587872",
            "93080663867"
    })
    void shouldAcceptValidPesel(String validPesel) {
        boolean isValid = PeselValidator.isValid(validPesel);
        assertThat(isValid).isTrue();
    }

    @ParameterizedTest(name = "Should reject invalid checksum: {0}")
    @ValueSource(strings = {
            "12345678901",
            "44051401358",
            "00000000000"
    })
    void shouldRejectInvalidChecksum(String invalidPesel) {
        boolean isValid = PeselValidator.isValid(invalidPesel);
        assertThat(isValid).isFalse();
    }

    @ParameterizedTest(name = "Should reject invalid date: {0}")
    @ValueSource(strings = {
            "90023012345",
            "90130112345",
            "90000012345"
    })
    void shouldRejectInvalidDates(String invalidDatePesel) {
        boolean isValid = PeselValidator.isValid(invalidDatePesel);
        assertThat(isValid).isFalse();
    }
}