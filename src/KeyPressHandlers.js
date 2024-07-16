import { GData as data } from "./Data";
import {
  GAddCursor,
  GStyleLetterAsPending,
  GStyleLetterAsCorrect,
  GStyleLetterAsIncorrect,
  GStyleSpaceLetterPending,
  GRemoveCursor,
} from "./TextUtils";

export const GHandleBackSpaceKeyPress = (wordsElementRef) => {
  // check for cursor at first letter and first work
  if (!(data.currentWord == 0 && data.currentLetter == 0)) {
    let currentWordElement = wordsElementRef.current.childNodes[data.currentWord];
    let currentLetterElement = currentWordElement.childNodes[data.currentLetter];

    // at whitespace element
    if (currentLetterElement.classList.contains("whitespace-element")) {
      // hop to previous word
      GRemoveCursor(currentLetterElement);
      data.currentWord--;
      currentWordElement = wordsElementRef.current.childNodes[data.currentWord];
      data.letterCountInCurrentWord = currentWordElement.childNodes.length;
      data.currentLetter = data.letterCountInCurrentWord - 1;
      currentLetterElement = currentWordElement.childNodes[data.currentLetter];
      GAddCursor(currentLetterElement);
      GStyleLetterAsPending(currentLetterElement);
      GStyleSpaceLetterPending(currentLetterElement);
      FocusScrollCurrentWord(currentWordElement);
      return;
    }

    // at first letter of word element
    if (data.currentLetter == 0) {
      GRemoveCursor(currentLetterElement);
      GStyleLetterAsPending(currentLetterElement);
      data.currentWord--;
      currentWordElement = wordsElementRef.current.childNodes[data.currentWord];
      data.letterCountInCurrentWord = currentWordElement.childNodes.length;
      data.currentLetter = data.letterCountInCurrentWord - 1;
      currentLetterElement = currentWordElement.childNodes[data.currentLetter];
      GStyleSpaceLetterPending(currentLetterElement);
      return;
    }

    // Ctrl + Backspace: reset current word
    if (data.isCtrlKeyHeldDown) {
      GRemoveCursor(currentLetterElement);
      HandleCtrlBackspace(currentWordElement);
      return;
    }

    // hop to previous letter
    GRemoveCursor(currentLetterElement);
    GStyleLetterAsPending(currentLetterElement);
    data.currentLetter--;
    currentLetterElement = currentWordElement.childNodes[data.currentLetter];
    GAddCursor(currentLetterElement);
    GStyleLetterAsPending(currentLetterElement);
  }
};

export const GHandleLetterKeyPress = (pressedKeyValue, wordsElementRef) => {
  let currentWordElement = wordsElementRef.current.childNodes[data.currentWord];
  let currentLetterElement = currentWordElement.childNodes[data.currentLetter];
  data.letterCountInCurrentWord = currentWordElement.childNodes.length;
  const correct = currentLetterElement.innerText === pressedKeyValue;

  if (currentLetterElement.classList.contains("whitespace-element")) {
    // for whitespace elements
    if (pressedKeyValue === " ") {
      GStyleLetterAsCorrect(currentLetterElement);
    } else {
      GStyleLetterAsIncorrect(currentLetterElement);
    }
  } else {
    // for letter elements
    if (correct) {
      GStyleLetterAsCorrect(currentLetterElement);
    } else {
      GStyleLetterAsIncorrect(currentLetterElement);
    }
  }
  // add cursor from previous letter element
  GRemoveCursor(currentLetterElement);

  // update data
  data.currentLetter = data.currentLetter + 1;

  // hop to next word
  if (data.letterCountInCurrentWord === data.currentLetter) {
    // moveToNextWord
    data.currentWord = data.currentWord + 1;
    data.currentLetter = 0;
    data.letterCountInCurrentWord = 0;
    currentWordElement = wordsElementRef.current.childNodes[data.currentWord];
    FocusScrollCurrentWord(currentWordElement);
  }

  // add cursor to current letter element
  currentWordElement = wordsElementRef.current.childNodes[data.currentWord];
  currentLetterElement = currentWordElement.childNodes[data.currentLetter];
  GAddCursor(currentLetterElement);
};

const HandleCtrlBackspace = (currentWordElement) => {
  data.currentLetter = 0;
  currentWordElement.childNodes.forEach((letter) => {
    GStyleLetterAsPending(letter);
  });
  const currentLetterElement = currentWordElement.childNodes[0];
  GAddCursor(currentLetterElement);
};

const FocusScrollCurrentWord = (currentWordElement) => {
  if (currentWordElement) {
    const letterElement = currentWordElement.childNodes[0];
    if (!letterElement.classList.contains("whitespace-element")) {
      currentWordElement.scrollIntoView({ behavior: "smooth" });
    }
  }
};
