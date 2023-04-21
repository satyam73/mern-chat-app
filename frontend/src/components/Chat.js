import React, { useState, useEffect, useContext } from "react";
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
import { v4 as uuidv4 } from 'uuid';
import { BACKEND_BASE_URL, GET_CHAT_BY_USERID, SEND_API_URL } from "../constants";
import { UserContext } from "../App";
import { io } from "socket.io-client"
function Chat({ isSideBarOpen, sidebarToggleHandler }) {
  const socket = io("http://localhost:8080", { transports: ['websocket'] });
  const [mobileView, setMobileView] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [activeUser, setActiveUser] = useState([]);
  const [activeChat, setActiveChat] = useState([])
  const [message, setMessage] = useState("");
  const [user, setUser] = useContext(UserContext);
  // const [chats, setChats] = useState([]);
  const [friends, setFriends] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/friends", { withCredentials: true })
      .then(function (response) {
        // handle success
        const { data } = response;
        setFriends(data.friends)
        console.log(data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });

    socket.connect();
    console.log(friends)
    window.innerWidth > 700 ? setMobileView(false) : setMobileView(true);
  }, []);

  socket.on("receive-message", (message) => {
    console.log("message ", message)
    console.log("active chat here  ", activeChat)
    setActiveChat((prev) => [...prev, message]);
  });

  const userClickHandler = async (e, friend) => {
    try {
      const { data: { chat } } = await axios
        .get(GET_CHAT_BY_USERID(friend?._id), { withCredentials: true });
      // console.log(chat)
      if (chat.length !== 0) {
        setActiveChat([...chat[0]?.messages]);
        console.log(chat[0]?.messages)
      }
      setActiveUser(friend._id);

      if (socket.connected) {
        if (chat.length === 0) {
          /*if chat not present case needs to be handled - 
          update its implemented needs to be checked*/
          const uuid = uuidv4();
          const chatId = uuid;
          console.log(chatId)
          // socket.emit("connected", chatId);
          socket.emit("joining", chatId);
          console.log("connected")
        } else {
          const chatId = chat[0]._id;
          console.log(chatId)
          socket.emit("joining", chatId);
          console.log("connected")
        }
      }
    } catch (err) {
      console.log("Error: ", err)
    }
  }
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
                {friends.map((friend, index) => (
                  <User
                    key={index}
                    name={friend.name}
                    clickHandler={(e) => { userClickHandler(e, friend) }}
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
                {activeChat.map((message) => {
                  if (message?.sender === user?._id) {
                    // console.log('self')
                    return <Message key={message._id} className="right" message={message.message} />
                  } else {
                    return <Message key={message._id} className="left" message={message.message} />
                  }
                })}
                {/* <Message className="left" />
                <Message className="right" />
                <Message className="left" />
                <Message className="right" />
                <Message className="left" />
                <Message className="right" />
                <Message className="left" />
                <Message className="right" /> */}
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
                    onInput={(e) => { setMessage(e.target.value.trim()) }}
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
                      const payload = { senderId: user._id, receiverId: activeUser, message, chatId: activeChat[0].chat ?? null }
                      const { data, status } = await axios.post(
                        SEND_API_URL,
                        payload,
                        {
                          headers: { "Content-Type": "application/json" },
                          withCredentials: true,
                        }
                      );
                      const savedMessage = data.message;
                      console.log("socket is connect", socket.connected)
                      socket.emit("send-message", savedMessage);
                      console.log("data ", savedMessage, " status ", status)
                    } catch (err) {
                      console.log("Error: ", err);
                    }
                    console.log(message)
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
