import { useNavigate } from "react-router-dom";
import arrow from "../assets/left-arrow.svg";
import signOutLogo from "../assets/signout.svg";

function Settings() {
  const navigate = useNavigate();

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
      <div className="flex h-dvh items-start justify-center px-4">
        <div className="flex w-full max-w-4xl flex-col items-start justify-between gap-4 rounded-md border border-gray-500 p-4 sm:w-4/5 sm:flex-row sm:items-center sm:gap-8 lg:w-1/2">
          <div className="min-w-0 flex-1">
            <p>Sign Out</p>
            <p className="text-sm text-[#9298a0]">
              Are you sure you want to sign out? You’ll need your username and
              password to sign back in.
            </p>
          </div>

          <div className="flex shrink-0 items-center self-end sm:self-auto">
            <button
              type="button"
              onClick={signOut}
              className="flex h-10 shrink-0 items-center gap-2 rounded-md px-3
              text-sm cursor-pointer hover:bg-zinc-700"
            >
              <img
                src={signOutLogo}
                alt=""
                aria-hidden="true"
                className="h-5 w-5 object-contain"
              />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

export default Settings;
