package com.zorya.core.domain.mapper;

import com.zorya.core.domain.model.AiFinding;
import com.zorya.core.domain.model.PiiFinding;
import com.zorya.core.domain.model.RiskLevel;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AiFindingMapper {

    public List<PiiFinding> toDomain(AiFinding aiFinding, String originalText) {
        if (aiFinding == null ||
                aiFinding.value() == null ||
                aiFinding.value().isBlank() ||
                originalText == null) {

            return List.of();
        }

        String value = aiFinding.value();
        List<PiiFinding> results = new ArrayList<>();

        int index = 0;

        while ((index = originalText.indexOf(value, index)) != -1) {
            int endIndex = index + value.length();

            PiiFinding piiFinding = new PiiFinding(
                    aiFinding.type(),
                    value,
                    index,
                    endIndex,
                    RiskLevel.HIGH);

            results.add(piiFinding);

            index += value.length();
        }

        return results;
    }

}
