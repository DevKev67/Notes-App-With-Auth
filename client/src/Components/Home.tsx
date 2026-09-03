import { useNavigate } from "react-router-dom";
import arrow from "../assets/left-arrow.svg";
import search from "../assets/searchIcon.svg";
import gearIcon from "../assets/gear-solid-full.svg";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();

  const [settingsPopUp, setSettingsPopUp] = useState<boolean>(false);

  return (
    <div>
      <div
        className="flex flex-col items-center fixed bg-[#201d22]
        border-r-[#39313e] border-r-2 left-0 bottom-0 top-0 w-50"
      >
        <div className="mt-2.5 pb-2.5 w-full flex items-center justify-between border-b-2 border-b-[#39313e]">
          <div>
            <img className="h-7 mr-5 cursor-pointer" src={arrow} />
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
              setSettingsPopUp(settingsPopUp ? false : true);
            }}
            className="mb-10 cursor-pointer relative bg-blue-500"
          >
            <img className="h-6" src={gearIcon} />
            <div className="absolute top-0 right-0 h-20 w-10 bg-red-500">
              <p>test</p>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-45 pl-5 pt-3 pb-2 border-b-2 border-b-[#39313e]">
        <div className="flex items-center justify-between ">
          <div className="flex items-center justify-start w-full">
            <div>
              <p className="ml-5 text-xl font-['Inter']">Hello, Kevin</p>
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
      <div className="ml-50 pl-5">
        <p className="mt-4 text-2xl font-['Newsreader']">Notes</p>
        <div className="w-full h-175 mt-5"></div>
      </div>
    </div>
  );
}

export default Home;
