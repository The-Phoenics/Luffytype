import "./App.css";
import { useEffect, useRef, useState } from "react";
import TopBar from "./components/TopBar";
import TextDisplay from "./components/TextDisplay";
import Footer from "./components/Footer";

function App() {
  const [isAudioOn, setIsAudioOn] = useState(true);
  const isAudioOnRef = useRef(isAudioOn);
  const [isTyping, setIsTyping] = useState(false);
  const setIsTypingRef = useRef(setIsTyping);

  useEffect(() => {
    isAudioOnRef.current = isAudioOn;
  }, [isAudioOn]);

  return (
    <>
      <div className="w-full min-h-screen overflow-x-hidden bg-background text-white flex items-center justify-center flex-col relative text-center">
        <div className="absolute top-[1vh] left-0 w-full min-h-[50px] flex items-center justify-center bg-red">
          <TopBar isTyping={isTyping} isAudioOn={isAudioOn} setIsAudioOn={setIsAudioOn} />
        </div>
        <main className="w-full flex justify-center  h-full">
          <TextDisplay isAudioOnRef={isAudioOnRef} setIsTypingRef={setIsTypingRef} />
        </main>
        <div className="absolute bottom-[1vh] left-0 w-full min-h-[50px] flex items-center justify-center bg-red font-bold">
          <Footer isTyping={isTyping} />
        </div>
      </div>
    </>
  );
}

export default App;
