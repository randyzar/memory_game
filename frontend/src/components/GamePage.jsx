import React, { useState, useEffect } from "react";
import axios from "axios";
import StartGameForm from "./StartGameForm";
import Board from "./Board";

const GamePage = () => {
    const [sessionId, setSessionId] = useState(null);
    const [board, setBoard] = useState([]);
    const [isGameComplete, setIsGameComplete] = useState(false);
    const [score, setScore] = useState(null);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const loggedInUser = localStorage.getItem("userId");
        if (loggedInUser) {
            setUserId(loggedInUser);
            setUsername(localStorage.getItem("username"));
        }
    }, []);

    const startGame = async (difficulty) => {
        try {
            const response = await axios.post("/api/game/start", null, {
                params: { userId, difficulty },
            });
            setSessionId(response.data.sessionId);
            setBoard(response.data.board);
        } catch (error) {
            console.error("Error starting game:", error);
        }
    };

    const handleMove = async (firstIndex, secondIndex) => {
        try {
            const response = await axios.post("/api/game/move", null, {
                params: { sessionId, firstIndex, secondIndex },
            });
            if (response.data) {
                alert("It's a match!");
            }
            checkGameCompletion();
        } catch (error) {
            console.error("Error making move:", error);
        }
    };

    const checkGameCompletion = async () => {
        try {
            const response = await axios.get("/api/game/isComplete", {
                params: { sessionId },
            });
            setIsGameComplete(response.data);

            if (response.data) {
                const endResponse = await axios.post("/api/game/end", null, {
                    params: { sessionId },
                });
                setScore(endResponse.data);

                // Registrar puntuación en el backend
                await axios.post("/api/scores", {
                    userId,
                    difficulty: board.difficulty,
                    score: endResponse.data,
                });
            }
        } catch (error) {
            console.error("Error checking game completion:", error);
        }
    };

    if (!userId) {
        return (
            <div>
                <h1>Welcome to the Memory Game</h1>
                <button onClick={() => (window.location.href = "/login")}>
                    Log in
                </button>
            </div>
        );
    }

    if (isGameComplete) {
        return (
            <div>
                <h1>Game Over, {username}!</h1>
                <p>Your Score: {score}</p>
            </div>
        );
    }

    return (
        <div>
            {!sessionId ? (
                <StartGameForm startGame={startGame} />
            ) : (
                <Board board={board} handleMove={handleMove} />
            )}
        </div>
    );

};

export default GamePage;
