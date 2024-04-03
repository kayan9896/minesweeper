
import React, { useEffect, useState } from 'react';
import './App.css'; // Import your stylesheet

function Cell({ value, revealed, flagged, onLeftClick, onRightClick,chord}) {
  function show(value,revealed,flagged){
    if (flagged&&!revealed) return '🚩'
    if(revealed&&value!=='0'){
      if (value==='M'||value==='X') return '✹'
      return value
    }  
    return ''
  }
  useEffect(()=>{
    setD(show(value,revealed,flagged))
  },[value,revealed,flagged])
  const [displayValue,setD]=useState(show(value,revealed,flagged))
  
  let leftButtonDown = false;
  let rightButtonDown = false;
  return (
    <div className={revealed ? (value==='X'?'cell explode':'cell revealed') : 'cell'}
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
