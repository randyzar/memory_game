import React from "react";
import AuthPage from "./components/AuthPage";

function App() {
    return (
        <div className="App">
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

