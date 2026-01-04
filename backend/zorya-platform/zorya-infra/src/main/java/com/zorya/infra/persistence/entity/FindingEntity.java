package com.zorya.infra.persistence.entity;

import com.zorya.core.domain.RiskLevel;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "analysis_finding")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FindingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private  UUID id;

    @Column(nullable = false)
    private String type;

    private String value;

    @Column(name = "start_index")
    private int startIndex;

    @Column(name = "end_index")
    private int endIndex;

    @Enumerated(EnumType.STRING)
    @Column(name = "risk_level")
    private RiskLevel riskLevel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "analysis_history_id")
    @ToString.Exclude
    private AnalysisHistoryEntity analysisHistory;

}
