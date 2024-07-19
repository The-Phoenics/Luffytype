import { GData as data, GResetData } from "./Data";
import {
  GAddCursor,
  GStyleLetterAsPending,
  GStyleLetterAsCorrect,
  GStyleLetterAsIncorrect,
  GStyleSpaceLetterPending,
  GRemoveCursor,
  GMakeSpaceElementIncorrect,
} from "./TextUtils";

export const GHandleBackSpaceKeyPress = (wordsElementRef) => {
  // check for cursor at first letter and first work
  if (!(data.currentWord == 0 && data.currentLetter == 0)) {
    let currentWordElement = wordsElementRef.current.childNodes[data.currentWord].childNodes[0];
    let currentLetterElement = currentWordElement.childNodes[data.currentLetter];

    // at whitespace element
    if (currentLetterElement.classList.contains("whitespace-element")) {
      // hop to previous word
      GRemoveCursor(currentLetterElement);
      data.currentWord--;
      currentWordElement = wordsElementRef.current.childNodes[data.currentWord].childNodes[0];
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
      currentWordElement = wordsElementRef.current.childNodes[data.currentWord].childNodes[0];
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
  // handle letter element
  if (!data.isAtSpaceElement) {
    let currentWordElement = wordsElementRef.current.childNodes[data.currentWord].childNodes[0];
    let currentLetterElement = currentWordElement.childNodes[data.currentLetter];
    data.letterCountInCurrentWord = currentWordElement.childNodes.length;
    GRemoveCursor(currentLetterElement);

    if (pressedKeyValue == currentLetterElement.innerText) {
      GStyleLetterAsCorrect(currentLetterElement);
    } else {
      GStyleLetterAsIncorrect(currentLetterElement);
    }

    data.currentLetter++;
    if (data.letterCountInCurrentWord === data.currentLetter) {
      data.isAtSpaceElement = true;
      currentWordElement = wordsElementRef.current.childNodes[data.currentWord].childNodes[1];
      currentLetterElement = currentWordElement.childNodes[0];
      GAddCursor(currentLetterElement);
    } else {
      currentLetterElement = currentWordElement.childNodes[data.currentLetter];
      GAddCursor(currentLetterElement);
    }
  }

  // handle space element
  else {
    let currentWordElement = wordsElementRef.current.childNodes[data.currentWord].childNodes[1];
    let currentLetterElement = currentWordElement.childNodes[0];

    GRemoveCursor(currentLetterElement);
    if (pressedKeyValue === " ") {
      GStyleLetterAsCorrect(currentLetterElement);
    } else {
      GMakeSpaceElementIncorrect(currentLetterElement);
    }

    data.currentWord++;
    data.currentLetter = 0;
    data.isAtSpaceElement = false;

    currentWordElement = wordsElementRef.current.childNodes[data.currentWord].childNodes[0];
    currentLetterElement = currentWordElement.childNodes[data.currentLetter];
    data.letterCountInCurrentWord = currentWordElement.childNodes.length;
    GAddCursor(currentLetterElement);
    if (data.currentWord > 4) {
      FocusScrollCurrentWord(currentWordElement);
    }
  }
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
