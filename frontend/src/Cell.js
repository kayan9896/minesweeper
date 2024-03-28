
import React from 'react';
import './App.css'; // Import your stylesheet

function Cell({ value, revealed, flagged, onLeftClick, onRightClick,chord}) {
  if (value==='M') value='*'
  let displayValue = (revealed&&value!=='0') ? value : ''; // Show value if revealed
  if (flagged&&!revealed) {
    displayValue = '🚩'; // Display a flag
  }
  let leftButtonDown = false;
  let rightButtonDown = false;
  return (
    <div className={revealed ? 'cell revealed' : 'cell'}
      onClick={onLeftClick}
      onContextMenu={(e) => { 
        e.preventDefault(); 
        onRightClick(); 
      }}
      onMouseDown={(e)=>{
        if (e.button === 0) {
          leftButtonDown = true;
        }
        // right click
        if (e.button === 2) {
            rightButtonDown = true;
        }
        if (leftButtonDown && rightButtonDown) {
            chord()
        }
      }}
      onMouseUp={(e)=>{
        if (e.button === 0) {
          leftButtonDown = false;
        }
        if (e.button === 2) {
            rightButtonDown = false;
        }
      }}
    >
      {displayValue} 
    </div>
  );
}

export default Cell;
