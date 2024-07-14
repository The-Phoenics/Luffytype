import { data } from "./Data";
import {
  addCursor,
  onLetterPending,
  onLetterTypedCorrect,
  onLetterTypedIncorrect,
  onSpacePending,
  removeCursor,
} from "./TextUtils";

export const handleBackSpace = (wordsElementRef) => {
  // check for cursor at first letter and first work
  if (!(data.currentWord == 0 && data.currentLetter == 0)) {
    let currWordElement = wordsElementRef.current.childNodes[data.currentWord];
    let currLetterElement = currWordElement.childNodes[data.currentLetter];

    // at whitespace element
    if (currLetterElement.classList.contains("whitespace-element")) {
      removeCursor(currLetterElement);
      data.currentWord--;
      currWordElement = wordsElementRef.current.childNodes[data.currentWord];
      data.letterCountInCurrentWord = currWordElement.childNodes.length;
      data.currentLetter = data.letterCountInCurrentWord - 1;
      currLetterElement = currWordElement.childNodes[data.currentLetter];
      addCursor(currLetterElement);
      onLetterPending(currLetterElement);
      onSpacePending(currLetterElement);
      return;
    }

    // at first letter of word element
    if (data.currentLetter == 0) {
      removeCursor(currLetterElement);
      onLetterPending(currLetterElement);
      data.currentWord--;
      currWordElement = wordsElementRef.current.childNodes[data.currentWord];
      data.letterCountInCurrentWord = currWordElement.childNodes.length;
      data.currentLetter = data.letterCountInCurrentWord - 1;
      currLetterElement = currWordElement.childNodes[data.currentLetter];
      onSpacePending(currLetterElement);
      return;
    }

    removeCursor(currLetterElement);
    onLetterPending(currLetterElement);
    data.currentLetter--;
    currLetterElement = currWordElement.childNodes[data.currentLetter];
    addCursor(currLetterElement);
    onLetterPending(currLetterElement);
  }
};

export const handleKeyPress = (pressedKeyValue, wordsElementRef) => {
  let currWordElement = wordsElementRef.current.childNodes[data.currentWord];
  let currLetterElement = currWordElement.childNodes[data.currentLetter];
  data.letterCountInCurrentWord = currWordElement.childNodes.length;
  const correct = currLetterElement.innerText === pressedKeyValue;

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
  // add cursor from previous letter element
  removeCursor(currLetterElement);

  // update data
  data.currentLetter = data.currentLetter + 1;

  // move to next word
  if (data.letterCountInCurrentWord === data.currentLetter) {
    // moveToNextWord
    data.currentWord = data.currentWord + 1;
    data.currentLetter = 0;
    data.letterCountInCurrentWord = 0;
  }

  // add cursor to current letter element
  currWordElement = wordsElementRef.current.childNodes[data.currentWord];
  currLetterElement = currWordElement.childNodes[data.currentLetter];
  addCursor(currLetterElement);
};
