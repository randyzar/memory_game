import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App.jsx';
import { AudioProvider} from "./context/AudioContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AudioProvider>
        <App />
        </AudioProvider>
    </StrictMode>
);
