import React, { useState } from "react";
import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";
import UserDashboard from "./UserDashboard.jsx";

//resources
import logo from "../assets/images/letras_color_fondo.png"; // image import from assets


const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isAuthenticated, setIsAnthenticated] = useState(false); //auth state

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleLoginSuccess = (user) => {
        console.log("Usuario logueado:", user);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("username", user.username);
        setIsAnthenticated(true);
    };


    const handleLogout = () => {
        setIsAnthenticated(false); // change auth state to false
    };

    if(isAuthenticated) {
        return <UserDashboard onLogout={handleLogout} />;
    }

    return (
        <div className="auth-page">
            <img
                src={logo} // imported resource (logo)
                alt="Logo"
                className="logo"
            />
            {isLogin ? (
                <LoginForm onLoginSuccess={handleLoginSuccess} />
            ) : (
                <RegisterForm />
            )}
            <button onClick={toggleForm}>
                {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia Sesión"}
            </button>
            <div className="credits">Desarrollado por RandyZar, Len y Xime.</div>
        </div>
    );
};

export default AuthPage;
