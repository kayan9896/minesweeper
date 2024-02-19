
import React from 'react';
import './App.css'; // Import your stylesheet

function Cell({ value, revealed, flagged }) {
  let displayValue = revealed ? value : ''; // Show value if revealed
  if (flagged) {
    displayValue = '🚩'; // Display a flag
  }

  return (
    <div className={revealed ? 'cell revealed' : 'cell'}>
      {displayValue} 
    </div>
  );
}

export default Cell;