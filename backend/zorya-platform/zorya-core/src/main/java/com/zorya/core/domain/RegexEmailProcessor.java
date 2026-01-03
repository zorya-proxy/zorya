package com.zorya.core.domain;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class RegexEmailProcessor implements PiiProcessor {
    private static final Pattern EMAIL_ADDRESS_REGEX = Pattern.compile("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,7}");

    @Override
    public String mask(String text) {
        if(text == null || text.isEmpty()) return "";
        return EMAIL_ADDRESS_REGEX.matcher(text).replaceAll("[EMAIL_REDACTED]");
    }
}
