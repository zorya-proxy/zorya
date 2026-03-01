package com.zorya.infra.persistence.projection;

import com.zorya.core.domain.model.PiiEntityType;

public interface PiiDistributionProjection {
    PiiEntityType getType();
    Long getCount();
}
