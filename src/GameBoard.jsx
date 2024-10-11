/*
    Inlämningsuppgift 2 "Röj", JavaScript 3, Kristoffer Bengtsson (FE23)
    Component for the game board, keeping the current game state, renders cells/squares and handles the player clicking on them. 
*/
import React from "react";
import createBoard from "./utils";
import GameCell from "./GameCell";
import GameStatus from "./GameStatus";

class GameBoard extends React.Component {

    mineCount = 7;  // Number of mines to place on the board
    boardSize = 5;  // Number of rows/columns on the board.
    state = {};

    // Constructor, initialize game board and start game. 
    constructor(props) {
        super(props);
        this.state.cells = createBoard(this.boardSize * this.boardSize, this.mineCount);
        this.state.moveCount = 0; // Track number of cells the player has clicked on, doubles as the score. 
        this.state.controlsEnabled = true; // Is the player allowed to click on the cells on the board? 
        this.state.gameState = "Ongoing"; // State of the game [Ongoing|Victory|Exploded]

        this.restartGame = this.restartGame.bind(this);
    }

    // Reset the game board and start a new game.
    restartGame() {
        const newState = {
            cells: createBoard(this.boardSize * this.boardSize, this.mineCount),
            moveCount: 0,
            controlsEnabled: true,
            gameState: "Ongoing"
        }
        this.setState(newState);
    }

    // Event handler when a board cell has been clicked. Check for victory/loss and update score. 
    onCellClick = (cell) => {
        // Clone current state
        const newState = {
            ...this.state,
            cells: this.state.cells.map((cell) => { return { ...cell }; }),
        }

        // Cell is clicked, display its content. 
        newState.cells[cell.index].visible = true;

        // Player clicked on a mine. Game over!
        if (cell.hasMine) {
            newState.controlsEnabled = false;
            newState.gameState = "Exploded";
        }
        else {
            // Check for victory condition (all non-mine squares clicked)
            newState.moveCount++;
            if (newState.moveCount >= (this.boardSize * this.boardSize) - this.mineCount) {
                newState.controlsEnabled = false;
                newState.gameState = "Victory";
            }
        }

        // Update the state with changes. 
        this.setState(newState);
    }

    // Render component, creating the cell components on the game board, along with a status component showing the score and victory/loss messages. 
    // Display button to restart the game if the current game is won or lost. 
    render() {
        return (
            <div className="game-board-container">
                <GameStatus gameState={this.state.gameState} score={this.state.moveCount} mineCount={this.mineCount} />
                <div className="game-board">
                    {
                        this.state.cells.map(
                            (currCell) => <GameCell key={currCell.index} cell={currCell} onClick={this.onCellClick} enabled={this.state.controlsEnabled} />
                        )
                    }
                </div>
                {(this.state.gameState == "Exploded" || this.state.gameState == "Victory") && <button onClick={this.restartGame}>Spela igen!</button>}
            </div>
        );
    }
}

export default GameBoard;