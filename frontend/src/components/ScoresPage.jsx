
import React, { useEffect, useState } from "react";
import axios from "axios";

const difficulties = [
    { label: "Fácil (4x4)", value: "easy" },
    { label: "Normal (6x6)", value: "normal" },
    { label: "Difícil (8x8)", value: "hard" },
    { label: "Profesional (10x10)", value: "professional" },
    { label: "Master (12x12)", value: "master" },
];

const ScoresPage = ({ onReturnToMenu }) => {
    const [scoresByDifficulty, setScoresByDifficulty] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const scoresData = {};
                // Obtener los puntajes para cada dificultad
                for (const difficulty of difficulties) {
                    const response = await axios.get(
                        /api/scores/ranking/${difficulty.value}
                    );
                    scoresData[difficulty.value] = response.data;
                }
                setScoresByDifficulty(scoresData);
            } catch (error) {
                console.error("Error al obtener los puntajes:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
    }, []);

    return (
        <div className="scores-page">
            <h1>Tabla de Clasificación</h1>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div>
                    {difficulties.map((difficulty) => (
                        <div key={difficulty.value} className="difficulty-table">
                            <h2>{difficulty.label}</h2>
                            <table>
                                <thead>
                                <tr>
                                    <th>Posición</th>
                                    <th>Usuario</th>
                                    <th>Tiempo (segundos)</th>
                                </tr>
                                </thead>
                                <tbody>
                                {scoresByDifficulty[difficulty.value]?.length > 0 ? (
                                    scoresByDifficulty[difficulty.value].map((score, index) => (
                                        <tr key={score.id}>
                                            <td>{index + 1}</td>
                                            <td>{score.user?.username || "Anónimo"}</td>
                                            <td>{score.score}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No hay puntajes disponibles</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            )}
            <button className="menu-button" onClick={onReturnToMenu}>
                Regresar al Menú
            </button>
        </div>
    );
};

export default ScoresPage;
=======
import React, { useEffect, useState } from "react";
import axios from "axios";

const difficulties = [
    { label: "Fácil (4x4)", value: "easy" },
    { label: "Normal (6x6)", value: "normal" },
    { label: "Difícil (8x8)", value: "hard" },
    { label: "Profesional (10x10)", value: "professional" },
    { label: "Master (12x12)", value: "master" },
];

const ScoresPage = ({ onReturnToMenu }) => {
    const [scoresByDifficulty, setScoresByDifficulty] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const scoresData = {};
                for (const difficulty of difficulties) {
                    const response = await axios.get(
                        `/api/scores/ranking/${difficulty.value}`
                    );
                    scoresData[difficulty.value] = response.data;
                }
                setScoresByDifficulty(scoresData);
            } catch (error) {
                console.error("Error al obtener los puntajes:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
    }, []);

    return (
        <div className="scores-page">
            <h1>Tabla de Clasificación</h1>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div>
                    {difficulties.map((difficulty) => (
                        <div key={difficulty.value} className="difficulty-table">
                            <h2>{difficulty.label}</h2>
                            <table>
                                <thead>
                                <tr>
                                    <th>Posición</th>
                                    <th>Usuario</th>
                                    <th>Tiempo (segundos)</th>
                                </tr>
                                </thead>
                                <tbody>
                                {scoresByDifficulty[difficulty.value]?.length > 0 ? (
                                    scoresByDifficulty[difficulty.value].map((score, index) => (
                                        <tr key={score.id}>
                                            <td>{index + 1}</td>
                                            <td>{score.user?.username || "Anónimo"}</td>
                                            <td>{score.score}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No hay puntajes disponibles</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            )}
            {/* Botón para regresar al menú principal */}
            <div className="button-container">
                <button className="menu-button" onClick={onReturnToMenu}>
                    Regresar al Menú Principal
                </button>
            </div>
        </div>
    );
};

export default ScoresPage;

