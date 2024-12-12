import React, { useState, useRef } from "react";
import "../App.css";


// Recursos
import logo from "../assets/images/letras_color_fondo.png"; // Imagen del logo
import song1 from "../assets/audio/song1.mp3"; // Canción 1
import song2 from "../assets/audio/song2.mp3"; // Canción 2
import song3 from "../assets/audio/song3.mp3"; // Canción 3

const UserDashboard = ({ onLogout }) => {
    const songs = [song1, song2, song3]; // Lista de canciones
    const [currentSongIndex, setCurrentSongIndex] = useState(0); // Índice de la canción actual
    const audioRef = useRef(null); // Referencia al elemento de audio

    // Manejar el fin de la canción actual
    const handleSongEnd = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length); // Siguiente canción
    };

    return (
        <div className="auth-page">
            {/* Elemento de audio para las canciones */}
            <audio
                ref={audioRef}
                src={songs[currentSongIndex]}
                autoPlay
                loop={false} // No hace bucle en esta canción, pero manejamos el bucle manualmente
                onEnded={handleSongEnd} // Cambiar a la siguiente canción al terminar
            />

            <img
                src={logo} // Recurso del logo
                alt="Logo"
                className="logo"
            />
            <div className="dashboard-content">
                <h1>Bienvenido</h1>
                <div className="menu-options">
                    <button onClick={() => alert("Iniciando un nuevo juego...")}>
                        Nuevo Juego
                    </button>
                    <button onClick={() => alert("Mostrando el ranking...")}>
                        Ranking
                    </button>
                    <button onClick={() => alert("Configuración de la cuenta...")}>
                        Configuración
                    </button>
                </div>
                <button className="logout-button" onClick={onLogout}>
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default UserDashboard;
