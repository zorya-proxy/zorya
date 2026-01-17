package com.zorya.core.domain;

import com.zorya.core.domain.model.PiiEntityType;
import com.zorya.core.domain.model.RiskLevel;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
@Order(1)
public class RegexEmailProcessor extends RegexScanningProcessor {
    private static final Pattern EMAIL_ADDRESS_REGEX = Pattern.compile("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,7}");
    private static final String FINDING_MASK = "***";
    private static final String EMAIL_MASK = "[EMAIL_REDACTED]";

    @Override
    protected Pattern getPattern() {
        return EMAIL_ADDRESS_REGEX;
    }

    @Override
    protected PiiEntityType getEntityType() {
        return PiiEntityType.EMAIL;
    }

    @Override
    protected String getReplacementText() {
        return EMAIL_MASK;
    }

    @Override
    protected String generateFindingValue(String candidate) {
        int atIndex = candidate.indexOf('@');
        if (atIndex < 2) {
            return FINDING_MASK + candidate.substring(atIndex);
        }
        return candidate.charAt(0) + FINDING_MASK + candidate.substring(atIndex);
    }

    @Override
    protected RiskLevel getRiskLevel() {
        return RiskLevel.MEDIUM;
    }

}
