import React from 'react';
import { range, sample } from '../../utils';
import { WORDS } from '../../data';
import GuessInput from '../GuessInput/GuessInput';
import Guess from '../Guess/Guess';
import { NUM_OF_GUESSES_ALLOWED, keyboardLetters } from '../../constants';
import { replaceArrayItemWithGuess, showHappyBanner, showSadBanner } from '../../game-helpers';
import Keyboard from '../Keyboard/Keyboard';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });
const initialGuessList = range(NUM_OF_GUESSES_ALLOWED).map(_item => "");
const initialKeyboardLetters = keyboardLetters.map(letter => ({ value: letter, status: ""}));

function Game() {
  // const [answer, setAnswer] = React.useState(sampledAnswer);
  const [guess, setGuess] = React.useState("");
  const [guessList, setGuessList] = React.useState(initialGuessList);
  const [hasEnded, setHasEnded] = React.useState(false);
  const [banner, setBanner] = React.useState();
  const [keyboardValues, setKeyboardValues] = React.useState(initialKeyboardLetters);

  const handleGuessInputChange = (e) => {
    const value = e.target.value;
    setGuess(value.toUpperCase());
  }
  const handleGuessInputSubmit = (e) => {
    e.preventDefault();
    const updatedList = replaceArrayItemWithGuess(guessList, guess);
    console.log(updatedList);
    setGuessList(updatedList);
    setGuess("");
  }
  const restartGame = React.useCallback(() => {
    window.location.reload();
  }, []);

  const handleLetterColorFiller = (newValue) => setKeyboardValues(newValue);

  React.useEffect(()=>{
    const endGame = guessList.every(word => word !== "")
    const userWon = guessList.find(word => word === answer);
    const numberOfGuesses = guessList.findIndex(word => word === answer) + 1;

    if (userWon) {
      setHasEnded(true);
      setBanner(showHappyBanner(numberOfGuesses, restartGame));
    } else if (endGame) {
      setHasEnded(true);
      if (userWon) {
        setBanner(showHappyBanner(numberOfGuesses, restartGame));
      } else {
        setBanner(showSadBanner(answer, restartGame));
      }
    }
  }, [guessList, restartGame])

  return (
    <>
      <Guess
        guessList={guessList}
        answer={answer}
        keyboardValues={keyboardValues}
        keyboardColorFiller={handleLetterColorFiller}
      />
      {hasEnded && banner}
      <GuessInput
        guessInput={guess}
        handleOnChange={handleGuessInputChange}
        handleOnSubmit={handleGuessInputSubmit}
      />
      <Keyboard letters={keyboardValues}/>
    </>
  );
}

export default Game;
