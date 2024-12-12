package com.teamRMX.memory_game.repository;

import com.teamRMX.memory_game.model.Score;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScoreRepository extends JpaRepository<Score, Long> {
    List<Score> findByDifficultyOrderByScoreDesc(String difficulty);
}
