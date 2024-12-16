import React, { useState, useEffect } from "react";
import axios from "axios";
import Board from "./Board";

const GamePage = ({ sessionId, difficulty, onReturnToMenu }) => {
    const [board, setBoard] = useState([]);
    const [isGameComplete, setIsGameComplete] = useState(false);
    const [score, setScore] = useState(null);
    const [time, setTime] = useState(0);
    const [timerActive, setTimerActive] = useState(true);

    // Obtener el tablero de juego al iniciar
    useEffect(() => {
        const fetchBoard = async () => {
            try {
                console.log("Iniciando juego con dificultad:", difficulty);
                const userId = localStorage.getItem("userId");

                // Mapear la dificultad seleccionada a las claves esperadas
                const difficultyMapping = {
                    "Fácil (4x4)": "easy",
                    "Normal (6x6)": "normal",
                    "Difícil (8x8)": "hard",
                    "Profesional (10x10)": "professional",
                    "Master (12x12)": "master",
                };

                const selectedDifficulty = difficultyMapping[difficulty] || difficulty;

                const response = await axios.post("/api/game/start", null, {
                    params: { userId, difficulty: selectedDifficulty },
                });


                console.log("Respuesta del servidor:", response.data);

                if (response.data.board) {
                    setBoard(response.data.board);
                } else {
                    console.error("El servidor no devolvió un tablero válido.");
                }
            } catch (error) {
                console.error("Error al obtener el tablero de juego:", error.response?.data || error.message);
            }
        };

        fetchBoard();
    }, [difficulty]);


    // Iniciar el cronómetro
    useEffect(() => {
        let timer;
        if (timerActive) {
            timer = setInterval(() => setTime((prev) => prev + 1), 1000);
        }
        return () => clearInterval(timer);
    }, [timerActive]);

    // Manejar movimientos
    const handleMove = async (firstIndex, secondIndex) => {
        try {
            const response = await axios.post("/api/game/move", null, {
                params: { sessionId, firstIndex, secondIndex },
            });
            if (response.data) {
                console.log("¡Movimiento correcto!");
            }
            checkGameCompletion();
        } catch (error) {
            console.error("Error al realizar el movimiento:", error);
        }
    };

    // Terminar el juego y guardar el puntaje
    const handleGameComplete = async () => {
        try {
            setTimerActive(false);
            setIsGameComplete(true);

            const endResponse = await axios.post("/api/game/end", null, {
                params: { sessionId },
            });

            // Guardar el tiempo como puntaje
            await axios.post(`/api/scores/user/${localStorage.getItem("userId")}`, {
                difficulty: difficulty,
                score: time, // Se guarda el tiempo como score
            });

            setScore(endResponse.data);
        } catch (error) {
            console.error("Error al finalizar el juego:", error.response?.data || error.message);
        }
    };

    return (
        <div className="game-page">
            <h2>Dificultad: {difficulty}</h2>
            <p>Tiempo: {time} segundos</p>

            {isGameComplete ? (
                <div>
                    <h2>¡Juego Terminado!</h2>

                    <button className="menu-button" onClick={onReturnToMenu}>
                        Regresar al Menú
                    </button>
                </div>
            ) : (
                <div>
                    {board.length > 0 ? (
                        <Board board={board} handleMove={handleMove} onGameComplete={handleGameComplete} />
                    ) : (
                        <p>Cargando el tablero...</p>
                    )}
                    <button className="menu-button" onClick={onReturnToMenu}>
                        Regresar al menú principal
                    </button>
                </div>
            )}
        </div>
    );
};

export default GamePage;