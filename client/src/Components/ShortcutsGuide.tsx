import { useNavigate } from "react-router-dom";
import arrow from "../assets/left-arrow.svg";

function ShortcutsGuide() {
  const navigate = useNavigate();

  return (
    <div className="relative h-dvh overflow-hidden">
      <div className="flex items-center justify-start h-7 m-2">
        <img
          className="h-full cursor-pointer"
          src={arrow}
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>
      <div className="flex h-dvh items-start justify-center px-4">
        <div className="flex w-full max-w-4xl flex-col gap-4 rounded-md border border-gray-500 p-4 sm:w-4/5 lg:w-1/2">
          <p className="text-lg">Shortcuts</p>
          <div className="flex items-center justify-between gap-4 border-t border-gray-500 pt-4">
            <p className=" text-[#9298a0]">Home</p>
            <p>Ctrl + h</p>
          </div>
          <div className="flex items-center justify-between gap-4 ">
            <p className=" text-[#9298a0]">Create New Note</p>
            <p>Ctrl + n</p>
          </div>
          <div className="flex items-center justify-between gap-4 ">
            <p className=" text-[#9298a0]">Settings</p>
            <p>Ctrl + s</p>
          </div>
          <div className="flex items-center justify-between gap-4 ">
            <p className=" text-[#9298a0]">Shortcuts</p>
            <p>Ctrl + i</p>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

export default ShortcutsGuide;
