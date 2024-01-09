import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { USER_DETAILS_URL } from "../constants";

export const UserContext = createContext({});

export const useUser = () => useContext(UserContext);

export default function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(USER_DETAILS_URL, {
          withCredentials: true,
        });
        setUser({ ...data.user });
      } catch (error) {
        console.error('Something went wrong while fetching self user data in user context ', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }} >
      {children}
    </UserContext.Provider >
  )
}