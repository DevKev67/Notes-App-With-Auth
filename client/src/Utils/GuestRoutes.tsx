import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function GuestRoutes() {
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return authenticated ? <Navigate to="/login" /> : <Outlet />;
}

export default GuestRoutes;
