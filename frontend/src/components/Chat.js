import React, { useState, useEffect, useContext } from "react";
import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";
import User from "../common/User";
import Form from "react-bootstrap/Form";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import background from "../images/background.svg";
import BottomBar from "../common/BottomBar";
import Message from "../common/Message";
import { v4 as uuidv4 } from "uuid";
import { GET_CHAT_BY_USERID, SEND_API_URL } from "../constants";
import { UserContext } from "../App";
import { io } from "socket.io-client";
import Loader from "../common/Loader";

function Chat({ isSideBarOpen, sidebarToggleHandler }) {
  const socket = io("http://localhost:5000", {
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionDelay: 1000,
  });
  const [mobileView, setMobileView] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [activeUser, setActiveUser] = useState([]);
  const [activeChat, setActiveChat] = useState([]);
  const [message, setMessage] = useState("");
  const [chatId, setChatId] = useState("");
  const [user, setUser] = useContext(UserContext);
  // const [chats, setChats] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/friends", { withCredentials: true })
      .then(function (response) {
        const { data } = response;
        setFriends(data.friends);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    socket.connect();
    console.log(friends);
    window.innerWidth > 700 ? setMobileView(false) : setMobileView(true);
  }, []);

  socket.on("receive-message", (message) => {
    console.log("message ", message);
    console.log("active chat here  ", activeChat);
    setActiveChat((prev) => [...prev, message]);
  });

  const userClickHandler = async (e, friend) => {
    try {
      setActiveUser(friend);
      const {
        data: { chat },
      } = await axios.get(GET_CHAT_BY_USERID(friend?._id), {
        withCredentials: true,
      });

      if (chat.length !== 0) {
        setActiveChat([...chat[0]?.messages]);
        console.log(chat[0]?.messages);
      }

      if (socket.connected) {
        const tempChatId = chat[0]._id;
        setChatId(tempChatId);
        socket.emit("joining", tempChatId);
        console.log("connected");
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

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
              {/* <div className="col-2">
                <SearchIcon />
              </div> */}
            </div>
            <div
              className="row"
              style={{ height: "81vh", overflowY: "scroll" }}
            >
              <div className="col-12 pt-3" style={{ paddingLeft: "20px" }}>
                {friends.map((friend, index) => (
                  <User
                    key={index}
                    name={friend.name}
                    clickHandler={(e) => {
                      userClickHandler(e, friend);
                    }}
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
              <div className="col-12 fw-bold fs-5">{activeUser.name || ""}</div>
              {/* <div className="col-1 justify-self-end">*</div> */}
            </div>
            <div className="row" style={{ height: "72vh" }}>
              {/* <>Loader</> */}
              {/* <Loader style={{ height: "75px !important", width: "100px !important" }} /> */}
              <div
                className="col mt-3 overflow-y"
                style={{ height: "inherit", overflow: "scroll" }}
              >
                {activeChat.map((message) => {
                  if (message?.sender === user?._id) {
                    // console.log('self')
                    return (
                      <Message
                        key={message._id}
                        className="right"
                        message={message.message}
                      />
                    );
                  } else {
                    return (
                      <Message
                        key={message._id}
                        className="left"
                        message={message.message}
                      />
                    );
                  }
                })}
              </div>
            </div>
            <div className="row align-items-center" style={{ height: "8vh" }}>
              <div className="col-10">
                <div className="">
                  <Form.Control
                    value={message}
                    type="text"
                    placeholder="Enter Your Message!"
                    className="mb-2 py-3 w-100 rounded-3 border-0 ps-2 "
                    style={{
                      color: "black",
                      backgroundColor: "rgb(227 227 227)",
                    }}
                    onInput={(e) => {
                      setMessage(e.target.value);
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
                  onClick={async (e) => {
                    try {
                      const payload = {
                        senderId: user._id,
                        receiverId: activeUser._id,
                        message: message.trim(),
                        chatId,
                      };
                      const { data, status } = await axios.post(
                        SEND_API_URL,
                        payload,
                        {
                          headers: { "Content-Type": "application/json" },
                          withCredentials: true,
                        }
                      );
                      const savedMessage = data.message;
                      console.log("socket is connect", socket.connected);
                      socket.emit("send-message", savedMessage);
                      console.log("data ", savedMessage, " status ", status);
                    } catch (err) {
                      console.log("Error: ", err);
                    } finally {
                      setMessage("");
                    }
                    console.log(message);
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
