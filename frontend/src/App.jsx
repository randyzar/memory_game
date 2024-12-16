import React, { useContext } from "react";
import AuthPage from "./components/AuthPage";
import ReactDOM from "react-dom/client";
import { AudioProvider, AudioContext } from "./context/AudioContext";

function App() {
    const { isMuted, toggleMute } = useContext(AudioContext);

    return (
        <div className="App">
            {/* Botón para silenciar o activar el audio */}
            <button className="mute-button" onClick={toggleMute}>
                {isMuted ? "🔊" : "🔇"}
            </button>
            <AuthPage />
        </div>
    );
}

export default App;

import axios from "axios";

// Establecer encabezados globales para Axios
const token = localStorage.getItem("token");
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
