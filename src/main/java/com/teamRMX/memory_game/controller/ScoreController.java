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

    // Registrar un puntaje
    @PostMapping("/user/{userId}")
    public ResponseEntity<?> addScore(@PathVariable Long userId, @RequestBody Score score) {
        try {
            return ResponseEntity.ok(scoreService.addScore(userId, score));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }


    // Obtener todos los puntajes
    @GetMapping
    public ResponseEntity<List<Score>> getAllScores() {
        return ResponseEntity.ok(scoreService.getAllScores());
    }

    // Obtener ranking por dificultad
    @GetMapping("/ranking/{difficulty}")
    public ResponseEntity<List<Score>> getRankingByDifficulty(@PathVariable String difficulty) {
        return ResponseEntity.ok(scoreService.getRankingByDifficulty(difficulty));
    }

    @GetMapping("/{difficulty}")
    public ResponseEntity<List<Score>> getTopScores(@PathVariable String difficulty) {
        return ResponseEntity.ok(scoreService.getTopScoresByDifficulty(difficulty));
    }

    @PostMapping
    public ResponseEntity<Score> saveScore(@RequestBody Score score) {
        return ResponseEntity.ok(scoreService.saveScore(score));
    }
}
