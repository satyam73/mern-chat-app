import React from "react";
import { IconButton } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { ACCEPT_FRIEND_REQUEST_URL } from "../constants";

function TabCard({ id, name, profileImg }) {
  const acceptHandler = async (e, id) => {
    const { data, status } = await axios.put(
      ACCEPT_FRIEND_REQUEST_URL(id),
      {},
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log("hello there ", data, status);
  };
  const rejectHandler = (e, id) => {
    console.log(e);
  };
  return (
    <div className="tabCard">
      <div className="tabCardDetails">
        <img
          className="tabCardImage"
          src={
            profileImg ||
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
          }
          alt=""
        />
        <div className="username">{name || "No user"}</div>
      </div>
      <div className="tabCardActions">
        <IconButton
          className="acceptButton"
          aria-label="accept"
          onClick={(e) => acceptHandler(e, id)}
        >
          <DoneIcon className="acceptIcon" />
        </IconButton>

        {/* <IconButton
          className="rejectButton"
          aria-label="reject"
          onClick={(e) => rejectHandler(e, id)}
        >
          <CloseIcon className="rejectIcon" />
        </IconButton> */}
      </div>
    </div>
  );
}

export default TabCard;
