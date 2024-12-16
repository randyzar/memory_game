package com.teamRMX.memory_game.controller;

import com.teamRMX.memory_game.model.Score;
import com.teamRMX.memory_game.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
public class ScoreController {

    @Autowired
    private ScoreService scoreService;

    // Registrar un puntaje (menor tiempo = mejor puntaje)
    @PostMapping("/user/{userId}")
    public ResponseEntity<?> addScore(@PathVariable Long userId, @RequestBody Score score) {
        try {
            score.setId(userId);
            Score savedScore = scoreService.saveScore(score);
            return ResponseEntity.ok(savedScore);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    // Obtener todos los puntajes
    @GetMapping
    public ResponseEntity<List<Score>> getAllScores() {
        return ResponseEntity.ok(scoreService.getAllScores());
    }

    // Obtener el ranking de mejores puntajes por dificultad (menor tiempo primero)
    @GetMapping("/ranking/{difficulty}")
    public ResponseEntity<List<Score>> getRankingByDifficulty(@PathVariable String difficulty) {
        return ResponseEntity.ok(scoreService.getRankingByDifficulty(difficulty));
    }

    // Obtener los top puntajes por dificultad (opcional)
    @GetMapping("/top/{difficulty}")
    public ResponseEntity<List<Score>> getTopScores(@PathVariable String difficulty) {
        return ResponseEntity.ok(scoreService.getTopScoresByDifficulty(difficulty));
    }
}
