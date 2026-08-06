import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ProtectedRoutes from "./Utils/ProtectedRoutes";
import GuestRoutes from "./Utils/GuestRoutes";
import { useState } from "react";

function App() {
  const [message, setMessage] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <BrowserRouter>
        <Routes>
          <Route element={<GuestRoutes />}>
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/login"
              element={<Login message={message} setMessage={setMessage} />}
            />
          </Route>

          <Route element={<ProtectedRoutes setMessage={setMessage} />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
