import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../constants";
function Auth({ Component }) {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function check() {
      try {
        const { status } = await axios.get(
          BACKEND_BASE_URL + "/api/user/chat",
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (status === 200) {
          setIsAuth(true);
        }
      } catch (err) {
        console.log("Error: ", err.message);
        setIsAuth(false);
        console.log("navigating");
        navigate("/login");
      }
    }
    check();
  });

  return <>{isAuth && Component}</>;
}

export default Auth;
