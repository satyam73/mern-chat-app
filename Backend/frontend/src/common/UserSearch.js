import React, { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import { sendFriendRequest } from "../services/user";
import { useToast } from "../contexts/Toast";
import { Box } from "@mui/material";

function UserSearch({ style, profiles }) {
  const { toast, showToast } = useToast();

  const sendFriendRequestHandler = async (e, userId) => {
    try {
      const {
        data: { response },
        status,
      } = await sendFriendRequest(userId);

      if (status === 200) {
        showToast({
          ...toast, isVisible: true,
          text: response,
          type: 'success',
        });
      }
    } catch (error) {
      console.error("Error: ", error);
      showToast({
        ...toast, isVisible: true,
        text: error.message,
        type: 'error',
      });
    }
  };

  return (
    <>
      <div style={style} className="searchContainer">
        <Box className="main">
          {profiles?.map((profile) => {
            return (
              <div className="searchedUser" key={profile.id} style={{}}>
                <p>{profile.username}</p>
                <span
                  data-user="hello"
                  onClick={(e) => sendFriendRequestHandler(e, profile.id)}
                >
                  <PersonAddIcon fontSize="large" />
                </span>
              </div>
            );
          })}
        </Box>
      </div>
    </>
  );
}

export default UserSearch;
