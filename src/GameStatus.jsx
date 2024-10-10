/*
    Inlämningsuppgift 2 "Röj", JavaScript 3, Kristoffer Bengtsson (FE23)
    Component for the status indicator showing the players progress in the game.
*/


function GameStatus({ gameState, score }) {
    let gameStatus = "";
    let statusClass = ["status"];

    // Set status text and color depending on the state of the game.
    switch (gameState) {
        case "Victory": // Player has avoided all mines and uncovered all other squares.
            gameStatus = "Seger!";
            statusClass.push("victory");
            break;
        case "Exploded": // Player stepped on a mine.
            gameStatus = `Exploderad! (${score})`;
            statusClass.push("defeat");
            break;
        case "Ongoing": // The game is still going, show the current score.
            gameStatus = "Poäng: " + score;
            break;
    }

    // Render the status text.
    return (<div className={statusClass.join(" ")}>{gameStatus}</div>);
}

export default GameStatus;