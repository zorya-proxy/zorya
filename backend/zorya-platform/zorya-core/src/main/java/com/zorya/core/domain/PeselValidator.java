package com.zorya.core.domain;

import java.time.DateTimeException;
import java.time.LocalDate;

class PeselValidator {
    private static final int[] WEIGHTS = {1, 3, 7, 9, 1, 3, 7, 9, 1, 3};

    private static final int[][] MONTH_RANGES = {
            {1, 12, 1900, 0},
            {21, 32, 2000, 20},
            {41, 52, 2100, 40},
            {61, 72, 2200, 60},
            {81, 92, 1800, 80}
    };
    static boolean isValid(String pesel) {
        if (pesel == null || pesel.length() != 11) {
            return false;
        }
        return isValidChecksum(pesel) && hasValidDate(pesel);
    }

    private static boolean isValidChecksum(String pesel) {
        int sum = 0;
        for (int i = 0; i < 10; i++) {
            sum += Character.getNumericValue(pesel.charAt(i)) * WEIGHTS[i];
        }
        int expectedCheck = (10 - (sum % 10)) % 10;

        return expectedCheck == Character.getNumericValue(pesel.charAt(10));
    }

    private static boolean hasValidDate(String pesel) {
        try {
            int yearPart = Integer.parseInt(pesel.substring(0, 2));
            int monthPart = Integer.parseInt(pesel.substring(2, 4));
            int dayPart = Integer.parseInt(pesel.substring(4, 6));

            int[] range = findMonthRange(monthPart);
            int year = range[2] + yearPart;
            int month = monthPart - range[3];

            LocalDate.of(year, month, dayPart);

            return true;
        } catch (DateTimeException e) {
            return false;
        }
    }

    private static int[] findMonthRange(int monthPart) {
        for(int[] range : MONTH_RANGES) {
            if (monthPart >= range[0] && monthPart <= range[1]) {
                return range;
            }
        }
        throw new DateTimeException("Invalid PESEL month part: " + monthPart);
    }

}
