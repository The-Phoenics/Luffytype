import { IoMdVolumeHigh } from "react-icons/io";
import { IoMdVolumeOff } from "react-icons/io";
import { useCallback, useEffect, useRef, useState } from "react";

const TopBar = ({ isAudioOn, setIsAudioOn, isTyping, reset, statsData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currLang, setCurrLang] = useState("Commonly Misspelled");
  const [speed, setSpeed] = useState(83);
  const [accuracy, setAccuracy] = useState(47);
  const evalTimerRef = useRef(null);
  const startTimeRef = useRef();

  const calculateSpeed = useCallback(() => {
    const elapsedTimeInSeconds = Math.round(((new Date()) - startTimeRef.current) / 1000);
    const calcSpeed = statsData.wordsFinished / (elapsedTimeInSeconds / 60)
    return Math.floor(calcSpeed)
  }, [statsData])

  const calculateAccuracy = useCallback(() => {
    const totalLettersTyped = statsData.correctLettersCount + statsData.incorrectLettersCount;
    if (totalLettersTyped === 0) {
      return 100;
    }
    const accuracyPercentage = (statsData.correctLettersCount / totalLettersTyped) * 100;
    return Math.round(accuracyPercentage);
  }, [statsData]);

  useEffect(() => {
    if (isTyping) {
      startTimeRef.current = new Date()
      evalTimerRef.current = setInterval(() => {
        setSpeed(calculateSpeed());
        setAccuracy(calculateAccuracy());
      }, 1000);
    } else {
      clearInterval(evalTimerRef.current);
    }
  }, [isTyping])

  // re-start the timer with the new definition of calculateSpeed
  // function, everytime statsData changes
  useEffect(() => {
    clearInterval(evalTimerRef.current);
    if (isTyping) {
      evalTimerRef.current = setInterval(() => {
        setSpeed(calculateSpeed());
        setAccuracy(calculateAccuracy());
      }, 1000);
    }
  }, [statsData])

  useEffect(() => { }, [currLang, isOpen]);

  useEffect(() => {
    setSpeed(0);
    setAccuracy(0);
  }, [reset])

  if (isTyping) {
    return (
      <div className="flex justify-between max-w-[700px] flex-1 mt-2 ml-14 mr-14 min-w-[300px] font-NerdFont font-medium text-[1.4em] md:text-[1.8em] items-center text-[#ffd56b]">
        <div className="flex gap-2 items-center">
          <h1 className="text-3xl md:text-5xl">{speed}</h1>
          <h1>wpm</h1>
        </div>
        <div className="flex gap-2 items-center">
          <h1 className="text-3xl md:text-5xl">{accuracy}</h1>
          <h1>%</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 pl-6 pr-6 md:scale-125">
      <div className="flex items-center justify-center gap-4 rounded-3xl bg-[#ffd56b] p-2 pl-6 pr-6 font-mono mt-2 text-md ">
        <div
          className="text-[#001d29] flex items-center justify-center gap-1 hover:cursor-pointer relative"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="min-w-28">{currLang}</span>
          <span className="flex items-center justify-center">{""}</span>{" "}
          {isOpen ? (
            // <LangDropDown currLang={currLang} setCurrLang={setCurrLang} setIsOpen={setIsOpen} />
            ""
          ) : (
            ""
          )}
        </div>

        <div
          className="text-[#001d29] hover:cursor-pointer"
          onClick={() => {
            setIsAudioOn((prev) => !prev);
          }}
        >
          {isAudioOn ? <IoMdVolumeHigh /> : <IoMdVolumeOff />}
        </div>
      </div>
    </div>
  );
};

const LangDropDown = ({ currLang, setCurrLang, setIsOpen }) => {
  return (
    <div className="absolute text-white top-10 flex flex-col gap-2 min-w-28">
      {currLang == "English" ? (
        ""
      ) : (
        <div
          className="bg-[#ffd56b] rounded-3xl w-full text-[#001d29]  p-2 pl-4 pr-4"
          onClick={() => {
            setCurrLang("English");
            setIsOpen(false);
          }}
        >
          English
        </div>
      )}
      {currLang == "C++" ? (
        ""
      ) : (
        <div
          className="bg-[#ffd56b] rounded-3xl w-full text-[#001d29]  p-2 pl-4 pr-4"
          onClick={() => {
            setCurrLang("C++");
            setIsOpen(false);
          }}
        >
          C++
        </div>
      )}
      {currLang == "Java" ? (
        ""
      ) : (
        <div
          className="bg-[#ffd56b] rounded-3xl w-full text-[#001d29]  p-2 pl-4 pr-4"
          onClick={() => {
            setCurrLang("Java");
            setIsOpen(false);
          }}
        >
          Java
        </div>
      )}
    </div>
  );
};

export default TopBar;
