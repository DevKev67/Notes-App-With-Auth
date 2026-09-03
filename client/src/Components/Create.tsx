import arrow from "../assets/left-arrow.svg";
import createArrow from "../assets/create-arrow.svg";
import logo from "../assets/random logo.png";
import gearIcon from "../assets/gear-solid-full.svg";
import { useRef, useState, type PointerEvent } from "react";
import { useNavigate } from "react-router-dom";

type noteResponseType = {
  success: boolean;
  response: {
    noteId: number;
    title: string;
    content: string;
  };
};

function Create() {
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [createdAt] = useState(() => new Date());
  const [noteResponse, setNoteReponse] = useState<noteResponseType | null>(
    null,
  );

  const navigate = useNavigate();

  const noteInfo = {
    title,
    content,
  };

  console.log(noteResponse);

  async function handleNoteCreation() {
    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:8080/api/notes", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteInfo),
      });

      const data = await response.json();
      setNoteReponse(data);
    } catch (err) {
      console.error("Error: " + err);
    } finally {
      setIsLoading(false);
    }
  }

  const wordCount =
    content.trim() === "" ? 0 : content.trim().split(/\s+/).length;

  const sidebarRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({
    pointerX: 0,
    pointerY: 0,
    positionX: 0,
    positionY: 0,
  });

  const formattedDate = createdAt.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const formattedTime = createdAt.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;

    dragStartRef.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      positionX: position.x,
      positionY: position.y,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const cardRect = cardRef.current?.getBoundingClientRect();

    if (!cardRect) return;

    const sidebarRight = sidebarRef.current?.getBoundingClientRect().right ?? 0;

    const centeredCardLeft = (window.innerWidth - cardRect.width) / 2;

    const minimumX = sidebarRight + 12 - centeredCardLeft;

    const dragStart = dragStartRef.current;

    const nextX = dragStart.positionX + (e.clientX - dragStart.pointerX);

    const nextY = dragStart.positionY + (e.clientY - dragStart.pointerY);

    setPosition({
      x: Math.max(nextX, minimumX),
      y: nextY,
    });
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div className="relative h-dvh overflow-hidden">
      {isLoading && <p>Loading...</p>}
      <div className="flex items-center justify-start h-10 ml-0 md:ml-[clamp(9rem,14dvw,11.25rem)]">
        <img className="h-40 mt-10 ml-5" src={logo} />
      </div>
      <div className="flex h-screen flex-col items-center justify-center">
        <div
          ref={sidebarRef}
          className="hidden md:flex [@media(max-height:450px)]:hidden flex-col items-center fixed
          bg-[#201d22] border-r-[#39313e] border-r-2 left-0 bottom-0 top-0 w-[clamp(9rem,14dvw,11.25rem)]"
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
          ref={cardRef}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(calc(-50% + ${position.x}px),calc(-50% + ${position.y}px))`,
            resize: "both",
            overflow: "auto",
            minWidth: "320px",
            minHeight: "280px",
            maxWidth: "min(900px, 60dvw)",
            maxHeight: "min(650px, calc(100dvh - 2rem))",
          }}
          className="p-5 flex flex-col w-[clamp(20rem,55dvw,40rem)] h-[clamp(18rem,60dvh,28rem)]
          bg-[#201d22] rounded-xl border-2 border-[#39313e]"
        >
          <div
            onDragStart={(e) => e.preventDefault()}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="shrink-0 w-full flex items-center justify-between 
            cursor-grab active:cursor-grabbing select-none touch-none"
          >
            <div className="flex items-center h-4">
              <img
                className="h-full mr-1"
                src={createArrow}
                draggable={false}
              />
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
              <p className="text-xs mt-4 text-zinc-400">
                {formattedDate} • {formattedTime}
              </p>
            </div>
          </div>
          <div className="flex-1 min-h-0 w-full mt-1 border-b border-b-[#39313e]">
            <div className="h-full pb-3">
              <textarea
                placeholder="Write something meaningful..."
                className="h-full w-full text-lg font-sans text-zinc-300
              p-2 focus:outline-none resize-none"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="shrink-0 w-full pt-5">
            <div className="h-full flex items-center justify-between">
              <div></div>
              <div className="text-xs text-zinc-400">{wordCount} words</div>
              <div>
                <button
                  className="bg-[#a963c4] p-2 pl-4 pr-4 rounded-lg text-xs cursor-pointer active:scale-90
              transition-all duration-200 shadow-[1px_1px_10px] shadow-[#a963c4]"
                  onClick={handleNoteCreation}
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
