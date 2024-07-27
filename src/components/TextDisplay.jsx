import { useEffect, useState } from "react";
import { GResetData } from "../Data";
import { FocusScrollCurrentWord } from "../KeyPressHandlers";
import { GData as data } from "../Data";
import { GMakeSpaceElementPending, GRemoveCursor, GStyleLetterAsPending } from "../TextUtils";

function Word({ word, isWhiteSpace }) {
  return (
    <span className={`flex mt-2 mb-2 ${isWhiteSpace ? "ml-1" : ""}`}>
      {word.split("").map((letter, index) => {
        return <Letter key={index} letter={letter} isWhiteSpace={isWhiteSpace} />;
      })}
    </span>
  );
}

function Letter({ letter, isWhiteSpace }) {
  return (
    <span
      className={`text-[clamp(1.2em,2.2vw,3vw)] font-medium min-w-[12px] font-NerdFont relative ${
        isWhiteSpace ? "whitespace-element" : "letter-pending"
      }`}
    >
      {letter}
      {/* this is for cursor */}
      <span></span>
    </span>
  );
}

const TextDisplay = ({ wordsElementRef, reset }) => {
  let [text, setText] = useState(["Loading..."]);
  let [fetching, setFetching] = useState(true);

  const fetchTypingText = async () => {
    try {
      const res = await fetch("http://localhost:3000/100");
      if (res.ok) {
        const data = await res.json();
        setText(data);
        setFetching(false);
      } else {
        throw new Error("Response not OK");
      }
    } catch (err) {
      console.log(`Failed to fetch data: ${err}`);
    }
  };

  useEffect(() => {
    fetchTypingText();
    GResetData();
  }, []);

  useEffect(() => {
    if (!fetching) {
      setFetching(true);
      fetchTypingText();

      // remove cursor styling from current element
      const cursorElement =
        wordsElementRef.current.childNodes[data.currentWord].childNodes[0].childNodes[
          data.currentLetter
        ];
      GRemoveCursor(cursorElement);

      for (let i = 0; i <= data.currentWord; i++) {
        const wordContainer = wordsElementRef.current.childNodes[i];
        // reset letter elements
        wordContainer.childNodes[0].childNodes.forEach((letter) => {
          GStyleLetterAsPending(letter);
        });

        // reset the space element
        const spaceElement = wordContainer.childNodes[1];
        GMakeSpaceElementPending(spaceElement);
      }

      GResetData();
      FocusScrollCurrentWord(wordsElementRef.current.childNodes[0]);
    }
  }, [reset]);

  return (
    <div
      ref={wordsElementRef}
      className="w-[80%] words-element  min-w-[370px] max-w-[70vw] flex justify-center items-center gap-1 flex-wrap max-h-[30vh] p-2 overflow-y-hidden"
    >
      {text.map((word, index) => {
        return (
          <span className="flex" key={index}>
            <Word word={word} isWhiteSpace={false} />
            <Word word=" " isWhiteSpace={true} />
          </span>
        );
      })}
    </div>
  );
};

export default TextDisplay;
