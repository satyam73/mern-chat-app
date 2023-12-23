import React, { useState, createContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Auth from "./common/Auth";
import "./global.css";
import { USER_DETAILS_URL } from "./constants";
import axios from "axios";
import NewChatPage from "./components/NewChatPage/NewChatPage";
import Layout from "./common/Layout";
export const ErrorContext = createContext();

export const UserContext = createContext({});

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [user, setUser] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isDev = Boolean(searchParams.get('dev'));

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        USER_DETAILS_URL,
        {
          withCredentials: true,
        }
      );

      setUser({ ...data.user });
    })();
  }, []);

  function sidebarToggleHandler(evt) {
    setIsSideBarOpen(!isSideBarOpen);
  }

  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className="App">
        {/* <Router> */}
        <Routes>
          <Route
            element={
              <Home
                sidebarToggleHandler={sidebarToggleHandler}
                isSideBarOpen={isSideBarOpen}
              />
            }
            path="/"
          />
          <Route
            element={
              <Auth
                // Component={
                //   <Chat
                //     sidebarToggleHandler={sidebarToggleHandler}
                //     isSideBarOpen={isSideBarOpen}
                //   />
                // }

                Component={
                  isDev
                    ?
                    <Layout sidebarToggleHandler={sidebarToggleHandler}>< NewChatPage /></Layout>
                    : <Chat
                      sidebarToggleHandler={sidebarToggleHandler}
                      isSideBarOpen={isSideBarOpen}
                    />
                }
              />
            }
            path="/chat"
          />
          <Route
            element={
              <Register
                sidebarToggleHandler={sidebarToggleHandler}
                isSideBarOpen={isSideBarOpen}
              />
            }
            path="/register"
          />
          <Route
            element={
              <Login
                sidebarToggleHandler={sidebarToggleHandler}
                isSideBarOpen={isSideBarOpen}
              />
            }
            path="/login"
          />
          <Route
            element={
              <Profile
                sidebarToggleHandler={sidebarToggleHandler}
                isSideBarOpen={isSideBarOpen}
              />
            }
            path="/profile"
          />
        </Routes>
        {/* </Router> */}
      </div>
    </UserContext.Provider >
  );
}

export default App;
