import React, { useState } from "react";

const StartGameForm = ({ startGame }) => {
    const [userId, setUserId] = useState("");
    const [difficulty, setDifficulty] = useState("easy");

    const handleSubmit = (e) => {
        e.preventDefault();
        startGame(userId, difficulty);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                User ID:
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                />
            </label>
            <label>
                Difficulty:
                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="easy">Easy</option>
                    <option value="normal">Normal</option>
                    <option value="hard">Hard</option>
                    <option value="professional">Professional</option>
                    <option value="master">Master</option>
                </select>
            </label>
            <button type="submit">Start Game</button>
        </form>
    );
};

export default StartGameForm;
