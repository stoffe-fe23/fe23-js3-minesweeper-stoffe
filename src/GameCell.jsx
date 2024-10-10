/*
    Inlämningsuppgift 2 "Röj", JavaScript 3, Kristoffer Bengtsson (FE23)
    Component for a cell on the game board. Displays the state of the cell and allows the player to click on it, if enabled. 
*/

function GameCell({ cell, onClick, enabled }) {
    // Add class depending on number of adjacent mines, for color coding... 
    const cellClasses = ["game-cell", `game-cell-mines-${cell.numberOfNeighbouringMines}`];
    let cellContent = "❔"; // Default/not clicked by player


    if (cell.visible && cell.hasMine) {
        // If cell has a mine, show explody emoji and color the square red.
        cellContent = "💥";
        cellClasses.push("mine");
    }
    else if (cell.visible) {
        // If the cell is clicked by the player, show number of adjacent mines. 
        cellContent = cell.numberOfNeighbouringMines;
        cellClasses.push("visible");
    }

    // Render the cell as a button. 
    return (<button disabled={!enabled || cell.visible} className={cellClasses.join(" ")} onClick={(evt) => onClick(cell)}>{cellContent}</button>);
}


export default GameCell;