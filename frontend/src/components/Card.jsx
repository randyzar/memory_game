import React from "react";

const Card = ({ index, imageUrl, handleClick }) => {
    return (
        <div className="card" onClick={() => handleClick(index)}>
            <img src={imageUrl} alt="Card" />
        </div>
    );
};

export default Card;
