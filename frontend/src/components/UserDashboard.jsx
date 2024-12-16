import React, { useState, useEffect } from "react";
import axios from "axios";
import GamePage from "./GamePage";
import logo from "../assets/images/letras_color_fondo.png"; // Asegúrate de tener el logo

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [showDifficultyOptions, setShowDifficultyOptions] = useState(false); // Mostrar opciones de dificultad
    const [difficulty, setDifficulty] = useState("Fácil (4x4)");
    const [sessionId, setSessionId] = useState(null);
    const [isGameActive, setIsGameActive] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                window.location.href = "/login";
                return;
            }

            try {
                const userResponse = await axios.get(`/api/users/${userId}`);
                setUser(userResponse.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    // Función para mostrar opciones de dificultad
    const handleStartNewGame = () => {
        setShowDifficultyOptions(true);
    };

    // Función para iniciar el juego
    const startGame = async () => {
        try {
            const userId = localStorage.getItem("userId");

            // Mapear la dificultad seleccionada en español a las claves esperadas en inglés
            const difficultyMapping = {
                "Fácil (4x4)": "easy",
                "Normal (6x6)": "normal",
                "Difícil (8x8)": "hard",
                "Profesional (10x10)": "professional",
                "Master (12x12)": "master",
            };

            const selectedDifficulty = difficultyMapping[difficulty]; // Convertir a inglés

            const response = await axios.post("/api/game/start", null, {
                params: { userId, difficulty: selectedDifficulty },
            });

            console.log("Juego iniciado:", response.data);
            setSessionId(response.data.sessionId);
            setIsGameActive(true);
            setShowDifficultyOptions(false);
        } catch (error) {
            console.error("Error al iniciar el juego:", error);
        }
    };


    // Función para regresar al menú principal
    const handleReturnToMenu = () => {
        setShowDifficultyOptions(false);
        setIsGameActive(false);
        setSessionId(null);
    };

    // Función para cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.location.href = "/login";
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-dashboard">
            {/* Logo y mensaje de bienvenida */}
            <div className="header">
                <img src={logo} alt="Logo" className="dashboard-logo" />
            </div>

            {/* Contenido */}
            {!isGameActive ? (
                <div className="menu-options">
                    {!showDifficultyOptions ? (
                        <>
                            <button className="menu-button" onClick={handleStartNewGame}>
                                Jugar
                            </button>
                            <button className="menu-button">Score</button>
                            <button className="logout-button" onClick={handleLogout}>
                                Salir
                            </button>
                        </>
                    ) : (
                        <div className="difficulty-options">
                            <h2>Elige la dificultad</h2>
                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="difficulty-select"
                            >
                                <option value="Fácil (4x4)">Fácil (4x4)</option>
                                <option value="Normal (6x6)">Normal (6x6)</option>
                                <option value="Difícil (8x8)">Difícil (8x8)</option>
                                <option value="Profesional (10x10)">Profesional (10x10)</option>
                                <option value="Master (12x12)">Master (12x12)</option>
                            </select>
                            <br />
                            <button className="menu-button" onClick={startGame}>
                                Iniciar
                            </button>
                            <button className="logout-button" onClick={handleReturnToMenu}>
                                Regresar
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <GamePage
                    sessionId={sessionId}
                    difficulty={difficulty}
                    onReturnToMenu={handleReturnToMenu}
                />
            )}
        </div>
    );
};

export default UserDashboard;
