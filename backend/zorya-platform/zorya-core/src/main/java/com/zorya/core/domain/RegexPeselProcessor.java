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
@Order(2)
public class RegexPeselProcessor implements PiiProcessor{
    private static final Pattern PESEL_CANDIDATE_REGEX = Pattern.compile("\\b\\d{11}\\b");
    private static final String PESEL_MASK = "[PESEL_REDACTED]";
    private static final String FINDING_MASK = "*********";


    @Override
    public AnalysisResult mask(String text) {
        if(text == null || text.isEmpty()) {
            return new AnalysisResult(text, List.of());
        }

        List<PiiFinding> findings = new ArrayList<>();
        Matcher matcher = PESEL_CANDIDATE_REGEX.matcher(text);
        StringBuilder sb = new StringBuilder();

        while(matcher.find()) {
            String candidate = matcher.group();

            if(PeselValidator.isValid(candidate)) {
                findings.add(new PiiFinding(
                        PiiEntityType.PESEL,
                        maskPeselContent(candidate),
                        matcher.start(),
                        matcher.end(),
                        RiskLevel.HIGH

                ));
                matcher.appendReplacement(sb, PESEL_MASK);
            }
        }
        matcher.appendTail(sb);

        return new AnalysisResult(sb.toString(), findings);
    }

    private String maskPeselContent(String pesel) {
        return pesel.substring(0, 2) + FINDING_MASK;
    }
}
