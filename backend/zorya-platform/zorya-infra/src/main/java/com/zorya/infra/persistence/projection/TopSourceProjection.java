package com.zorya.infra.persistence.projection;

public interface TopSourceProjection {
    String getClientIdentifier();
    Long getCount();
}
