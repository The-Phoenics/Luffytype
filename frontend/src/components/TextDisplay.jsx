function Word({ word, isWhiteSpace }) {
  return (
    <div className="flex">
      {word.split("").map((letter, index) => {
        return <Letter key={index} letter={letter} isWhiteSpace={isWhiteSpace}  />;
      })}
    </div>
  );
}

function Letter({ letter, isWhiteSpace }) {
  return <div className={`text-white text-xl min-w-[10px] ${isWhiteSpace ? "whitespace-element" : "letter-pending"}`}>{letter}</div>;
}

const TextDisplay = ({ wordsElementRef }) => {
  const text =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

  return (
    <div
      ref={wordsElementRef}
      className="w-[80%] min-w-[370px] bg-slate-500 flex gap-4 flex-wrap"
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
