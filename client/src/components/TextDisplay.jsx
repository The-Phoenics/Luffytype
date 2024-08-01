import { GResetData } from "../Data";
import { GData as data } from "../Data";
import { useEffect, useRef, useState } from "react";
import { FocusScrollCurrentWord, GetCurrentWordNode } from "../KeyPressHandlers";
import { GMakeSpaceElementPending, GRemoveCursor, GStyleLetterAsPending } from "../TextUtils";
import { GHandleLetterKeyPress, GHandleBackSpaceKeyPress } from "../KeyPressHandlers";
import { GAddCursor } from "../TextUtils";
import { GToggleCtrlHeldDown } from "../Data";
import { GLoadKeyPressAudios, GPlayKeyPressAudio } from "../KeyPressAudio";

const TextDisplay = ({ isAudioOnRef, setIsTypingRef, reset, setReset }) => {
  const wordsElementRef = useRef();
  const [text, setText] = useState(["Loading..."]);
  const [fetching, setFetching] = useState(true);
  const fetchingRef = useRef(fetching);
  const [isAtMiddle, setIsAtMiddle] = useState(false);

  useEffect(() => {
    fetchTypingText();

    const keyPressEL = document.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        setReset((prevResetVal) => !prevResetVal);
        setIsTypingRef.current(false);
      } else {
        if (!fetchingRef.current) {
          GHandleLetterKeyPress(e.key, wordsElementRef, setIsAtMiddle);
          if (isAudioOnRef.current) {
            GPlayKeyPressAudio(e.key);
          }
          setIsTypingRef.current(true);
        }
      }
    });

    const ctrlKeyUpEL = document.addEventListener("keyup", (e) => {
      if (e.key === "Control") {
        GToggleCtrlHeldDown();
      }
    });

    const keyDownEL = document.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        GHandleBackSpaceKeyPress(wordsElementRef);
      }
      if (e.key === "Control") {
        GToggleCtrlHeldDown();
      }
    });

    GLoadKeyPressAudios();

    return () => {
      document.removeEventListener("keypress", keyPressEL);
      document.removeEventListener("keyup", ctrlKeyUpEL);
      document.removeEventListener("keydown", keyDownEL);
    };
  }, []);

  useEffect(() => {
    if (isAtMiddle) {
      appendText();
    }
  }, [isAtMiddle]);

  useEffect(() => {
    fetchingRef.current = fetching;
  }, [fetching]);

  const appendText = async () => {
    try {
      const res = await fetch("https://random-word-api.herokuapp.com/word?number=100");
      if (res.ok) {
        const data = await res.json();
        setText((prev) => [...prev, ...data]);
        setIsAtMiddle(false);
        setFetching(false);
      } else {
        throw new Error("Response not OK");
      }
    } catch (err) {
      console.log(`Failed to fetch data: ${err}`);
    }
  };

  const fetchTypingText = async () => {
    try {
      const res = await fetch("https://random-word-api.herokuapp.com/word?number=100");
      if (res.ok) {
        const data = await res.json();
        setText(data);
        GAddCursor(wordsElementRef.current.childNodes[0].childNodes[0].childNodes[0]);
      } else {
        throw new Error("Response not OK");
      }
    } catch (err) {
      console.log(`Failed to fetch data: ${err}`);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    const wordsNodeElement = wordsElementRef.current.childNodes;
    const currentWordNode = GetCurrentWordNode(wordsElementRef);
    data.letterCountInCurrentWord = currentWordNode.length;
    data.wordsCount = wordsNodeElement.length;
  }, [text]);

  useEffect(() => {
    if (!fetching) {
      setFetching(true);
      fetchTypingText();

      if (data.isAtSpaceElement) {
        GRemoveCursor(
          wordsElementRef.current.childNodes[data.currentWord].childNodes[1].childNodes[0]
        );
      } else {
        GRemoveCursor(
          wordsElementRef.current.childNodes[data.currentWord].childNodes[0].childNodes[
            data.currentLetter
          ]
        );
      }

      for (let i = 0; i <= data.currentWord; i++) {
        const wordContainer = wordsElementRef.current.childNodes[i];
        wordContainer.childNodes[0].childNodes.forEach((letter) => {
          GStyleLetterAsPending(letter);
        });
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
      className="w-[80%] words-element min-w-[360px] max-w-[70vw] flex justify-center items-center gap-1 flex-wrap min-h-[400px] max-h-[30vh] p-2 overflow-y-hidden"
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

function Word({ word, isWhiteSpace }) {
  return (
    <span className={`flex mt-2 mb-2 ${isWhiteSpace ? "ml-1" : ""}`}>
      {word.split("").map((letter, index) => {
        return (
          <span
            key={index}
            className={`text-[clamp(1.2em,2.2vw, 4rem)] md:text-[1.7vw] font-medium min-w-[12px] font-NerdFont relative ${
              isWhiteSpace ? "whitespace-element" : "letter-pending"
            }`}
          >
            {letter}
            <span></span>
          </span>
        );
      })}
    </span>
  );
}

export default TextDisplay;
