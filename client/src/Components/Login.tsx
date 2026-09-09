import { Navigate, useNavigate } from "react-router-dom";
import img from "../assets/random logo.png";
import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
  type SubmitEvent,
} from "react";

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
    name: string;
  };
  message: string;
  success: true;
};

type ChildComponentProps = {
  message: boolean;
  setMessage: Dispatch<SetStateAction<boolean>>;
  setLoginResponse: Dispatch<SetStateAction<BackEndResponseGoodType | null>>;
};

function Login({ message, setMessage, setLoginResponse }: ChildComponentProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [backendResponse, setBackendResponse] = useState<
    BackEndResponseBadType | BackEndResponseGoodType | null
  >(null);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendLoginInfo();
  };

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
    localStorage.setItem("userName", backendResponse.data.name);
    localStorage.setItem("createdAt", backendResponse.data.created_at);
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

      if (response.ok) {
        setLoginResponse(data);
      }

      setBackendResponse(data);
    } catch (e) {
      console.error("Something went wrong: " + e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid h-screen place-items-center">
      <div className="mb-50 flex h-100 w-90 flex-col items-center justify-start">
        <div className="mb-5 flex h-20 w-full items-center">
          <img className="h-50 w-full object-contain" src={img} alt="Logo" />
        </div>

        <p className="pb-2 text-4xl font-bold">Login</p>

        <p className="mb-5">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#AA60C8] hover:cursor-pointer hover:border-b hover:border-[#AA60C8]"
          >
            sign up
          </span>
        </p>

        <form onSubmit={handleSubmit} className="mt-5 flex w-full flex-col">
          <p className="mb-1 text-xs text-zinc-600">YOUR EMAIL</p>

          <input
            type="email"
            value={email}
            className="mb-5 border-b-2 border-zinc-700 p-1 placeholder-zinc-700 focus:outline-none"
            placeholder="Type your email here"
            onChange={(event) => setEmail(event.target.value)}
          />

          <p className="mb-1 text-xs text-zinc-600">YOUR PASSWORD</p>

          <input
            type="password"
            value={password}
            className="mb-5 border-b-2 border-zinc-700 p-1 placeholder-zinc-700 focus:outline-none"
            placeholder="Type your password here"
            onChange={(event) => setPassword(event.target.value)}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full rounded-sm bg-[#AA60C8] p-2 transition-transform duration-150 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p className="mt-2 text-yellow-400">
            You have been logged out. Please sign in again.
          </p>
        )}

        {backendResponse && !backendResponse.success && (
          <p className="mt-2 text-red-600">{errors[0]}</p>
        )}
      </div>
    </div>
  );
}

export default Login;
