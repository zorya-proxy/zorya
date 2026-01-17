package com.zorya.core.domain;

import com.zorya.core.domain.model.PiiEntityType;
import com.zorya.core.domain.model.RiskLevel;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
@Order(3)
public class RegexIbanProcessor extends RegexScanningProcessor {
    private static final Pattern IBAN_CANDIDATE_REGEX = Pattern.compile("(?i:PL)?\\s*\\d{2}(?:[ -]*\\d{4}){6}");
    private static final String IBAN_MASK = "[IBAN_REDACTED]";

    @Override
    protected Pattern getPattern() {
        return IBAN_CANDIDATE_REGEX;
    }

    @Override
    protected PiiEntityType getEntityType() {
        return PiiEntityType.IBAN;
    }

    @Override
    protected String getReplacementText() {
        return IBAN_MASK;
    }

    @Override
    protected String generateFindingValue(String candidate) {
        if (candidate.length() < 6) {
            return "****";
        }
        return candidate.substring(0, 2) + "..." + candidate.substring(candidate.length() - 4);
    }

    @Override
    protected RiskLevel getRiskLevel() {
        return RiskLevel.HIGH;
    }

    @Override
    protected boolean isValidCandidate(String candidate) {
        return PolishIbanValidator.isValid(candidate);
    }

}
