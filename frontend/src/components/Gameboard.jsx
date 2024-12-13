import React, { useState, useEffect } from "react";

// Imágenes del juego (puedes agregar tus propias URLs)
const images = [
    "https://via.placeholder.com/100x100?text=1", // Imagen 1
    "https://via.placeholder.com/100x100?text=2", // Imagen 2
    "https://via.placeholder.com/100x100?text=3", // Imagen 3
    "https://via.placeholder.com/100x100?text=4", // Imagen 4
    "https://via.placeholder.com/100x100?text=5", // Imagen 5
    "https://via.placeholder.com/100x100?text=6", // Imagen 6
    "https://via.placeholder.com/100x100?text=7", // Imagen 7
    "https://via.placeholder.com/100x100?text=8", // Imagen 8
];

const GameBoard = () => {
    // Crear el tablero de 4x4 (16 cartas)
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);

    useEffect(() => {
        // Generar el tablero (duplicando las imágenes)
        const shuffledImages = [...images, ...images]; // Duplicamos las imágenes para tener pares
        shuffledImages.sort(() => Math.random() - 0.5); // Barajamos las cartas aleatoriamente

        const newCards = shuffledImages.map((image, index) => ({
            id: index,
            image,
            isFlipped: false,
            isMatched: false,
        }));

        setCards(newCards);
    }, []);

    // Función para manejar el clic en una carta
    const handleCardClick = (id) => {
        if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) {
            return; // Evitar hacer clic si ya hay 2 cartas volteadas o si la carta está emparejada
        }

        const newCards = [...cards];
        newCards[id].isFlipped = true;
        setCards(newCards);
        setFlippedCards([...flippedCards, id]);

        if (flippedCards.length === 1) {
            // Comparar las cartas
            const firstCard = cards[flippedCards[0]];
            const secondCard = newCards[id];

            if (firstCard.image === secondCard.image) {
                // Las cartas son iguales, marcar como emparejadas
                const updatedCards = [...cards];
                updatedCards[firstCard.id].isMatched = true;
                updatedCards[secondCard.id].isMatched = true;
                setCards(updatedCards);
                setMatchedCards([...matchedCards, firstCard.image]); // Registrar el par
            }

            // Resetear el estado de las cartas volteadas después de un pequeño retraso
            setTimeout(() => {
                const updatedCards = [...cards];
                updatedCards[flippedCards[0]].isFlipped = false;
                updatedCards[id].isFlipped = false;
                setCards(updatedCards);
                setFlippedCards([]);
            }, 1000);
        }
    };

    // Comprobar si el juego ha terminado (cuando todos los pares han sido encontrados)
    const isGameFinished = matchedCards.length === images.length;

    return (
        <div>
            <h1>Juego de Memoria - Dificultad Fácil</h1>
            <div className="board" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="card"
                        onClick={() => handleCardClick(card.id)}
                        style={{
                            width: "100px",
                            height: "100px",
                            backgroundColor: card.isFlipped || card.isMatched ? "transparent" : "#ccc",
                            borderRadius: "8px",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        {card.isFlipped || card.isMatched ? (
                            <img src={card.image} alt="card" style={{ width: "80px", height: "80px", borderRadius: "5px" }} />
                        ) : (
                            <div style={{ width: "80px", height: "80px", backgroundColor: "#ccc", borderRadius: "5px" }} />
                        )}
                    </div>
                ))}
            </div>

            {isGameFinished && <h2>¡Felicidades! Has ganado el juego.</h2>}
        </div>
    );
};

export default GameBoard;
