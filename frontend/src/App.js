import React, { useState, useEffect } from 'react';
import Minesweeper from './utils.js';
import Cell from './Cell.js';
import './App.css'; 

function App() {
  const [game, setGame] = useState(null);
  const [boardState, setBoardState] = useState([]);

  const startGame = () => {
    const newGame = new Minesweeper(10); // 10 mines
    setGame(newGame);
    setBoardState(newGame.board);
  };

  useEffect(() => {
    // You might want to update boardState based on game actions here
  }, [game]);

  const renderBoard = () => {
    return boardState.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((cellValue, colIndex) => (
          <Cell 
            key={`${rowIndex}-${colIndex}`}
            value={cellValue}
            revealed={game.revealed[rowIndex][colIndex]}
            flagged={game.flagged[rowIndex][colIndex]}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="game-container">
      <h1>Minesweeper</h1>
      {!game && <button onClick={startGame}>Start Game</button>}
      {game && renderBoard()}
    </div>
  );
}

export default App;