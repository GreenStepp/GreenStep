package com.mm.greenstep.domain.compete.entity;

import com.mm.greenstep.domain.user.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.YearMonth;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "victory")
public class Victory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "victory_id")
    private Long victoryId;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @Column(name = "victory_month", nullable = false)
    private YearMonth victoryMonth;

    @Column(name = "goal_score", nullable = false)
    private Integer goalScore;

    @Column(name = "is_complete", nullable = false)
    private Boolean isComplete;


    @PrePersist
    public void prePersist() {
        this.victoryMonth = YearMonth.from(LocalDateTime.now());
        this.isComplete = false;
        this.goalScore = 10000;
    }
}