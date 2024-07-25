// letter elements (alphabets)
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

// space element
export function GMakeSpaceElementPending(spaceElement) {
  if (spaceElement.childNodes[0].innerText === "_") {
    spaceElement.childNodes[0].innerHTML = "&nbsp;<span></span>";
  }
  spaceElement.childNodes[0].classList.add("letter-pending");
  spaceElement.childNodes[0].classList.remove("letter-typed-correct");
  spaceElement.childNodes[0].classList.remove("letter-typed-incorrect");
}

export function GMakeSpaceElementCorrect(spaceElement) {
  if (spaceElement.innerText == "_") {
    spaceElement.innerText = " ";
  }
  spaceElement.classList.add("letter-typed-correct");
}

export function GMakeSpaceElementIncorrect(spaceElement) {
  spaceElement.textContent = "_";
  spaceElement.classList.add("letter-typed-incorrect");
  spaceElement.classList.remove("letter-pending");
  spaceElement.classList.remove("letter-typed-correct");
}

// cursor
export function GAddCursor(letterElement) {
  // first child node is text node
  letterElement.childNodes[1].classList.add("cursor");
}

export function GRemoveCursor(letterElement) {
  letterElement.childNodes[1].classList.remove("cursor");
}
