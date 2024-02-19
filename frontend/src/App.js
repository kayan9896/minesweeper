import React, { useState } from 'react';
import Minesweeper from './utils.js';
import Cell from './Cell.js';
import './App.css';

function App() {
  const [game, setGame] = useState(null);
  const [board, setBoard] = useState([]);

  const startGame = () => {
    const newGame = new Minesweeper(10); // Create a new game with 10 mines
    setGame(newGame);
    setBoard(newGame.board);
  };
  const handleLeftClick = (rowIndex, colIndex) => {
    if (!game.revealed[rowIndex][colIndex]) {
      game.reveal(rowIndex, colIndex);
      setBoard(game.board); // Update board state to trigger re-render
    }
  };

  const handleRightClick = (rowIndex, colIndex) => {
    e.preventDefault(); // Prevent default right-click menu
    if (!game.revealed[rowIndex][colIndex]) {
      game.flag(rowIndex, colIndex);
      setBoard(game.board); // Update board state
    }
  };

  return (
    <div className="container">
      <h1>Minesweeper</h1>
      {!game && <button onClick={startGame}>Start Game</button>} 
      {game && (
        <div className="board">
          {board.map((row, rowIndex) => (
            <div className="row" key={rowIndex}> 
              {row.map((cellValue, colIndex) => (
                <Cell 
                  key={`${rowIndex}-${colIndex}`} 
                  value={cellValue} 
                  revealed={game.revealed[rowIndex][colIndex]}
                  flagged={game.flagged[rowIndex][colIndex]}
                  onLeftClick={() => handleLeftClick(rowIndex, colIndex)}
                  onRightClick={() => handleRightClick(rowIndex, colIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

