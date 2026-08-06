import { Navigate, useNavigate } from "react-router-dom";
import img from "../assets/random logo.png";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

type BackEndResponseBadType = {
  message: {
    email?: string[];
    password?: string[];
  };
  success: false;
};

type BackEndResponseGoodType = {
  data: {
    expiration: number;
    created_at: string;
  };
  message: string;
  success: true;
};

type ChildComponentProps = {
  message: boolean;
  setMessage: Dispatch<SetStateAction<boolean>>;
};

function Login({ message, setMessage }: ChildComponentProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [backendResponse, setBackendResponse] = useState<
    BackEndResponseBadType | BackEndResponseGoodType | null
  >(null);

  const navigate = useNavigate();
  const errors: string[] = [];

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [message, setMessage]);

  if (backendResponse && !backendResponse.success) {
    for (const value of Object.values(backendResponse.message).flat()) {
      errors.push(value);
    }
  }

  if (backendResponse?.success) {
    localStorage.setItem("expiresAt", String(backendResponse.data.expiration));
    return <Navigate to="/" />;
  }

  const userInfo = {
    email: email.toLowerCase(),
    password,
  };

  async function sendLoginInfo() {
    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      const data = await response.json();
      setBackendResponse(data);
    } catch (e) {
      console.error("Something went wrong: " + e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid h-screen place-items-center">
      {isLoading && <p>Loading...</p>}
      <div className="h-100 w-90  flex items-center justify-start flex-col mb-50">
        <div className="h-20 w-full flex items-center mb-5">
          <img className="h-50 w-full object-contain" src={img} />
        </div>
        <p className="text-4xl font-bold pb-2">Login</p>
        <p className="mb-5">
          Don't have an account?{" "}
          <span
            onClick={() => {
              navigate("/signup");
            }}
            className="text-[#AA60C8] hover:border-b hover:border-[#AA60C8] hover:cursor-pointer"
          >
            sign up
          </span>
        </p>
        <div className="mt-5 flex flex-col w-full">
          <p className="text-xs text-zinc-600 mb-1">YOUR EMAIL</p>
          <input
            className="border-b-2 border-zinc-700 mb-5 focus: outline-none placeholder-zinc-700 p-1"
            placeholder="Type your email here"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <p className="text-xs text-zinc-600 mb-1">YOUR PASSWORD</p>
          <input
            className="border-b-2 border-zinc-700 mb-5 focus: outline-none placeholder-zinc-700 p-1"
            placeholder="Type your password here"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />{" "}
        </div>
        <button
          onClick={sendLoginInfo}
          className="bg-[#AA60C8] mt-2 p-2 w-90 rounded-sm active:scale-95 transition-transform duration-150"
        >
          Login
        </button>

        {message && (
          <p className="mt-2 text-yellow-400">
            You have been logged out. Please Sign in again.
          </p>
        )}

        {backendResponse && <p className="mt-2 text-red-600">{errors[0]}</p>}
      </div>
    </div>
  );
}

export default Login;
