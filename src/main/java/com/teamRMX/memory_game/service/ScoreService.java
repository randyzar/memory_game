package com.teamRMX.memory_game.service;

import com.teamRMX.memory_game.model.Score;
import com.teamRMX.memory_game.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.teamRMX.memory_game.repository.UserRepository;
import com.teamRMX.memory_game.model.User;

import java.util.List;

@Service
public class ScoreService {

    @Autowired
    private ScoreRepository scoreRepository;

    @Autowired
    private UserRepository userRepository;

    // Registrar un puntaje con validación y relación al usuario
    public Score addScore(Long userId, Score score) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        // Normalizar el valor de difficulty
        String normalizedDifficulty = normalizeDifficulty(score.getDifficulty());
        score.setDifficulty(normalizedDifficulty);
        score.setUser(user);

        return scoreRepository.save(score);
    }

    private String normalizeDifficulty(String difficulty) {
        switch (difficulty) {
            case "Fácil (4x4)": return "easy";
            case "Normal (6x6)": return "normal";
            case "Difícil (8x8)": return "hard";
            case "Profesional (10x10)": return "professional";
            case "Master (12x12)": return "master";
            default: return difficulty; // Retornar el valor original si no hay coincidencia
        }
    }

    // Obtener todos los puntajes
    public List<Score> getAllScores() {
        return scoreRepository.findAll();
    }

    // Obtener ranking por dificultad (menor tiempo primero)
    public List<Score> getRankingByDifficulty(String difficulty) {
        return scoreRepository.findByDifficultyOrderByScoreAsc(difficulty);
    }

    // Obtener los mejores puntajes (top 10) por dificultad
    public List<Score> getTopScoresByDifficulty(String difficulty) {
        return scoreRepository.findTop10ByDifficultyOrderByScoreAsc(difficulty);
    }
}
