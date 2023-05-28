import React from "react";
import { range } from "../../utils";
import { checkGuess } from "../../game-helpers";

const gridBuilder = (list, answer, keyboardValues, keyboardColorFiller) => {
  return list.map((guessWord, ndx) => {
    return (
      <p className="guess" key={`${ndx}-${guessWord}`}>
        {cellFiller(guessWord, answer, keyboardValues, keyboardColorFiller)}
      </p>
    )
  });
};

const cellFiller = (guessWord, answer, keyboardValues, keyboardColorFiller) => {
  const lettersToMap = guessWord === ""
    ? range(5)
    : checkGuess(guessWord, answer);
  return lettersToMap.map(((item, ndx) => {
    const valueToBeShown = !isFinite(item)
     ? item.letter
     : "";
    const foundLetter = keyboardValues.find(letter => letter.value === valueToBeShown);
    if (foundLetter && foundLetter.status === "") {
      const newKeyboardValues = keyboardValues.map(letter => {
        const newLetter = { value: letter.value, status: letter.status };
        if (letter.value === foundLetter.value) {
          newLetter.value = valueToBeShown;
          newLetter.status = item.status;
        }
        return newLetter;
      });
      keyboardColorFiller(newKeyboardValues);
    }
    return (
      <span className={`cell ${item.status}`} key={`${guessWord}-${ndx + valueToBeShown}`}>
        {valueToBeShown}
      </span>
    );
  }));
};

function Guess({ guessList, answer, keyboardValues, keyboardColorFiller }) {
  const [newKeyboardValues, setNewKeyboardValues] = React.useState(keyboardValues);

  React.useEffect(() => {
    keyboardColorFiller(newKeyboardValues);
  }, [newKeyboardValues, keyboardColorFiller])

  return (
    <div className="guess-results">
      {gridBuilder(guessList, answer, newKeyboardValues, setNewKeyboardValues)}
    </div>
  );
}

export default Guess;
