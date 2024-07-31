import { IoLogoGithub } from "react-icons/io5";

const Footer = ({ isTyping }) => {
  if (isTyping) {
    return (
      <div className="flex items-center justify-center gap-3 font-medium mb-2">
        <div className="p-1 pl-3 pr-3 border flex items-center justify-center rounded-sm border-textpending text-textpending font-NerdFont">
          enter
        </div>
        <div className="flex items-center justify-center rounded-sm text-textpending font-NerdFont">
          to
        </div>
        <div className="flex items-center justify-center rounded-sm text-textpending font-NerdFont">
          reset
        </div>
        <div className="flex items-center justify-center rounded-sm text-textpending font-NerdFont">
          /
        </div>
        <div className="flex items-center justify-center rounded-sm text-textpending font-NerdFont">
          change
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center gap-2 font-medium m-2 scale-125 hover:cursor-pointer"
      onClick={() => window.open("https://github.com/The-Phoenics/Luffytype", "_blank")}
    >
      <div className="flex items-center justify-center rounded-sm text-textpending font-NerdFont">
        luffytype
      </div>
      <div className="flex items-center justify-center rounded-sm text-textpending font-NerdFont">
        <IoLogoGithub className="ml-1" />
      </div>
    </div>
  );
};

export default Footer;
