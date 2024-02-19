import React from 'react';
import './Cell.css'; // Assuming you have a Cell.css file for styling

function Cell({ value, revealed, flagged }) {
  let displayValue = '';

  if (revealed) {
    displayValue = value === '_' ? '' : value; // Show number or empty if no adjacent mines
  } else if (flagged) {
    displayValue = '🚩'; // Flag symbol
  }

  return (
    <div className="cell">
      {displayValue} 
    </div>
  );
}

export default Cell;