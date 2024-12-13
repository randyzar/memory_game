import React from "react";
import Card from "./Card";

const Board = ({ board, handleMove }) => {
    const handleCardClick = (index) => {
        // Implementa la lógica para manejar los clics en las tarjetas.
        console.log("Card clicked at index:", index);
    };

    return (
        <div className="board">
            {board.map((imageUrl, index) => (
                <Card
                    key={index}
                    index={index}
                    imageUrl={imageUrl}
                    handleClick={handleCardClick}
                />
            ))}
        </div>
    );
};

export default Board;
