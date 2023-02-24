import React from "react";
import { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { SEND_FRIEND_REQUEST_URL } from "../constants";
import { Alert, Snackbar } from "@mui/material";
function UserSearch({ style, profiles }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const [success, setSuccess] = useState({
    isSuccess: false,
    message: "",
  });
  const open = Boolean(anchorEl);
  // console.log(profiles);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // console.log(profiles[0])
  const handleClose = () => {
    setAnchorEl(null);
  };
  const sendFriendRequest = async (e, userId) => {
    console.log(userId);
    console.log(SEND_FRIEND_REQUEST_URL(userId));

    const response = await fetch(SEND_FRIEND_REQUEST_URL(userId), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    console.log("response ", response);
    const { response: data } = await response.json();
    console.log("data ", data);
  };
  return (
    <>
      <Snackbar
        open={error.isError}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        // key={{ vertical: "bottom" } + { horizontal: "center" }}
        onClose={() =>
          setError({
            isError: false,
            message: "no error!",
          })
        }
      >
        <Alert
          onClose={() =>
            setError({
              isError: false,
              message: "no error!",
            })
          }
          severity="error"
          sx={{ width: "100%" }}
        >
          {error.message}
        </Alert>
      </Snackbar>

      <div style={style} className="searchContainer">
        {profiles.map((profile) => {
          return (
            <div className="searchedUser" key={profile.id} style={{}}>
              <p>{profile.username}</p>
              <span
                data-user="hello"
                onClick={(e) => sendFriendRequest(e, profile.id)}
              >
                <PersonAddIcon style={{ fontSize: "30px" }} />
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default UserSearch;
