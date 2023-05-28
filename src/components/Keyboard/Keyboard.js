import React from "react";

function Keyboard({letters}) {
  return (
    <div className="keyboard-container">
      {letters.map(letter => (
        <p key={letter.value} className={`keyboard-letter ${letter.status}`}>{letter.value}</p>
      ))}
    </div>
  );
}

export default Keyboard;
