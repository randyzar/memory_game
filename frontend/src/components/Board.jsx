import React, { useEffect, useState } from "react";
import coverImage from "../assets/images/cover_page.png"; // Imagen de cubierta

const Board = ({ board, handleMove, onGameComplete }) => {
    const [selectedCards, setSelectedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState(new Set());

    const handleCardClick = (index) => {
        if (matchedCards.has(index) || selectedCards.includes(index)) return;

        const newSelection = [...selectedCards, index];
        setSelectedCards(newSelection);

        if (newSelection.length === 2) {
            const [firstIndex, secondIndex] = newSelection;

            if (board[firstIndex] === board[secondIndex]) {
                setMatchedCards((prev) => new Set([...prev, firstIndex, secondIndex]));
            }

            setTimeout(() => {
                setSelectedCards([]);
            }, 1000);

            handleMove(firstIndex, secondIndex);
        }
    };

    // Verificar si todas las cartas están encontradas
    useEffect(() => {
        if (matchedCards.size === board.length) {
            onGameComplete(); // Notificar al padre cuando termina el juego
        }
    }, [matchedCards, board.length, onGameComplete]);

    return (
        <div className="board">
            {board.map((imageUrl, index) => (
                <div key={index} className="card" onClick={() => handleCardClick(index)}>
                    <img
                        src={matchedCards.has(index) || selectedCards.includes(index) ? imageUrl : coverImage}
                        alt="Card"
                        className="card-image"
                    />
                </div>
            ))}
        </div>
    );
};

export default Board;
