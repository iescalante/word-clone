import React from "react";

function GuessInput({ guessInput, handleOnChange, handleOnSubmit }) {
  return (
    <form
      className="guess-input-wrapper"
      onSubmit={handleOnSubmit}
    >
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        value={guessInput}
        onChange={handleOnChange}
        pattern="[A-Z]{5}"
        title="Should be a 5-character word."
      />
    </form>
  );
}

export default GuessInput;
