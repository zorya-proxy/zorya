package com.zorya.core.domain.mapper;

import com.zorya.core.domain.model.AiFinding;
import com.zorya.core.domain.model.PiiFinding;
import com.zorya.core.domain.model.RiskLevel;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AiFindingMapper {

    public List<PiiFinding> toDomain(List<AiFinding> aiFindings, String originalText) {
        if (aiFindings == null || originalText == null) {
            return List.of();
        }

        List<PiiFinding> allResults = new ArrayList<>();

        for (AiFinding aiFinding : aiFindings) {
            allResults.addAll(mapSingle(aiFinding, originalText));
        }
        return allResults;
    }

    private List<PiiFinding> mapSingle(AiFinding aiFinding, String originalText) {
        if (aiFinding == null || aiFinding.value() == null || aiFinding.value().isBlank()) {
            return List.of();
        }
        String value = aiFinding.value();

        if (value.matches("^[0-9\\-\\s+.]+$")) {
            return List.of();
        }
        
        String replacement = "[" + aiFinding.type().name() + "_REDACTED]";

        return findAllOccurrences(aiFinding, originalText, value, replacement);
    }

    private static List<PiiFinding> findAllOccurrences(AiFinding aiFinding, String originalText, String value, String replacement) {
        List<PiiFinding> results = new ArrayList<>();
        int index = 0;

        while ((index = originalText.indexOf(value, index)) != -1) {
            int endIndex = index + value.length();

            results.add(new PiiFinding(
                    aiFinding.type(),
                    value,
                    index,
                    endIndex,
                    RiskLevel.HIGH,
                    replacement
            ));

            index += value.length();
        }
        return results;
    }
}