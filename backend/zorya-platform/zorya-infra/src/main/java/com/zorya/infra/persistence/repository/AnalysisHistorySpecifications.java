package com.zorya.infra.persistence.repository;

import com.zorya.core.domain.model.PiiEntityType;
import com.zorya.core.domain.model.RequestSource;
import com.zorya.core.domain.model.RiskLevel;
import com.zorya.infra.persistence.entity.AnalysisHistoryEntity;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.util.List;

public class AnalysisHistorySpecifications {
    private AnalysisHistorySpecifications() {}

    public static Specification<AnalysisHistoryEntity> hasSources(List<RequestSource> requestSources) {
        return ((root, query, criteriaBuilder) -> {
            if (requestSources == null || requestSources.isEmpty()) return null;
            return root.get("requestSource").in(requestSources);
        });
    }

    public static Specification<AnalysisHistoryEntity> hasRiskLevels(List<RiskLevel> riskLevels) {
        return ((root, query, criteriaBuilder) -> {
            if (riskLevels == null || riskLevels.isEmpty()) return null;
            return root.get("riskLevel").in(riskLevels);
        });
    }

    public static Specification<AnalysisHistoryEntity> hasPiiEntityTypes(List<PiiEntityType> piiEntityTypes) {
        return ((root, query, criteriaBuilder) -> {
            if(piiEntityTypes == null || piiEntityTypes.isEmpty()) return null;

            assert query != null;
            query.distinct(true);

            return root.join("findings").get("type").in(piiEntityTypes);
        });
    }

    public static Specification<AnalysisHistoryEntity> fromDate(LocalDateTime startDate) {
        return ((root, query, criteriaBuilder) ->  {
            if (startDate == null) return null;
            return criteriaBuilder.greaterThanOrEqualTo(root.get("timestamp"), startDate);
        });
    }

    public static Specification<AnalysisHistoryEntity> toDate(LocalDateTime endDate) {
        return ((root, query, criteriaBuilder) ->  {
            if (endDate == null) return null;
            return criteriaBuilder.lessThanOrEqualTo(root.get("timestamp"), endDate);
        });
    }


}
