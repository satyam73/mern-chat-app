import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserProvider";

export const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export default function Auth({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    function check() {

      if (!user._id) {
        setIsLoggedIn(false);
        navigate("/login");
        return;
      }

      setIsLoggedIn(true);
    }

    check();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {isLoggedIn && children}
    </AuthContext.Provider>)
}
