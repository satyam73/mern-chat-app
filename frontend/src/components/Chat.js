import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";
import User from "../common/User";
import Form from "react-bootstrap/Form";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
// import "./styles/Chat.css";
import background from "../images/background.svg";
// import { MenuIcon } from '@mui/icons-material';
function Chat({ isSideBarOpen, sidebarToggleHandler }) {
  const [mobileView, setMobileView] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);

  // const clickHandler = () => {
  //   setIsChatActive(true);
  // };
  const array = Array(25);
  array.fill("Lorem Ipsum");
  console.log(array);
  // mobileView && alert(mobileView);
  useEffect(() => {
    window.innerWidth > 700 ? setMobileView(false) : setMobileView(true);
  }, []);
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        height: "100vh",
        backgroundPosition: "center",
        backgroundSize: "100%",
      }}
    >
      <Navbar sidebarToggleHandler={sidebarToggleHandler} />
      <Sidebar isSideBarOpen={isSideBarOpen} />
      <div
        className="container-fluid my-2 border rounded-3 bg-light"
        style={{ height: "90vh", width: "96vw" }}
      >
        <div className="row h-100">
          <div
            className={
              !mobileView ? "col-4" : !isChatActive ? "col-12" : "col-0 d-none"
            }
          >
            <div className="row align-items-start" style={{ height: "8vh" }}>
              <div className="col-12 py-2">
                <Form.Control
                  type="text"
                  placeholder="Search Chat Here!"
                  className="mb-2 py-3 w-100 rounded-3 border-0 ps-2 "
                  style={{
                    color: "black",
                    backgroundColor: "rgb(227 227 227)",
                  }}
                />
              </div>
            </div>
            <div
              className="row"
              style={{ height: "81vh", overflowY: "scroll" }}
            >
              <div className="col-12">
                {array.map((element, index) => (
                  <User
                    key={index}
                    name={element}
                    clickHandler={setIsChatActive}
                  />
                ))}
              </div>
            </div>
          </div>
          <div
            className={
              !mobileView
                ? "col-8"
                : !isChatActive
                ? "col-0 d-none"
                : "col-12 d-block"
            }
          >
            <div
              className="row align-items-center"
              style={{ height: "8vh", backgroundColor: "white" }}
            >
              <div className="col-11 fw-bold fs-5">Satyam Bajpai</div>
              <div className="col-1 justify-self-end">*</div>
            </div>
            <div className="row" style={{ height: "74vh" }}></div>
            <div className="row align-items-center" style={{ height: "8vh" }}>
              <div className="col-10">
                <div class="">
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Message!"
                    className="mb-2 py-3 w-100 rounded-3 border-0 ps-2 "
                    style={{
                      color: "black",
                      backgroundColor: "rgb(227 227 227)",
                    }}
                  />
                </div>
              </div>
              <div className="col-2 h-100">
                <IconButton
                  aria-label="delete"
                  sx={{
                    borderRadius: "12px",
                    background: "var(--primary-color)",
                    height: "80%",
                    width: "100%",
                    "&:hover": { backgroundColor: "var(--primary-color)" },
                  }}
                >
                  <SendIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
