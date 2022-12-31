// import logo from './logo.svg';
import React, { useState, createContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import "./global.css";
export const ErrorContext = createContext();
function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  function sidebarToggleHandler(evt) {
    setIsSideBarOpen(!isSideBarOpen);
  }
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
              <Chat
                sidebarToggleHandler={sidebarToggleHandler}
                isSideBarOpen={isSideBarOpen}
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
