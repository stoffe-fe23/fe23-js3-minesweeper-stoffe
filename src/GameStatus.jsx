/*
    Inlämningsuppgift 2 "Röj", JavaScript 3, Kristoffer Bengtsson (FE23)
    Component for the status indicator showing the players progress in the game.
*/
import { useState, useEffect } from "react";

function GameStatus({ gameState, score }) {
    let gameStatus = "";
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

    // Set status text and color depending on the state of the game.
    switch (gameState) {
        case "Victory": // Player has avoided all mines and uncovered all other squares.
            gameStatus = "Seger!";
            statusClass.push("victory");
            break;
        case "Exploded": // Player stepped on a mine.
            gameStatus = `Exploderad!`;
            statusClass.push("defeat");
            break;
        case "Ongoing": // The game is still going, show the current score.
            gameStatus = `Välj ruta`;
            break;
    }

    // Render the status text.
    return (<div className={statusClass.join(" ")}><div>{gameStatus}</div><div className="score">Poäng: {score} (Bäst: {highScore})</div></div>);
}

export default GameStatus;