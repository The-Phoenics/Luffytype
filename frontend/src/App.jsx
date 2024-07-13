import "./App.css";
import {  useEffect, useRef } from "react";
import TopBar from "./components/TopBar";
import TextDisplay from "./components/TextDisplay";
import { handleKeyPress, handleBackSpace } from "./KeyPressHandlers";
import { addCursor } from "./TextUtils";

export let data = {
  currentWord: 0,
  currentLetter: 0,
  letterCountInCurrentWord: 0,
};

function App() {
  const wordsElementRef = useRef();

  useEffect(() => {
    const keyPressEL = document.addEventListener("keypress", (e) => {
      handleKeyPress(e.key, wordsElementRef);
    });

    const keyDownEL = document.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        handleBackSpace(wordsElementRef);
      }
    });

    // initailize cursor at first letter
    addCursor(wordsElementRef.current.childNodes[0].childNodes[0])

    return () => {
      document.removeEventListener("keypress", keyPressEL);
      document.removeEventListener("keydown", keyDownEL);
    };
  }, []);

  return (
    <>
      <div className="w-full min-h-screen overflow-x-hidden bg-background text-white flex items-center justify-center flex-col relative text-center">
        <div className="absolute top-[1vh] left-0 w-full border min-h-[50px] flex items-center justify-center bg-red">
          <TopBar />
        </div>
        <main className="w-full flex justify-center  h-full">
          <TextDisplay wordsElementRef={wordsElementRef} />
        </main>
        <div className="absolute bottom-[1vh] left-0 w-full border min-h-[50px] flex items-center justify-center bg-red">
          Socials
        </div>
      </div>
    </>
  );
}

export default App;
