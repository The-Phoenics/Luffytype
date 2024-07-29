import "./App.css";
import { useEffect, useRef, useState } from "react";
import TopBar from "./components/TopBar";
import TextDisplay from "./components/TextDisplay";
import Footer from "./components/Footer";

function App() {
  // const wordsElementRef = useRef();
  // const [reset, setReset] = useState(false);
  const [isAudioOff, setIsAudioOff] = useState(false);
  const isAudioOffRef = useRef(isAudioOff);

  useEffect(() => {
    isAudioOffRef.current = isAudioOff;
  }, [isAudioOff]);

  // useEffect(() => {
  //   const keyPressEL = document.addEventListener("keypress", (e) => {
  //     if (e.key === "Enter") {
  //       // GResetData();
  //       setReset((prevResetVal) => !prevResetVal);
  //     } else {
  //       GHandleLetterKeyPress(e.key, wordsElementRef);
  //       if (!isAudioOffRef.current) {
  //         GPlayKeyPressAudio(e.key);
  //       }
  //     }
  //   });

  //   const ctrlKeyUpEL = document.addEventListener("keyup", (e) => {
  //     if (e.key === "Control") {
  //       GToggleCtrlHeldDown();
  //     }
  //   });

  //   const keyDownEL = document.addEventListener("keydown", (e) => {
  //     if (e.key === "Backspace") {
  //       GHandleBackSpaceKeyPress(wordsElementRef);
  //     }
  //     if (e.key === "Control") {
  //       GToggleCtrlHeldDown();
  //     }
  //   });

  //   // load key press audios
  //   GLoadKeyPressAudios();

  //   // initailize cursor at first letter
  //   GAddCursor(wordsElementRef.current.childNodes[0].childNodes[0].childNodes[0]);

  //   return () => {
  //     document.removeEventListener("keypress", keyPressEL);
  //     document.removeEventListener("keyup", ctrlKeyUpEL);
  //     document.removeEventListener("keydown", keyDownEL);
  //   };
  // }, []);

  return (
    <>
      <div className="w-full min-h-screen overflow-x-hidden bg-background text-white flex items-center justify-center flex-col relative text-center">
        <div className="absolute top-[1vh] left-0 w-full min-h-[50px] flex items-center justify-center bg-red">
          <TopBar isAudioOff={isAudioOff} setIsAudioOff={setIsAudioOff} />
        </div>
        <main className="w-full flex justify-center  h-full">
          <TextDisplay isAudioOffRef={isAudioOff} />
        </main>
        <div className="absolute bottom-[1vh] left-0 w-full min-h-[50px] flex items-center justify-center bg-red font-bold">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
