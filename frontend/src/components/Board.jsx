import React from "react";
import Card from "./Card";

const Board = ({ board, handleMove }) => {
    const [selectedCards, setSelectedCards] = React.useState([]);

    const handleCardClick = (index) => {
        const newSelection = [...selectedCards, index];
        setSelectedCards(newSelection);

        if (newSelection.length === 2) {
            handleMove(newSelection[0], newSelection[1]);
            setSelectedCards([]);
        }
    };


    return (
        <div className="board">
            {board.map((imageUrl, index) => (
                <Card
                    key={index}
                    index={index}
                    imageUrl={imageUrl}
                    isFlipped={selectedCards.includes(index)}
                    handleClick={handleCardClick}
                />
            ))}
        </div>
    );
};

export default Board;
