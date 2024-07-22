import { IoMdVolumeHigh } from "react-icons/io";
import { IoMdVolumeOff } from "react-icons/io";

const TopBar = ({ isAudioOff, setIsAudioOff }) => {
  return (
    <div className="flex items-center justify-center rounded-3xl bg-[#ffd56b] p-2 pl-6 pr-6 gap-4 font-mono mt-2 text-md">
      <div className="text-[#001d29] flex items-center">Commonly Mispelled</div>
      <div
        className="text-[#001d29] hover:cursor-pointer"
        onClick={() => {
          setIsAudioOff((prev) => !prev);
        }}
      >
        {isAudioOff ? <IoMdVolumeOff /> : <IoMdVolumeHigh />}
      </div>
    </div>
  );
};

export default TopBar;
