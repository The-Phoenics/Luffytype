import "./App.css";
import { useEffect, useRef, useState } from "react";
import TopBar from "./components/TopBar";
import TextDisplay from "./components/TextDisplay";
import { GHandleLetterKeyPress, GHandleBackSpaceKeyPress } from "./KeyPressHandlers";
import { GAddCursor } from "./TextUtils";
import { GResetData, GToggleCtrlHeldDown } from "./Data";
import Footer from "./components/Footer";

function App() {
  const wordsElementRef = useRef();
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const keyPressEL = document.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        GResetData();
        setReset(prevResetVal => !prevResetVal);
      } else {
        GHandleLetterKeyPress(e.key, wordsElementRef);
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

    // initailize cursor at first letter
    GAddCursor(wordsElementRef.current.childNodes[0].childNodes[0].childNodes[0]);

    return () => {
      document.removeEventListener("keypress", keyPressEL);
      document.removeEventListener("keyup", ctrlKeyUpEL);
      document.removeEventListener("keydown", keyDownEL);
    };
  }, []);

  return (
    <>
      <div className="w-full min-h-screen overflow-x-hidden bg-background text-white flex items-center justify-center flex-col relative text-center">
        <div className="absolute top-[1vh] left-0 w-full min-h-[50px] flex items-center justify-center bg-red">
          <TopBar />
        </div>
        <main className="w-full flex justify-center  h-full">
          <TextDisplay wordsElementRef={wordsElementRef} reset={reset} />
        </main>
        <div className="absolute bottom-[1vh] left-0 w-full min-h-[50px] flex items-center justify-center bg-red font-bold">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
