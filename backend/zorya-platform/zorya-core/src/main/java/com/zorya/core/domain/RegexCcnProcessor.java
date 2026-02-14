package com.zorya.core.domain;

import com.zorya.core.domain.model.PiiEntityType;
import com.zorya.core.domain.model.RiskLevel;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
@Order(4)
public class RegexCcnProcessor extends RegexScanningProcessor {
    private static final Pattern CCN_CANDIDATE_REGEX = Pattern.compile("(?<!\\d)\\d(?:[ -]*\\d){12,18}(?!\\d)");
    private static final String CCN_MASK = "[CCN_REDACTED]";
    private static final String FINDING_MASK = "****-****-****-";


    @Override
    protected Pattern getPattern() {
        return CCN_CANDIDATE_REGEX;
    }

    @Override
    protected PiiEntityType getEntityType() {
        return PiiEntityType.CCN;
    }

    @Override
    protected String getReplacementText() {
        return CCN_MASK;
    }

    @Override
    protected String generateFindingValue(String candidate) {
        String clean = candidate.replaceAll("[^0-9]", "");
        if (clean.length() < 4) return "****";
        return FINDING_MASK + clean.substring(clean.length() - 4);
    }

    @Override
    protected RiskLevel getRiskLevel() {
        return RiskLevel.HIGH;
    }

    @Override
    protected boolean isValidCandidate(String candidate) {
        return LuhnValidator.isValid(candidate);
    }

}
