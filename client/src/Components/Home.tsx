import { useNavigate } from "react-router-dom";
import search from "../assets/searchIcon.svg";
import gearIcon from "../assets/gear-solid-full.svg";
import circleSign from "../assets/circleSign.svg";
import { useEffect, useState } from "react";
import NoteComponent from "./NoteComponent";

type noteResponseType = {
  success: boolean;
  userNotes: Array<{ noteId: number; title: string; context: string }>;
};

type BackEndResponseGoodType = {
  data: {
    expiration: number;
    created_at: string;
    name: string;
  };
  message: string;
  success: true;
};

type ChildProps = {
  loginResponse: BackEndResponseGoodType | null;
};

async function fetchUserNotes(): Promise<noteResponseType> {
  const response = await fetch("http://localhost:8080/api/notes", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Fetching notes failed: ${response.status}`);
  }

  return response.json();
}

function Home({ loginResponse }: ChildProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeletingNote, setIsDeletingNote] = useState<boolean>(false);
  const [notesRefresh, setNotesRefresh] = useState<number>(0);
  const [userNotes, setUserNotes] = useState<noteResponseType | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [identifier, setIdentifier] = useState<string>("");

  const userNoteArray = userNotes?.userNotes;

  const potentialUserName =
    loginResponse?.data.name ?? localStorage.getItem("userName");

  async function searchByFilter() {
    try {
      setIsLoading(true);

      const response = await fetch(
        `http://localhost:8080/api/notes/search?identifier=${encodeURIComponent(identifier)}`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();
      setUserNotes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function clearSearch() {
    setIdentifier("");
    try {
      setIsLoading(true);
      const data = await fetchUserNotes();
      setUserNotes(data);
    } catch (err) {
      console.error("Error: " + err);
    } finally {
      setIsLoading(false);
    }
  }

  function correctUserName() {
    if (!potentialUserName) {
      return "User";
    }

    const cleanName = potentialUserName?.trim().toLocaleLowerCase();
    const firstLetter = cleanName?.charAt(0).toLocaleUpperCase();

    return firstLetter + cleanName.slice(1);
  }

  async function deleteUserNoteRequest(id: number): Promise<void> {
    try {
      setIsDeletingNote(true);

      const response = await fetch("http://localhost:8080/api/notes/delete", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ noteId: id }),
      });

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.status}`);
      }

      setNotesRefresh((current) => current + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeletingNote(false);
    }
  }

  useEffect(() => {
    let isCurrent = true;

    void fetchUserNotes()
      .then((data) => {
        if (isCurrent) {
          setUserNotes(data);
        }
      })
      .catch((err) => {
        console.error("Error: " + err);
      })
      .finally(() => {
        if (isCurrent) {
          setIsLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [notesRefresh]);

  return (
    <div>
      <div
        className="hidden md:flex [@media(max-height:450px)]:hidden flex-col items-center fixed bg-[#1D1A20]
        border-r-[#39313e] border-r-2 left-0 bottom-0 top-0 w-50"
      >
        <div className="mt-2.5 pb-2.5 w-full flex items-center justify-between border-b-2 border-b-[#39313e]">
          <div className="w-full relative">
            {isHovered && (
              <div
                className="absolute -bottom-1 right-0 left-0 w-1/2 m-auto h-full flex items-center justify-center
              border p-4 border-gray-500 rounded-md"
              >
                <p>Shortcuts</p>
              </div>
            )}

            <img
              className="h-7 ml-2 cursor-pointer"
              onMouseEnter={() => {
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
              }}
              onClick={() => {
                navigate("/shortcuts");
              }}
              src={circleSign}
            />
          </div>
          <div></div>
        </div>
        <div className="h-full flex flex-col items-center justify-between">
          <div className="w-45 mt-5">
            <div className="relative">
              <input
                className="placeholder:text-white border-2 border-[#39313e] rounded-2xl
                  p-1 pl-3 pr-10 text-sm w-full focus:outline-none"
                placeholder="Search"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                }}
              />
              <button
                type="button"
                aria-label="Search notes"
                className="absolute right-0 top-0 flex items-center justify-center
                bg-[#AA60C8] h-7 w-7 rounded-2xl cursor-pointer"
                onClick={() => void searchByFilter()}
              >
                <img className="h-5" src={search} alt="" />
              </button>
            </div>
            <button
              type="button"
              className="mt-2 w-full rounded-xl border border-[#39313e] py-1 text-xs text-zinc-300
              cursor-pointer transition-colors hover:bg-[#39313e]"
              onClick={() => void clearSearch()}
            >
              Clear
            </button>
          </div>
          <div
            onClick={() => {
              navigate("/settings");
            }}
            className="mb-10 cursor-pointer relative"
          >
            <img className="h-6" src={gearIcon} />
          </div>
        </div>
      </div>
      <div className="ml-0 md:ml-45 [@media(max-height:450px)]:ml-0 pl-5 pt-3 pb-2 border-b-2 border-b-[#39313e]">
        <div className="flex items-center justify-between ">
          <div className="flex items-center justify-start w-full">
            <div>
              <p className="ml-5 text-xl font-['Inter']">
                Hello, {correctUserName()}
              </p>
            </div>
          </div>
          <div className="w-full flex items-center justify-end ">
            <button
              className="bg-[#a963c4] p-1 pl-2 pr-2 rounded-xl text-sm mr-5 cursor-pointer active:scale-90
              transition-all duration-200"
              onClick={() => {
                navigate("/create/new");
              }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
      <div className="ml-0 md:ml-48 [@media(max-height:450px)]:ml-0 px-5 pb-8">
        <p className="mt-4 text-2xl font-['Newsreader']">Notes</p>
        {isLoading && <p>Loading...</p>}
        <div className="mt-5 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {userNoteArray?.map((e) => {
            return (
              <NoteComponent
                isLoading={isDeletingNote}
                deleteFunction={deleteUserNoteRequest}
                key={e.noteId}
                context={e.context}
                title={e.title}
                noteid={e.noteId}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
