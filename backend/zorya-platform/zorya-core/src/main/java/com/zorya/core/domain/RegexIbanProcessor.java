package com.zorya.core.domain;

import com.zorya.core.domain.model.AnalysisResult;
import com.zorya.core.domain.model.PiiEntityType;
import com.zorya.core.domain.model.PiiFinding;
import com.zorya.core.domain.model.RiskLevel;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Order(3)
public class RegexIbanProcessor implements PiiProcessor {
    private static final Pattern IBAN_CANDIDATE_REGEX = Pattern.compile("(?i:PL)?\\s*\\d{2}(?:[ -]*\\d{4}){6}");
    private static final String IBAN_MASK = "[IBAN_REDACTED]";

    @Override
    public AnalysisResult mask(String text) {
        if (text == null || text.isEmpty()) {
            return new AnalysisResult(text, List.of());
        }
        List<PiiFinding> findings = new ArrayList<>();
        Matcher matcher = IBAN_CANDIDATE_REGEX.matcher(text);
        StringBuilder sb = new StringBuilder();

        while (matcher.find()) {
            String candidate = matcher.group();

            if (PolishIbanValidator.isValid(candidate)) {
                findings.add(new PiiFinding(
                        PiiEntityType.IBAN,
                        maskIbanContent(candidate),
                        matcher.start(),
                        matcher.end(),
                        RiskLevel.HIGH
                ));
                matcher.appendReplacement(sb, IBAN_MASK);
            }
        }
        matcher.appendTail(sb);

        return new AnalysisResult(sb.toString(), findings);
    }

    private String maskIbanContent(String iban) {
        if (iban.length() < 6) {
            return "****";
        }
        return iban.substring(0, 2) + "..." + iban.substring(iban.length() - 4);
    }
}
