package com.zorya.core.domain;

class LuhnValidator {
    private static final int MIN_LENGTH = 13;
    private static final int MAX_LENGTH = 19;

    static boolean isValid(String candidate) {
        if (candidate == null) return false;

        String normalized = normalize(candidate);

        if (!hasValidLength(normalized)) return false;

        if (normalized.matches("0+")) return false;

        return hasValidChecksum(normalized);
    }

    private static String normalize(String raw) {
        return raw.replaceAll("[^0-9]", "");
    }

    private static boolean hasValidLength(String number) {
        return number.length() >= MIN_LENGTH && number.length() <= MAX_LENGTH;
    }

    private static boolean hasValidChecksum(String number) {
        int sum = 0;
        boolean doubleDigit = false;

        for (int i = number.length() - 1; i >= 0; i--) {
            int digit = Character.getNumericValue(number.charAt(i));

            if (doubleDigit) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
            doubleDigit = !doubleDigit;
        }
        return (sum % 10 == 0);
    }

}
