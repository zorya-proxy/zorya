package com.zorya.core.domain;

import com.zorya.core.domain.model.AnalysisResult;
import com.zorya.core.domain.model.PiiEntityType;
import com.zorya.core.domain.model.PiiFinding;
import com.zorya.core.domain.model.RiskLevel;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public abstract class RegexScanningProcessor implements PiiProcessor{
    protected abstract Pattern getPattern();
    protected abstract PiiEntityType getEntityType();
    protected abstract String getReplacementText();
    protected abstract String generateFindingValue(String candidate);
    protected abstract RiskLevel getRiskLevel();


    protected boolean isValidCandidate(String candidate) {
        return true;
    }

    @Override
    public AnalysisResult mask(String text) {
        if(text == null || text.isEmpty()) {
            return new AnalysisResult(text, List.of());
        }

        List<PiiFinding> findings = new ArrayList<>();
        Matcher matcher = getPattern().matcher(text);
        StringBuilder sb = new StringBuilder();

        while(matcher.find()) {
            String candidate = matcher.group();

            if(isValidCandidate(candidate)) {
                findings.add(new PiiFinding(
                        getEntityType(),
                        generateFindingValue(candidate),
                        matcher.start(),
                        matcher.end(),
                        getRiskLevel()

                ));
                matcher.appendReplacement(sb, getReplacementText());
            }
        }
        matcher.appendTail(sb);

        return new AnalysisResult(sb.toString(), findings);

    }
}
