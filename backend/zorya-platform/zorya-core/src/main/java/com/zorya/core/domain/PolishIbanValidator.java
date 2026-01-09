package com.zorya.core.domain;

import java.math.BigInteger;

class PolishIbanValidator {
    private static final int IBAN_LENGTH = 28;
    private static final BigInteger MODULUS = BigInteger.valueOf(97);

    static boolean isValid(String candidate) {
        if (candidate == null) return false;

        String normalized = normalize(candidate);

        if(normalized.length() != IBAN_LENGTH) return false;

        return hasValidChecksum(normalized);
    }

    private static String normalize(String raw) {
        String clean = raw.replaceAll("[^a-zA-Z0-9]", "").toUpperCase();

        if (clean.length() == 26) {
            return "PL" + clean;
        }
        return clean;
    }

    private static boolean hasValidChecksum(String iban) {
        String reordered = iban.substring(4) + iban.substring(0, 4);

        StringBuilder numericIban = new StringBuilder();
        for(char ch : reordered.toCharArray()) {
            numericIban.append(Character.getNumericValue(ch));
        }

        return new BigInteger(numericIban.toString())
                .remainder(MODULUS)
                .intValue() == 1;
    }

}
