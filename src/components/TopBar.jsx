import { IoMdVolumeHigh } from "react-icons/io";
import { IoMdVolumeOff } from "react-icons/io";
import { useState } from "react";

const TopBar = ({ isAudioOff, setIsAudioOff }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currLang, setCurrLang] = useState("English");

  useState(() => {}, [currLang, isOpen])

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
            setIsAudioOff((prev) => !prev);
          }}
        >
          {isAudioOff ? <IoMdVolumeOff /> : <IoMdVolumeHigh />}
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
