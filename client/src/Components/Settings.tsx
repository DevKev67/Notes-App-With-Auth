import { useNavigate } from "react-router-dom";
import arrow from "../assets/left-arrow.svg";

function Settings() {
  const navigate = useNavigate();

  return (
    <div className="relative h-dvh overflow-hidden">
      <div className="flex items-center justify-start h-7 m-2">
        <img
          className="h-full cursor-pointer"
          src={arrow}
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className="flex items-start justify-center h-dvh">rest of page</div>
    </div>
  );
}

export default Settings;
