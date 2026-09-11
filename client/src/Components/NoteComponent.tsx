import editIcon from "../assets/edit.svg";
import trashIcon from "../assets/trashSVG.svg";

function NoteComponent() {
  return (
    <div
      className="bg-[#201d22] border-2 border-[#39313e]
            flex flex-col justify-between p-5 rounded-md"
    >
      <div>top</div>
      <div
        className="border-t-2 border-[#39313e] flex 
              items-center justify-end h-3"
      >
        <img className="h-5 mt-4 mr-1 cursor-pointer" src={editIcon} />
        <img className="h-5 mt-4 cursor-pointer" src={trashIcon} />
      </div>
    </div>
  );
}

export default NoteComponent;
