import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../models/auth";
import { useAuth } from "../../contexts/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const authCtx = useAuth();
  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        authCtx.logout();
        navigate("/login");
      } catch (error: any) {
        console.error("Logout failed:", error.message);
      }
    };

    performLogout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
