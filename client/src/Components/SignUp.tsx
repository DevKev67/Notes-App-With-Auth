import { Navigate, useNavigate } from "react-router-dom";
import img from "../assets/random logo.png";
import { useState } from "react";

type backEndInfoBadType = {
  success: boolean;
  message: {
    email?: string[];
    password?: string[];
    name?: string[];
  };
};

type backEndInfoGoodType = {
  success: boolean;
  data: {
    email?: string;
    name?: string;
    created_at?: string;
  };
  message: string;
};

function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [backendInfo, setBackendInfo] = useState<
    backEndInfoBadType | backEndInfoGoodType | null
  >(null);

  const errors: string[] = [];

  if (backendInfo && backendInfo.success === false) {
    for (const value of Object.values(backendInfo.message).flat()) {
      errors.push(value);
    }
  }

  if (backendInfo?.success) {
    return <Navigate to="/login" />;
  }

  const userInfo = {
    name,
    email: email.toLowerCase(),
    password,
  };

  async function sendUserInfomation() {
    if (password !== confirmPassword) {
      setBackendInfo({
        success: false,
        message: {
          password: ["Password does not match"],
        },
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      const data = await response.json();
      setBackendInfo(data);
    } catch (e) {
      console.error("Something went wrong: " + e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid h-screen place-items-center">
      {isLoading && <p>Loading....</p>}
      <div className="h-100 w-90  flex items-center justify-start flex-col mb-50">
        <div className="h-20 w-full flex items-center mb-5">
          <img className="h-50 w-full object-contain" src={img} />
        </div>
        <p className="text-4xl font-bold pb-2">Create Account</p>
        <p className="mb-5">
          Already have an account?{" "}
          <span
            onClick={() => {
              navigate("/login");
            }}
            className="text-[#AA60C8] hover:border-b hover:border-[#AA60C8] hover:cursor-pointer"
          >
            sign in
          </span>
        </p>
        <div className="mt-5 flex flex-col w-full">
          <p className="text-xs text-zinc-600 mb-1">YOUR NAME</p>
          <input
            className="border-b-2 border-zinc-700 mb-5 focus:outline-none placeholder-zinc-700 p-1"
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
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
          <p className="text-xs text-zinc-600 mb-1">REPEAT YOUR PASSWORD</p>
          <input
            className="border-b-2 border-zinc-700 mb-5 focus: outline-none placeholder-zinc-700 p-1"
            placeholder="Repeat your password here"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <button
          onClick={sendUserInfomation}
          className="bg-[#AA60C8] mt-2 p-2 w-90 rounded-sm active:scale-95 transition-transform duration-150"
        >
          Sign Up
        </button>
        {errors && <p className="mt-2 text-red-600">{errors[0]}</p>}
      </div>
    </div>
  );
}

export default SignUp;
