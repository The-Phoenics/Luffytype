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
  return <div className={` text-[2.5vw] font-medium min-w-[12px] font-NerdFont relative ${isWhiteSpace ? "whitespace-element" : "letter-pending mr-[1px]"}`}>{letter}
    {/* rhis is for cursor */}
    <span></span>
  </div>;
}

const TextDisplay = ({ wordsElementRef }) => {
  const text =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

  return (
    <div
      ref={wordsElementRef}
      className="w-[80%] min-w-[370px] max-w-[70vw]  flex justify-center items-center gap-1 flex-wrap max-h-[30vh] p-2 overflow-y-scroll"
    >
      {text.split(" ").map((word, index) => {
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
