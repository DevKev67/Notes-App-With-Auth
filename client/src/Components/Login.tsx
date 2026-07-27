import img from "../assets/random logo.png";

function Login() {
  return (
    <div className="grid h-screen place-items-center">
      <div className="h-100 w-90  flex items-center justify-start flex-col mb-50">
        <div className="h-20 w-full flex items-center mb-2">
          <img className="h-50 w-full object-contain" src={img} />
        </div>
        <p className="text-4xl font-bold pb-2">Login</p>
        <p className="mb-5">
          Don't have an account?{" "}
          <span className="text-[#AA60C8] hover:border-b hover:border-[#AA60C8] hover:cursor-pointer">
            sign up
          </span>
        </p>
        <div className="mt-5 flex flex-col w-full">
          <p className="text-xs text-zinc-600 mb-1">YOUR EMAIL</p>
          <input
            className="border-b-2 border-zinc-700 mb-5 focus: outline-none placeholder-zinc-700 p-1"
            placeholder="Type your email here"
          />
          <p className="text-xs text-zinc-600 mb-1">YOUR PASSWORD</p>
          <input
            className="border-b-2 border-zinc-700 mb-5 focus: outline-none placeholder-zinc-700 p-1"
            placeholder="Type your password here"
          />{" "}
        </div>
        <button className="bg-[#AA60C8] mt-2 p-2 w-90 rounded-sm active:scale-95 transition-transform duration-150">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
