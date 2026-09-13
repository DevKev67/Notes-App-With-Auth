import editIcon from "../assets/edit.svg";
import trashIcon from "../assets/trashSVG.svg";

type childProps = {
  context: string;
  title: string;
  noteid: number;
};

function NoteComponent({ context, title, noteid }: childProps) {
  return (
    <div
      className="bg-[#201d22] border-2 border-[#39313e]
            flex flex-col justify-between p-5 rounded-md"
    >
      <div>
        <div>{title}</div>
        <div>{context}</div>
      </div>
      <div
        className="border-t-2 border-[#39313e] flex 
               items-center justify-between h-5"
      >
        <div className="flex w-full mt-3 ">
          <p>{noteid}</p>
        </div>
        <div className="flex items-cener justify-end w-full h-full mt-3">
          <img className="h-full mr-1 cursor-pointer" src={editIcon} />
          <img className="h-full cursor-pointer" src={trashIcon} />
        </div>
      </div>
    </div>
  );
}

export default NoteComponent;
