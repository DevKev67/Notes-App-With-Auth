import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ProtectedRoutes from "./Utils/ProtectedRoutes";
import GuestRoutes from "./Utils/GuestRoutes";

function App() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <BrowserRouter>
        <Routes>
          <Route element={<GuestRoutes />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
