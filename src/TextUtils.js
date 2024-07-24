export function GStyleLetterAsCorrect(letterElement) {
  letterElement.classList.remove("letter-pending");
  letterElement.classList.add("letter-typed-correct");
  letterElement.classList.remove("letter-typed-incorrect");
}

export function GStyleLetterAsIncorrect(letterElement) {
  letterElement.classList.remove("letter-pending");
  letterElement.classList.remove("letter-typed-correct");
  letterElement.classList.add("letter-typed-incorrect");
}

export function GMakeSpaceElementCorrect(letterElement) {
  if (letterElement.innerText == "_") {
    letterElement.innerText = " ";
  }
  letterElement.classList.add("letter-typed-correct");
}

export function GMakeSpaceElementIncorrect(letterElement) {
  letterElement.textContent = "_";
  letterElement.classList.remove("letter-pending");
  letterElement.classList.remove("letter-typed-correct");
  letterElement.classList.add("letter-typed-incorrect");
}

export function GStyleLetterAsPending(letterElement) {
  letterElement.classList.add("letter-pending");
  letterElement.classList.remove("letter-typed-correct");
  letterElement.classList.remove("letter-typed-incorrect");
}

export function GStyleSpaceLetterPending(letterElement) {
  if (letterElement.textContent === "_") {
    letterElement.textContent === " ";
  }
  letterElement.childNodes[1].classList.remove("letter-typed-correct");
  letterElement.childNodes[1].classList.remove("letter-typed-incorrect");
}

export function GAddCursor(letterElement) {
  // first child node is text node
  letterElement.childNodes[1].classList.add("cursor");
}

export function GRemoveCursor(letterElement) {
  letterElement.childNodes[1].classList.remove("cursor");
}
