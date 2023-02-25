import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";
import User from "../common/User";
import Form from "react-bootstrap/Form";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
// import "./styles/Chat.css";
import background from "../images/background.svg";
import BottomBar from "../common/BottomBar";
import Message from "../common/Message";
import SearchIcon from "@mui/icons-material/Search";
import UserSearch from "../common/UserSearch";
// import { MenuIcon } from '@mui/icons-material';
function Chat({ isSideBarOpen, sidebarToggleHandler }) {
  const [mobileView, setMobileView] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [chats, setChats] = useState([]);
  // const clickHandler = () => {
  //   setIsChatActive(true);
  // };
  const array = Array(6);
  array.fill("Lorem Ipsum");

  useEffect(() => {
    // window.location.reload();
    axios
      .get("http://localhost:5000/api/chats")
      .then(function (response) {
        // handle success
        const { data } = response;
        setChats([...data]);

        console.log(data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });

    window.innerWidth > 700 ? setMobileView(false) : setMobileView(true);
  }, [chats]);
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
      {mobileView && (
        <BottomBar
          setIsChatActive={setIsChatActive}
          isChatActive={isChatActive}
        />
      )}
      <Sidebar isSideBarOpen={isSideBarOpen} />
      <div
        className="container-fluid my-2 border rounded-3 bg-light"
        style={{ height: "90vh", width: "96vw" }}
      >
        {/* <UserSearch /> */}
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
              <div className="col-2">
                <SearchIcon />
              </div>
            </div>
            <div
              className="row"
              style={{ height: "81vh", overflowY: "scroll" }}
            >
              <div className="col-12 pt-3" style={{ paddingLeft: "20px" }}>
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
            <div className="row" style={{ height: "72vh" }}>
              <div
                className="col mt-3 overflow-y"
                style={{ height: "inherit", overflow: "scroll" }}
              >
                <Message className="left" />
                <Message className="right" />
                <Message className="left" />
                <Message className="right" />
                <Message className="left" />
                <Message className="right" />
                <Message className="left" />
                <Message className="right" />
              </div>
            </div>
            <div className="row align-items-center" style={{ height: "8vh" }}>
              <div className="col-10">
                <div className="">
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
