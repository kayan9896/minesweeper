import React, { useEffect, useState } from 'react';
import Minesweeper from './utils.js';
import Cell from './Cell.js';
import './App.css';

function App() {
  const [game, setGame] = useState(null);
  const [board, setBoard] = useState([]);
  const [txt,setTxt]=useState(null)
  useEffect(function(){
    if(game){
    setTxt(game.txt)
    console.log(txt)
  }
  },[board])
  const startGame = () => {
    const newGame = new Minesweeper(10); // Create a new game with 10 mines
    setGame(newGame);
    setBoard(newGame.board);
  };
  const handleLeftClick = (rowIndex, colIndex) => {
    if (game) { // Make sure the game has started
      game.reveal(rowIndex, colIndex);
      setBoard(()=>([...game.board]));
    }
  };

  const handleRightClick = (rowIndex, colIndex) => {
    if (game) {
      game.flag(rowIndex, colIndex);
      setBoard(()=>([...game.board]));
    }
  };

  function clickboth(r,c){
    if (game) {
      game.chord(r, c);
      setBoard(()=>([...game.board]));
      console.log('chord')
    }
  }

  return (
    <div className="container">
      <h1>Minesweeper</h1>
      {!game && <button onClick={startGame}>Start Game</button>}
      {!txt?<div style={{marginBottom:'12px'}}><h1> </h1></div>:<div style={{marginBottom:'12px'}}>
        <div>{txt}</div>
        <button onClick={startGame}>Restart</button>
      </div>}
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
                  chord={function(){clickboth(rowIndex,colIndex)}}
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
