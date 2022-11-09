// import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Home from "./components/Home";
import Chat from "./components/Chat";
function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  function sidebarToggleHandler(evt) {
    setIsSideBarOpen(!isSideBarOpen);
  }
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Home sidebarToggleHandler={sidebarToggleHandler} isSideBarOpen={isSideBarOpen} />} path="/" />
          <Route element={<>Hello from login</>} path="/login" />
          <Route element={<>Hello from register</>} path="/register" />
          <Route element={<Chat sidebarToggleHandler={sidebarToggleHandler} isSideBarOpen={isSideBarOpen} />} path="/chat" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;