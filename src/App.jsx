/*
    Inlämningsuppgift 2 "Röj", JavaScript 3, Kristoffer Bengtsson (FE23)
    Main App component. Display the game board. 
*/
import './App.css';
import GameBoard from './GameBoard';

function App() {

    return (
        <div id="game">
            <h1>Minröjning</h1>
            <GameBoard />
        </div>
    )
}

export default App;
