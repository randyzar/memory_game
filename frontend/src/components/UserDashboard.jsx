import React, { useState, useEffect } from "react";
import axios from "axios";
import GamePage from "./GamePage";

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [scores, setScores] = useState([]);
    const [sessionId, setSessionId] = useState(null);
    const [difficulty, setDifficulty] = useState("easy");
    const [isGameActive, setIsGameActive] = useState(false);

    // Cargar detalles del usuario y puntuaciones
    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                window.location.href = "/login"; // Redirigir a login si no hay sesión activa
                return;
            }
            try {
                const userResponse = await axios.get(`/api/users/${userId}`);
                setUser(userResponse.data);

                const scoresResponse = await axios.get(`/api/scores/${userId}`);
                setScores(scoresResponse.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const startGame = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const response = await axios.post("/api/game/start", null, {
                params: { userId, difficulty },
            });
            setSessionId(response.data.sessionId);
            setIsGameActive(true);
        } catch (error) {
            console.error("Error starting game:", error);
        }
    };

    const handleGameEnd = () => {
        setIsGameActive(false);
        setSessionId(null);

        // Actualizar las puntuaciones tras el fin de la partida
        axios
            .get(`/api/scores/${localStorage.getItem("userId")}`)
            .then((response) => setScores(response.data))
            .catch((error) => console.error("Error updating scores:", error));
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-dashboard">
            <h1>Welcome, {user.username}!</h1>

            {!isGameActive ? (
                <div>
                    <h2>Your Scores</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Difficulty</th>
                            <th>Score</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {scores.map((score) => (
                            <tr key={score.id}>
                                <td>{score.difficulty}</td>
                                <td>{score.score}</td>
                                <td>{new Date(score.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div>
                        <h2>Start a New Game</h2>
                        <label>
                            Difficulty:
                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                            >
                                <option value="easy">Easy</option>
                                <option value="normal">Normal</option>
                                <option value="hard">Hard</option>
                                <option value="professional">Professional</option>
                                <option value="master">Master</option>
                            </select>
                        </label>
                        <button onClick={startGame}>Start Game</button>
                    </div>
                </div>
            ) : (
                <GamePage sessionId={sessionId} onGameEnd={handleGameEnd} />
            )}
        </div>
    );
};

export default UserDashboard;
