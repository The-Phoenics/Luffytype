import { IoMdVolumeHigh } from "react-icons/io";
import { IoMdVolumeOff } from "react-icons/io";
import { useState } from "react";

const TopBar = ({ isAudioOn, setIsAudioOn, isTyping }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currLang, setCurrLang] = useState("English");

  useState(() => {}, [currLang, isOpen]);

  if (isTyping) {
    return (
      <div className="flex justify-between max-w-[1000px] flex-1 mt-2 ml-14 mr-14 min-w-[300px] font-medium text-[1.8em] items-center text-[#ffd56b]">
        <div className="flex gap-1">
          <h1>
            83
          </h1>
          <h1 className="scale-[0.9]">wpm</h1>
        </div>
        <div className="flex gap-1">
          <h1>
            47
          </h1>
          <h1 className="scale-[0.9]">%</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 pl-6 pr-6">
      <div className="flex items-center justify-center gap-4 rounded-3xl bg-[#ffd56b] p-2 pl-6 pr-6 font-mono mt-2 text-md ">
        <div
          className="text-[#001d29] flex items-center justify-center gap-1 hover:cursor-pointer relative"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="min-w-28">{currLang}</span>
          <span className="flex items-center justify-center">{""}</span>{" "}
          {isOpen ? (
            <LangDropDown currLang={currLang} setCurrLang={setCurrLang} setIsOpen={setIsOpen} />
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
