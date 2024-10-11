/*
    Inlämningsuppgift 2 "Röj", JavaScript 3, Kristoffer Bengtsson (FE23)
    Component for the status indicator showing the players progress in the game.
*/
import { useState, useEffect } from "react";

function GameStatus({ gameState, score, mineCount }) {
    let gameStatus = `Undvik ${mineCount} minor`;
    let statusClass = ["status"];

    // Load current high score from local storage.
    const [highScore, setHighScore] = useState(() => {
        const currentHigh = localStorage.getItem("MSHighScore");
        return (currentHigh == null ? 0 : currentHigh);
    });

    // Update high score in local storage. 
    useEffect(() => localStorage.setItem("MSHighScore", highScore), [highScore]);

    // Update high score if the current score is higher.
    if (score > highScore) {
        setHighScore(score);
    }

    // Change status text and color depending on the state of the game.
    switch (gameState) {
        case "Victory": // Player has avoided mines and uncovered all other squares.
            gameStatus = "😊 Du har vunnit!";
            statusClass.push("victory");
            break;
        case "Exploded": // Player stepped on a mine.
            gameStatus = `💥 Exploderad!`;
            statusClass.push("defeat");
            break;
    }

    // Render the status text.
    return (
        <div className={statusClass.join(" ")}>
            <div className="game-status">{gameStatus}</div>
            <div className="score"><span>Poäng: {score}</span><span>Bäst: {highScore}</span></div>
        </div>
    );
}

export default GameStatus;