import arrow from "../assets/left-arrow.svg";
import createArrow from "../assets/create-arrow.svg";
import logo from "../assets/random logo.png";
import gearIcon from "../assets/gear-solid-full.svg";
import { useState, type PointerEvent } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  const [title, setTitle] = useState<string>();
  const [context, setContext] = useState<string>("");
  const [position, setPosition] = useState({ x: 400, y: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [relOffset, setRelOffset] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();

  const noteInfo = {
    title,
    context,
  };

  console.log(noteInfo);

  const wordCount =
    context.trim() === "" ? 0 : context.trim().split(/\s+/).length;

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);

    setRelOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });

    const target = e?.target as Element;

    if (target) {
      target.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    setPosition({
      x: e.clientX - relOffset.x,
      y: e.clientY - relOffset.y,
    });
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);

    const target = e.target as Element;

    if (target) {
      target.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-start ml-45 h-10">
        <img className="h-40 mt-10 ml-5" src={logo} />
      </div>
      <div className="flex h-screen flex-col items-center justify-center">
        <div
          className="flex flex-col items-center fixed bg-[#201d22]
        border-r-[#39313e] border-r-2 left-0 bottom-0 top-0 w-45"
        >
          <div className="mt-2.5 pb-2.5 w-full flex items-center justify-between border-b-2 border-b-[#39313e]">
            <div
              onClick={() => {
                navigate("/");
              }}
            >
              <img className="h-7 mr-5 cursor-pointer" src={arrow} />
            </div>
            <div></div>
          </div>
          <div className="h-full flex flex-col items-center justify-between">
            <div></div>
            <div className="mb-10">
              <img className="h-6" src={gearIcon} />
            </div>
          </div>
        </div>

        <div
          onPointerUp={handlePointerUp}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          style={{
            position: "absolute",
            left: `${position.x}px`,
            top: `${position.y}px`,
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none",
            touchAction: "none",
          }}
          className="p-5 flex flex-col h-1/2 w-1/2 bg-[#201d22] rounded-xl border-2 border-[#39313e]"
        >
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center h-4">
              <img className="h-full mr-1" src={createArrow} />
              <p className="text-zinc-400 text-xs">All Notes</p>
            </div>
            <p className="text-zinc-400 text-xs">Unsaved Changes</p>
          </div>
          <div className="w-full">
            <div className="pb-6 border-b border-b-[#39313e]">
              <input
                className="mt-4 w-full text-4xl placeholder:text-white placeholder:font-['Newsreader']
                focus:outline-none"
                placeholder="Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <p className="text-xs mt-4 text-zinc-400">August 29 • 11:58 AM</p>
            </div>
          </div>
          <div className="h-full w-full mt-1 border-b border-b-[#39313e]">
            <div className="h-full pb-3">
              <textarea
                placeholder="Write something meaningful..."
                className="h-full w-full text-lg font-sans text-zinc-300
              p-2 focus:outline-none resize-none"
                onChange={(e) => {
                  setContext(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="w-full pt-5">
            <div className="h-full flex items-center justify-between">
              <div></div>
              <div className="text-xs text-zinc-400">{wordCount} words</div>
              <div>
                <button
                  className="bg-[#a963c4] p-2 pl-4 pr-4 rounded-lg text-xs cursor-pointer active:scale-90
              transition-all duration-200 shadow-[1px_1px_10px] shadow-[#a963c4]"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
