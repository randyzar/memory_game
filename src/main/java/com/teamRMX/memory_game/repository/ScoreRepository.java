package com.teamRMX.memory_game.repository;

import com.teamRMX.memory_game.model.Score;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScoreRepository extends JpaRepository<Score, Long> {
    // Puntajes por dificultad, ordenados por menor tiempo
    List<Score> findByDifficultyOrderByScoreAsc(String difficulty);

    // Top 10 puntajes por dificultad (menor tiempo primero)
    List<Score> findTop10ByDifficultyOrderByScoreAsc(String difficulty);
}
