import { GData as data } from "./Data";
import {
  GAddCursor,
  GStyleLetterAsPending,
  GStyleLetterAsCorrect,
  GStyleLetterAsIncorrect,
  GStyleSpaceLetterPending,
  GRemoveCursor,
} from "./TextUtils";

export const handleBackSpace = (wordsElementRef) => {
  // check for cursor at first letter and first work
  if (!(data.currentWord == 0 && data.currentLetter == 0)) {
    let currWordElement = wordsElementRef.current.childNodes[data.currentWord];
    let currLetterElement = currWordElement.childNodes[data.currentLetter];

    // at whitespace element
    if (currLetterElement.classList.contains("whitespace-element")) {
      GRemoveCursor(currLetterElement);
      data.currentWord--;
      currWordElement = wordsElementRef.current.childNodes[data.currentWord];
      data.letterCountInCurrentWord = currWordElement.childNodes.length;
      data.currentLetter = data.letterCountInCurrentWord - 1;
      currLetterElement = currWordElement.childNodes[data.currentLetter];
      GAddCursor(currLetterElement);
      GStyleLetterAsPending(currLetterElement);
      GStyleSpaceLetterPending(currLetterElement);
      return;
    }

    // at first letter of word element
    if (data.currentLetter == 0) {
      GRemoveCursor(currLetterElement);
      GStyleLetterAsPending(currLetterElement);
      data.currentWord--;
      currWordElement = wordsElementRef.current.childNodes[data.currentWord];
      data.letterCountInCurrentWord = currWordElement.childNodes.length;
      data.currentLetter = data.letterCountInCurrentWord - 1;
      currLetterElement = currWordElement.childNodes[data.currentLetter];
      GStyleSpaceLetterPending(currLetterElement);
      return;
    }

    // deleting the current word
    if (data.isCtrlKeyHeldDown) {
      GRemoveCursor(currLetterElement);
      handleCtrlBackspace(currWordElement);
      return;
    }

    GRemoveCursor(currLetterElement);
    GStyleLetterAsPending(currLetterElement);
    data.currentLetter--;
    currLetterElement = currWordElement.childNodes[data.currentLetter];
    GAddCursor(currLetterElement);
    GStyleLetterAsPending(currLetterElement);
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
      GStyleLetterAsCorrect(currLetterElement);
    } else {
      GStyleLetterAsIncorrect(currLetterElement);
    }
  } else {
    // for letter elements
    if (correct) {
      GStyleLetterAsCorrect(currLetterElement);
    } else {
      GStyleLetterAsIncorrect(currLetterElement);
    }
  }
  // add cursor from previous letter element
  GRemoveCursor(currLetterElement);

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
  GAddCursor(currLetterElement);
};

export const handleCtrlBackspace = (currWordElement) => {
  data.currentLetter = 0;
  currWordElement.childNodes.forEach((letter) => {
    GStyleLetterAsPending(letter);
  });
  const currLetterElement = currWordElement.childNodes[0];
  GAddCursor(currLetterElement);
};
