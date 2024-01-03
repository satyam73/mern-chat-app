import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserProvider";

export const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    function check() {
      if (isLoading) return;

      if (!user._id) {
        setIsLoggedIn(false);
        navigate("/login");
        return;
      }

      setIsLoggedIn(true);
    }
    check();
  }, [isLoading]);

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {isLoggedIn && children}
    </AuthContext.Provider>)
}
