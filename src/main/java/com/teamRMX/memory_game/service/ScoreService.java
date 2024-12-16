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
        score.setUser(user); // Asignar el usuario
        return scoreRepository.save(score);
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
