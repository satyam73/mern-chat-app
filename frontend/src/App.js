// import logo from './logo.svg';
import React, { useState, createContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Auth from "./common/Auth";
import "./global.css";
import { BACKEND_BASE_URL } from "./constants";
import axios from "axios";
export const ErrorContext = createContext();
function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  // const navigate = useNavigate();
  function sidebarToggleHandler(evt) {
    setIsSideBarOpen(!isSideBarOpen);
  }

  useEffect(() => {
    // const { status } = axios.get(BACKEND_BASE_URL + "/api/user/chat", {
    //   headers: { "Content-Type": "application/json" },
    // });
    // console.log(BACKEND_BASE_URL + "/api/user/chat");
    // if (status === 200) {
    //   setIsAuth(status);
    // }
  });
  return (
    <div className="App">
      <Router>
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
          {/* <Route element={<>Hello from login</>} path="/login" /> */}
          {/* <Route element={<>Hello from register</>} path="/register" /> */}
          <Route
            element={
              <Auth
                Component={
                  <Chat
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
      </Router>
    </div>
  );
}

export default App;
