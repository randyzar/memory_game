import React, { useState } from "react";
import axios from "axios";

const LoginForm = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/users/auth/login", {
                username,
                password,
            });

            // Guarda el token en localStorage
            localStorage.setItem("token", response.data.token);

            // Notifica el inicio de sesión exitoso
            onLoginSuccess(response.data.user);
        } catch (err) {
            console.error(err.response?.data || err.message);
            setError(err.response?.data || "Error al iniciar sesión");
        }
    };

    return (
        <div className="login-form">
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de Usuario:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div style={{ position: "relative" }}>
                    <label>Contraseña:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {/* Botón o ícono para mostrar/ocultar contraseña */}
                    <button
                        type="button"
                        className="show-password-btn"
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? "Ocultar" : "Mostrar"}
                    </button>
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default LoginForm;
