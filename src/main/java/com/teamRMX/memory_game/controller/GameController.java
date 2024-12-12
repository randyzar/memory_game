package com.teamRMX.memory_game.controller;

import com.teamRMX.memory_game.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.teamRMX.memory_game.model.GameSession;

@RestController
@RequestMapping("/api/game")
public class GameController {

    @Autowired
    private GameService gameService;

    // Iniciar un nuevo juego
    @PostMapping("/start")
    public ResponseEntity<GameSession> startGame(@RequestParam Long userId, @RequestParam String difficulty) {
        return ResponseEntity.ok(gameService.startGame(userId, difficulty));
    }

    // Registrar un movimiento
    @PostMapping("/move")
    public ResponseEntity<Boolean> makeMove(
            @RequestParam String sessionId,
            @RequestParam int firstIndex,
            @RequestParam int secondIndex) {
        return ResponseEntity.ok(gameService.makeMove(sessionId, firstIndex, secondIndex));
    }

    // Finalizar el juego
    @PostMapping("/end")
    public ResponseEntity<Integer> endGame(@RequestParam String sessionId) {
        return ResponseEntity.ok(gameService.endGame(sessionId));
    }
}
