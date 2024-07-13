export function onLetterTypedCorrect(letterElement) {
  letterElement.classList.remove("letter-pending");
  letterElement.classList.add("letter-typed-correct");
  letterElement.classList.remove("letter-typed-incorrect");
}

export function onLetterTypedIncorrect(letterElement) {
  letterElement.classList.remove("letter-pending");
  letterElement.classList.remove("letter-typed-correct");
  letterElement.classList.add("letter-typed-incorrect");
}

export function onLetterPending(letterElement) {
  letterElement.classList.add("letter-pending");
  letterElement.classList.remove("letter-typed-correct");
  letterElement.classList.remove("letter-typed-incorrect");
}

export function onSpacePending(letterElement) {
  letterElement.classList.remove("letter-typed-correct");
  letterElement.classList.remove("letter-typed-incorrect");
}
