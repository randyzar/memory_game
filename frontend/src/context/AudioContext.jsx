import React, { createContext, useState, useEffect, useRef } from "react";

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(new Audio("/src/assets/audio/song_game.mp3"));

    useEffect(() => {
        const audio = audioRef.current;
        audio.loop = true;
        audio.volume = 0.5;

        // Reproducir solo después de interacción del usuario
        const playAudio = () => {
            audio.play().catch((e) => console.error("Audio error:", e));
            document.removeEventListener("click", playAudio);
        };

        document.addEventListener("click", playAudio);

        return () => {
            audio.pause();
        };
    }, []);

    const toggleMute = () => {
        const audio = audioRef.current;
        if (isMuted) {
            audio.play();
        } else {
            audio.pause();
        }
        setIsMuted(!isMuted);
    };

    return (
        <AudioContext.Provider value={{ isMuted, toggleMute }}>
            {children}
        </AudioContext.Provider>
    );
};
