import { data } from "./App";
import {
  onLetterPending,
  onLetterTypedCorrect,
  onLetterTypedIncorrect,
  onSpacePending,
} from "./TextUtils";

export const handleBackSpace = (wordsElementRef) => {
  if (data.currentWord != 0 && data.currentLetter != 0) {
    console.log("handle backspacep");
    let currWordElement = wordsElementRef.current.childNodes[data.currentWord];
    let currLetterElement = currWordElement.childNodes[data.currentLetter];

    // at whitespace element
    if (currLetterElement.classList.contains("whitespace-element")) {
      data.currentWord--;
      currWordElement = wordsElementRef.current.childNodes[data.currentWord];
      data.letterCountInCurrentWord = currWordElement.childNodes.length;
      data.currentLetter = data.letterCountInCurrentWord - 1;
      currLetterElement = currWordElement.childNodes[data.currentLetter];
      onSpacePending(currLetterElement);
      return;
    }

    // at first letter of word element
    if (data.currentLetter == 0) {
      onLetterPending(currLetterElement);
      data.currentWord--;
      currWordElement = wordsElementRef.current.childNodes[data.currentWord];
      data.letterCountInCurrentWord = currWordElement.childNodes.length;
      data.currentLetter = data.letterCountInCurrentWord - 1;
      currLetterElement = currWordElement.childNodes[data.currentLetter];
      onSpacePending(currLetterElement);
      return;
    }

    //..
    data.currentLetter--;
    currLetterElement = currWordElement.childNodes[data.currentLetter];
    onLetterPending(currLetterElement);
  }
};

export const handleKeyPress = (pressedKeyValue, wordsElementRef) => {
  console.log(pressedKeyValue);
  const currWordElement = wordsElementRef.current.childNodes[data.currentWord];
  const currLetterElement = currWordElement.childNodes[data.currentLetter];
  data.letterCountInCurrentWord = currWordElement.childNodes.length;
  const correct = currLetterElement.innerText === pressedKeyValue;
  // console.log(`curr letter: "${currLetterElement.innerText}"m "${pressedKeyValue}"`);

  // update styling
  if (currLetterElement.classList.contains("whitespace-element")) {
    // for whitespace elements
    if (pressedKeyValue === " ") {
      onLetterTypedCorrect(currLetterElement);
    } else {
      onLetterTypedIncorrect(currLetterElement);
    }
  } else {
    // for letter elements
    if (correct) {
      onLetterTypedCorrect(currLetterElement);
    } else {
      onLetterTypedIncorrect(currLetterElement);
    }
  }

  // update data
  data.currentLetter = data.currentLetter + 1;

  // move to next word
  if (data.letterCountInCurrentWord === data.currentLetter) {
    // moveToNextWord
    data.currentWord = data.currentWord + 1;
    data.currentLetter = 0;
    data.letterCountInCurrentWord = 0;
  }
};
