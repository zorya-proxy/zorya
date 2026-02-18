package com.zorya.core.domain.model;

public record AiFinding(
        PiiEntityType type,
        String value,
        String explanation
) {}