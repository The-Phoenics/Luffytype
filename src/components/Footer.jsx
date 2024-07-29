const Footer = ({ isTyping }) => {

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
};

export default Footer;
