import React from "react";

const Card = ({ index, imageUrl, coverImage, isRevealed, handleClick }) => {
    return (
        <div className="card" onClick={() => handleClick(index)}>
            <img
                src={isRevealed ? imageUrl : coverImage}
                alt="Card"
                className="card-image"
            />
        </div>
    );
};

export default Card;
