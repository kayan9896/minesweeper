
import React from 'react';
import './App.css'; // Import your stylesheet

function Cell({ value, revealed, flagged, onLeftClick, onRightClick}) {
  if (value==='M') value='*'
  let displayValue = (revealed&&value!=='0') ? value : ''; // Show value if revealed
  if (flagged&&!revealed) {
    displayValue = '🚩'; // Display a flag
  }

  return (
    <div className={revealed ? 'cell revealed' : 'cell'}
      onClick={onLeftClick}
      onContextMenu={(e) => { 
        e.preventDefault(); 
        onRightClick(); 
      }}
    >
      {displayValue} 
    </div>
  );
}

export default Cell;
