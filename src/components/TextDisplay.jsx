import { useEffect, useState } from "react";
import { GResetData } from "../Data";

function Word({ word, isWhiteSpace }) {
  return (
    <div className={`flex ${isWhiteSpace ? "" : "m-2 mr-0 ml-0"}`}>
      {word.split("").map((letter, index) => {
        return <Letter key={index} letter={letter} isWhiteSpace={isWhiteSpace}  />;
      })}
    </div>
  );
}

function Letter({ letter, isWhiteSpace }) {
  return  <div className={`text-[clamp(1.2em,2.5vw,100vw)] font-medium min-w-[12px] font-NerdFont relative ${isWhiteSpace ? "whitespace-element" : "letter-pending mr-[1px]"}`}>{letter}
    {/* this is for cursor */}
    <span></span>
  </div>;
}

const TextDisplay = ({ wordsElementRef }) => {
  let [text, setText] = useState(["Loading..."]);

  const fetchTypingText = async () => {
    const response = await fetch(`https://random-word-api.herokuapp.com/word?number=200`)
    const result = await response.json();
    setText(result);
  }

  useEffect(() => {
    fetchTypingText();
    GResetData();
  }, [])

  return (
    <div
      ref={wordsElementRef}
      className="w-[80%] min-w-[370px] max-w-[70vw] flex justify-center items-center gap-1 flex-wrap max-h-[30vh] p-2 overflow-y-hidden"
    >
      {text.map((word, index) => {
        return (
          <>
            <Word word={word} isWhiteSpace={false} />
            <Word word="&nbsp;" isWhiteSpace={true} />
          </>
        );
      })}
    </div>
  );
};

export default TextDisplay;
