import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserProvider";

export const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, isLoading: isUserLoading } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  let componentToShow;

  const isNotLoggedInPage = ['/login', '/', '/register'].includes(window.location.pathname);

  useEffect(() => {
    function check() {
      setIsLoading(true);
      if (isUserLoading) return;

      if (!user._id) {
        setIsLoggedIn(false);

        if (!isNotLoggedInPage) navigate("/login");

      } else {
        setIsLoggedIn(true);
      }

      setIsLoading(false)
    }
    check();
  }, [isUserLoading]);


  if (isNotLoggedInPage) {
    componentToShow = children;
  } else if (isLoggedIn) {
    componentToShow = children;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLoading, setIsLoading }}>
      {componentToShow}
    </AuthContext.Provider>)
}
