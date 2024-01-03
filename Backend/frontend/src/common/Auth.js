import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";

function Auth({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    function check() {

      if (!user._id) {
        setIsAuth(false);
        navigate("/login");
        return;
      }

      setIsAuth(true);
    }

    check();
  }, []);

  return <>{isAuth && children}</>;
}

export default Auth;
