package com.teamRMX.memory_game.service;

import com.teamRMX.memory_game.model.Image;
import com.teamRMX.memory_game.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.teamRMX.memory_game.model.GameSession;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Collections;
import java.util.stream.Collectors;

@Service
public class GameService {

    private final Map<String, GameSession> activeGames = new ConcurrentHashMap<>();
    private final ImageRepository imageRepository;

    @Autowired
    public GameService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    // Iniciar un nuevo juego
    public GameSession startGame(Long userId, String difficulty) {
        // Generar el tablero según la dificultad
        int gridSize = getGridSize(difficulty);
        List<String> board = generateBoard(gridSize);

        // Crear una nueva sesión
        GameSession session = new GameSession();
        session.setSessionId(UUID.randomUUID().toString());
        session.setUserId(userId);
        session.setDifficulty(difficulty);
        session.setBoard(board);
        session.setMatchedPairs(new HashMap<>());
        session.setStartTime(System.currentTimeMillis());

        // Almacenar la sesión
        activeGames.put(session.getSessionId(), session);

        return session;
    }

    // Registrar un movimiento
    public boolean makeMove(String sessionId, int firstIndex, int secondIndex) {
        GameSession session = activeGames.get(sessionId);
        if (session == null) {
            throw new RuntimeException("Game session not found");
        }

        // Verificar si las casillas son un par
        List<String> board = session.getBoard();
        boolean isMatch = board.get(firstIndex).equals(board.get(secondIndex));

        // Si es un par, marcar como encontrado
        if (isMatch) {
            session.getMatchedPairs().put(firstIndex, true);
            session.getMatchedPairs().put(secondIndex, true);
        }

        return isMatch;
    }

    // Finalizar el juego
    public int endGame(String sessionId) {
        GameSession session = activeGames.remove(sessionId);
        if (session == null) {
            throw new RuntimeException("Game session not found");
        }

        // Calcular el tiempo tomado
        long endTime = System.currentTimeMillis();
        long timeTaken = (endTime - session.getStartTime()) / 1000; // En segundos

        // Calcular el puntaje (ejemplo simple)
        int score = (int) (session.getMatchedPairs().size() * 100 - timeTaken);

        return Math.max(score, 0); // Evitar puntajes negativos
    }

    // Generar el tablero con pares de imágenes
    private List<String> generateBoard(int gridSize) {
        List<Image> images = imageRepository.findAll();
        if (images.size() < gridSize / 2) {
            throw new RuntimeException("Not enough images to generate the board");
        }

        List<String> imagePaths = images.stream()
                .map(Image::getImageUrl)
                .limit(gridSize / 2)
                .collect(Collectors.toList());

        List<String> board = new ArrayList<>(imagePaths);
        board.addAll(imagePaths); // Duplicar para pares
        Collections.shuffle(board); // Mezclar el tablero
        return board;
    }

    // Obtener el tamaño del tablero según la dificultad
    private int getGridSize(String difficulty) {
        switch (difficulty.toLowerCase()) {
            case "easy":
                return 16; // 4x4
            case "normal":
                return 36; // 6x6
            case "hard":
                return 64; // 8x8
            case "professional":
                return 100; // 10x10
            case "master":
                return 144; // 12x12
            default:
                throw new IllegalArgumentException("Invalid difficulty level");
        }
    }
}
