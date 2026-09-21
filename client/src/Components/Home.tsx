import { useNavigate } from "react-router-dom";
import arrow from "../assets/left-arrow.svg";
import search from "../assets/searchIcon.svg";
import gearIcon from "../assets/gear-solid-full.svg";
import { useEffect, useState } from "react";
import NoteComponent from "./NoteComponent";

type noteResponseType = {
  success: boolean;
  userNotes: [{ noteId: number; title: string; context: string }];
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
  deleteFunction: (id: number) => Promise<void>;
  isLoadingForNote: boolean;
};

function Home({ loginResponse, deleteFunction, isLoadingForNote }: ChildProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userNotes, setUserNotes] = useState<noteResponseType | null>(null);

  const userNoteArray = userNotes?.userNotes;

  console.log(userNoteArray);

  const potentialUserName =
    loginResponse?.data.name ?? localStorage.getItem("userName");

  function correctUserName() {
    if (!potentialUserName) {
      return "User";
    }

    const cleanName = potentialUserName?.trim().toLocaleLowerCase();
    const firstLetter = cleanName?.charAt(0).toLocaleUpperCase();

    return firstLetter + cleanName.slice(1);
  }

  useEffect(() => {
    async function getUserNotes() {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/notes", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        setUserNotes(data);
      } catch (err) {
        console.error("Error: " + err);
      } finally {
        setIsLoading(false);
      }
    }

    getUserNotes();
  }, [deleteFunction]);

  async function signOut() {
    try {
      const response = await fetch("http://localhost:8080/api/auth/signout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      localStorage.removeItem("expiresAt");
      localStorage.removeItem("userName");
      localStorage.removeItem("createdAt");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Error: " + err);
    }
  }

  return (
    <div>
      <div
        className="flex flex-col items-center fixed bg-[#1D1A20]
        border-r-[#39313e] border-r-2 left-0 bottom-0 top-0 w-50"
      >
        <div className="mt-2.5 pb-2.5 w-full flex items-center justify-between border-b-2 border-b-[#39313e]">
          <div>
            <img
              className="h-7 mr-5 cursor-pointer"
              onClick={signOut}
              src={arrow}
            />
          </div>
          <div></div>
        </div>
        <div className="h-full flex flex-col items-center justify-between">
          <div className="relative w-45 mt-5">
            <input
              className="placeholder:text-white border-2 border-[#39313e] rounded-2xl
                p-1 pl-3 pr-10 text-sm w-full focus:outline-none"
              placeholder="Search"
            />
            <div
              className="absolute right-0 top-0  flex items-center justify-center
              bg-[#AA60C8] h-7 w-7 rounded-2xl cursor-pointer"
            >
              <img className="h-5" src={search} />
            </div>
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
      <div className="ml-45 pl-5 pt-3 pb-2 border-b-2 border-b-[#39313e]">
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
                navigate("/create");
              }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
      <div className="ml-48 px-5 pb-8">
        <p className="mt-4 text-2xl font-['Newsreader']">Notes</p>
        {isLoading && <p>Loading...</p>}
        <div className="mt-5 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {userNoteArray?.map((e) => {
            return (
              <NoteComponent
                isLoading={isLoadingForNote}
                deleteFunction={deleteFunction}
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
