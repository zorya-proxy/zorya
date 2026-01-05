package com.zorya.core.domain;
import com.zorya.core.domain.model.AnalysisResult;
import com.zorya.core.domain.model.PiiEntityType;
import com.zorya.core.domain.model.PiiFinding;
import com.zorya.core.domain.model.RiskLevel;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class RegexEmailProcessor implements PiiProcessor {
    private static final Pattern EMAIL_ADDRESS_REGEX = Pattern.compile("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,7}");
    private static final String FINDING_MASK = "***";
    private static final String TEXT_MASK = "[EMAIL_REDACTED]";

    @Override
    public AnalysisResult mask(String text) {
        if(text == null || text.isEmpty()) {
            return new AnalysisResult(text, List.of());
        }
        List<PiiFinding> findings = new ArrayList<>();
        Matcher matcher = EMAIL_ADDRESS_REGEX.matcher(text);
        StringBuilder sb = new StringBuilder();

        while(matcher.find()) {
            String originalEmail = matcher.group();

            findings.add(new PiiFinding(
                    PiiEntityType.EMAIL,
                    maskEmailContent(originalEmail),
                    matcher.start(),
                    matcher.end(),
                    RiskLevel.MEDIUM
            ));
            matcher.appendReplacement(sb, TEXT_MASK);
        }
        matcher.appendTail(sb);

        return new AnalysisResult(sb.toString(), findings);
    }


    private String maskEmailContent(String email) {
        int atIndex = email.indexOf('@');
        if (atIndex < 2) {
            return FINDING_MASK + email.substring(atIndex);
        }
        return email.charAt(0) + FINDING_MASK + email.substring(atIndex);
    }
}
