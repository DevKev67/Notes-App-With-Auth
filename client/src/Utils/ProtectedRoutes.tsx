import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Navigate, Outlet } from "react-router-dom";

type ChildComponentProps = {
  setMessage: Dispatch<SetStateAction<boolean>>;
};

function ProtectedRoutes({ setMessage }: ChildComponentProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    async function testAuthentication() {
      try {
        const response = await fetch("http://localhost:8080/api/auth/test", {
          credentials: "include",
        });

        setAuthenticated(response.ok);
      } catch {
        setAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    }

    testAuthentication();
  }, []);

  useEffect(() => {
    const storedExpiration = localStorage.getItem("expiresAt");

    if (!storedExpiration) {
      return;
    }

    const expiresAt = Number(storedExpiration);

    if (!Number.isFinite(expiresAt)) {
      localStorage.removeItem("expiresAt");
      return;
    }

    const remainingTime = expiresAt - Date.now();

    function logout() {
      localStorage.removeItem("expiresAt");
      setMessage(true);
      setAuthenticated(false);
    }

    if (remainingTime <= 0) {
      logout();
      return;
    }

    const timer = window.setTimeout(logout, remainingTime);

    return () => window.clearTimeout(timer);
  }, [setMessage]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
