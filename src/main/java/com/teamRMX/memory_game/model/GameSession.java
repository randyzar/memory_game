package com.teamRMX.memory_game.model;

import java.util.List;
import java.util.Map;

public class GameSession {

    private String sessionId; // Identificador único para la sesión
    private Long userId; // ID del jugador
    private String difficulty; // Nivel de dificultad
    private List<String> board; // Tablero con imágenes
    private Map<Integer, Boolean> matchedPairs; // Casillas emparejadas
    private Long startTime; // Hora de inicio del juego

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public List<String> getBoard() {
        return board;
    }

    public void setBoard(List<String> board) {
        this.board = board;
    }

    public Map<Integer, Boolean> getMatchedPairs() {
        return matchedPairs;
    }

    public void setMatchedPairs(Map<Integer, Boolean> matchedPairs) {
        this.matchedPairs = matchedPairs;
    }

    public Long getStartTime() {
        return startTime;
    }

    public void setStartTime(Long startTime) {
        this.startTime = startTime;
    }
}

