package com.zorya.infra.persistence.repository;

import com.zorya.infra.persistence.entity.AnalysisHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface AnalysisHistoryRepository extends JpaRepository<AnalysisHistoryEntity, UUID>,
        JpaSpecificationExecutor<AnalysisHistoryEntity> {

}
