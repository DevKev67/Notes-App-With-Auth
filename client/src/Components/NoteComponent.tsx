import editIcon from "../assets/edit.svg";
import trashIcon from "../assets/trashSVG.svg";

type NoteComponentProps = {
  noteid: number;
  title: string;
  context: string;
  isLoading: boolean;
  deleteFunction: (id: number) => Promise<void>;
};

function NoteComponent({
  context,
  title,
  noteid,
  deleteFunction,
  isLoading,
}: NoteComponentProps) {
  return (
    <div
      className="
        flex h-64 w-full min-w-0 flex-col
        rounded-md border-2 border-[#39313e]
        bg-[#201d22] p-5
      "
    >
      <div className="min-h-0 flex-1 overflow-hidden">
        <h2 className="line-clamp-1 font-semibold">{title}</h2>

        <p className="mt-2 line-clamp-6 break-words text-sm text-gray-300">
          {context}
        </p>
      </div>

      <div className="mt-4 flex shrink-0 items-center justify-between border-t-2 border-[#39313e] pt-3">
        <p className="text-sm text-gray-400">{noteid}</p>

        {isLoading ? (
          <p className="text-sm">Processing...</p>
        ) : (
          <div className="flex items-center gap-2">
            <img
              className="h-5 cursor-pointer"
              src={editIcon}
              alt="Edit note"
            />

            <button
              type="button"
              aria-label="Delete note"
              onClick={() => void deleteFunction(noteid)}
            >
              <img className="h-5 cursor-pointer" src={trashIcon} alt="" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteComponent;
