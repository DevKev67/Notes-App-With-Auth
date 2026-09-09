import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ProtectedRoutes from "./Utils/ProtectedRoutes";
import GuestRoutes from "./Utils/GuestRoutes";
import { useState } from "react";
import Create from "./Components/Create";
import Settings from "./Components/Settings";
import { AppShortcuts } from "./Utils/AppShortcuts";

type BackEndResponseGoodType = {
  data: {
    expiration: number;
    created_at: string;
    name: string;
  };
  message: string;
  success: true;
};

function App() {
  const [message, setMessage] = useState<boolean>(false);
  const [loginResponse, setLoginResponse] =
    useState<BackEndResponseGoodType | null>(null);

  return (
    <div className="min-h-screen bg-[#1D1A20] text-white">
      <BrowserRouter>
        <AppShortcuts />
        <Routes>
          <Route element={<GuestRoutes />}>
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/login"
              element={
                <Login
                  message={message}
                  setMessage={setMessage}
                  setLoginResponse={setLoginResponse}
                />
              }
            />
          </Route>

          <Route element={<ProtectedRoutes setMessage={setMessage} />}>
            <Route path="/" element={<Home loginResponse={loginResponse} />} />
            <Route path="/create" element={<Create />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
