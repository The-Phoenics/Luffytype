import { GData as data } from "./Data";
import {
  GAddCursor,
  GStyleLetterAsPending,
  GStyleLetterAsCorrect,
  GStyleLetterAsIncorrect,
  GStyleSpaceLetterPending,
  GRemoveCursor,
  GMakeSpaceElementIncorrect,
  GMakeSpaceElementCorrect,
} from "./TextUtils";

export function GetCurrentWordNode(wordsElementRef) {
  return wordsElementRef.current.childNodes[data.currentWord].childNodes[0];
}

export function GetCurrentLetterNode(wordsElementRef) {
  const currentWordNode = GetCurrentWordNode(wordsElementRef);
  return currentWordNode.childNodes[data.currentLetter];
}

export function GetCurrentSpaceNode(wordsElementRef) {
  const currentSpaceContainerNode =
    wordsElementRef.current.childNodes[data.currentWord].childNodes[1];
  return currentSpaceContainerNode.childNodes[0];
}

export const GHandleBackSpaceKeyPress = (wordsElementRef) => {
  if (!(data.currentWord == 0 && data.currentLetter == 0)) {
    let currentWordElement = GetCurrentWordNode(wordsElementRef);
    let currentLetterElement = GetCurrentLetterNode(wordsElementRef);

    // when at a space element
    if (data.isAtSpaceElement) {
      currentLetterElement = GetCurrentSpaceNode(wordsElementRef);
      GRemoveCursor(currentLetterElement);
      GStyleSpaceLetterPending(currentLetterElement);

      data.letterCountInCurrentWord = currentWordElement.childNodes.length;
      data.currentLetter = data.letterCountInCurrentWord - 1;
      currentLetterElement = currentWordElement.childNodes[data.currentLetter];
      data.isAtSpaceElement = false;

      GAddCursor(currentLetterElement);
      GStyleLetterAsPending(currentLetterElement);
      return;
    }

    // at first letter of word element
    if (data.currentLetter == 0) {
      GRemoveCursor(currentLetterElement);
      GStyleLetterAsPending(currentLetterElement);
      data.currentWord--;
      data.isAtSpaceElement = true;

      // set letter count
      currentWordElement = wordsElementRef.current.childNodes[data.currentWord].childNodes[0]; // ..
      currentLetterElement = GetCurrentLetterNode(wordsElementRef);
      data.letterCountInCurrentWord = currentWordElement.childNodes.length;
      data.currentLetter = data.letterCountInCurrentWord - 1;

      // update the space element
      currentWordElement = wordsElementRef.current.childNodes[data.currentWord].childNodes[1]; // ..
      currentLetterElement = currentWordElement.childNodes[0];
      if (currentLetterElement.innerText == "_") {
        currentLetterElement.innerHTML = "&nbsp;<span></span>";
      }
      GStyleSpaceLetterPending(currentLetterElement);
      GAddCursor(currentLetterElement);

      // Focus scoll on the previous word element
      currentWordElement = wordsElementRef.current.childNodes[data.currentWord].childNodes[0]; // ..
      FocusScrollCurrentWord(currentWordElement);
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
    currentLetterElement = GetCurrentLetterNode(wordsElementRef);
    GAddCursor(currentLetterElement);
    GStyleLetterAsPending(currentLetterElement);
  }
};

export const GHandleLetterKeyPress = (pressedKeyValue, wordsElementRef, setIsAtMiddle) => {
  const isAtMiddleOfText = data.currentWord >= data.wordsCount / 2;
  if (isAtMiddleOfText) {
    setIsAtMiddle(true);
  }

  // handle letter element
  if (!data.isAtSpaceElement) {
    let currentWordElement = wordsElementRef.current.childNodes[data.currentWord].childNodes[0];    
    let currentLetterElement = currentWordElement.childNodes[data.currentLetter];
    FocusScrollCurrentWord(currentWordElement);
    data.letterCountInCurrentWord = currentWordElement.childNodes.length;
    // remove cursor from current letter element
    GRemoveCursor(currentLetterElement);

    if (pressedKeyValue == currentLetterElement.innerText) {
      GStyleLetterAsCorrect(currentLetterElement);
    } else {
      GStyleLetterAsIncorrect(currentLetterElement);
    }

    data.currentLetter++;
    if (data.letterCountInCurrentWord === data.currentLetter) {
      // when at last letter of word
      data.isAtSpaceElement = true;
      currentWordElement = GetCurrentWordNode(wordsElementRef);
      let currentSpaceElement = GetCurrentSpaceNode(wordsElementRef);
      GAddCursor(currentSpaceElement);
    } else {
      currentLetterElement = GetCurrentLetterNode(wordsElementRef);
      GAddCursor(currentLetterElement);
    }
  }

  // handle key press while at space element
  else {
    let currentWordElement = GetCurrentWordNode(wordsElementRef);
    let currentSpaceElement = GetCurrentSpaceNode(wordsElementRef);

    GRemoveCursor(currentSpaceElement);
    if (pressedKeyValue === " ") {
      GMakeSpaceElementCorrect(currentSpaceElement);
    } else {
      GMakeSpaceElementIncorrect(currentSpaceElement);
    }

    data.currentWord++;
    data.currentLetter = 0;
    data.isAtSpaceElement = false;

    let currentLetterElement = GetCurrentLetterNode(wordsElementRef);
    data.letterCountInCurrentWord = currentWordElement.childNodes.length;
    GAddCursor(currentLetterElement);
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

export const FocusScrollCurrentWord = (currentWordElement) => {
  if (currentWordElement) {
    setTimeout(() => {
      const letterElement = currentWordElement.childNodes[0];
      if (!letterElement.classList.contains("whitespace-element")) {
        currentWordElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }
};
