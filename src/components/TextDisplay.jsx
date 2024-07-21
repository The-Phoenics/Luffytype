import { useEffect, useState } from "react";
import { GResetData } from "../Data";
import { FocusScrollCurrentWord } from "../KeyPressHandlers";
import { GStyleLetterAsPending, GStyleSpaceLetterPending } from "../TextUtils";

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
    console.log('fetch called')
    const response = await fetch(`https://random-word-api.herokuapp.com/word?number=200`);
    if (response.ok) {
      const result = await response.json();
      setText(result);
      setFetching(false);
    } else {
      console.log("Fetch failed setting dummy text!");
      setText(
        `Quisque eu mollis arcu. Vivamus viverra est velit, non mattis dui finibus ac. Suspendisse risus nisl, pharetra eu justo et, convallis maximus turpis. Aliquam turpis nunc, fermentum ut tincidunt in, sagittis nec enim. Aliquam egestas sollicitudin tellus non malesuada. In placerat eu nibh a lobortis. Sed in erat laoreet, sodales lorem sit amet, finibus quam. Nam lorem velit, viverra ut nisi in, egestas semper metus. Fusce id eleifend orci. Nulla orci arcu, aliquam a neque sit amet, malesuada commodo odio.`
      );
    }
  };

  useEffect(() => {
    fetchTypingText();
    GResetData();
  }, [])

  useEffect(() => {
    if (!fetching) {
      setFetching(true)
      fetchTypingText();
      GResetData();
      FocusScrollCurrentWord(wordsElementRef.current.childNodes[0]);

      // TODO: change styling of letters to pending
      // wordsElementRef.current.childNodes.forEach((words => {
      //   words.childNodes.forEach(letter => {
      //     GStyleLetterAsPending(letter)
      //     console.log(letter)
      //   })
      //   GStyleSpaceLetterPending(word[1])
      // }))
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
            <Word word="&nbsp;" isWhiteSpace={true} />
          </span>
        );
      })}
    </div>
  );
};

export default TextDisplay;
