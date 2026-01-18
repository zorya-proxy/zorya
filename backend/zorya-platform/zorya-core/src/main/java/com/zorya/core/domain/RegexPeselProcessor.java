package com.zorya.core.domain;

import com.zorya.core.domain.model.PiiEntityType;
import com.zorya.core.domain.model.RiskLevel;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;


import java.util.regex.Pattern;

@Service
@Order(2)
public class RegexPeselProcessor extends RegexScanningProcessor{
    private static final Pattern PESEL_CANDIDATE_REGEX = Pattern.compile("\\b\\d{11}\\b");
    private static final String PESEL_MASK = "[PESEL_REDACTED]";
    private static final String FINDING_MASK = "*********";

    @Override
    protected Pattern getPattern() {
        return PESEL_CANDIDATE_REGEX;
    }

    @Override
    protected PiiEntityType getEntityType() {
        return PiiEntityType.PESEL;
    }

    @Override
    protected String getReplacementText() {
        return PESEL_MASK;
    }

    @Override
    protected String generateFindingValue(String candidate) {
        return candidate.substring(0, 2) + FINDING_MASK;
    }

    @Override
    protected RiskLevel getRiskLevel() {
        return RiskLevel.HIGH;
    }

    @Override
    protected boolean isValidCandidate(String candidate) {
        return PeselValidator.isValid(candidate);
    }

}
