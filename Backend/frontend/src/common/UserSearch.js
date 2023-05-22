import React from "react";
import { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { SEND_FRIEND_REQUEST_URL } from "../constants";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
function UserSearch({ style, profiles }) {
  // const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const [success, setSuccess] = useState({
    isSuccess: false,
    message: "",
  });
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // console.log(profiles[0])
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  const sendFriendRequest = async (e, userId) => {
    try {
      const {
        data: { response },
        status,
      } = await axios.post(SEND_FRIEND_REQUEST_URL(userId), undefined, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (status === 200) {
        setSuccess({
          isSuccess: true,
          message: response,
        });
      }
    } catch (err) {
      console.log("Error: ", err);
      setError({
        isError: true,
        message: err.response.data.response,
      });
    }
  };
  return (
    <>
      <Snackbar
        variant="error"
        open={error.isError}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
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
      <Snackbar
        open={success.isSuccess}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() =>
          setSuccess({
            isSuccess: false,
            message: "no error!",
          })
        }
      >
        <Alert
          onClose={() =>
            setSuccess({
              isSuccess: false,
              message: "no error!",
            })
          }
          severity="success"
          sx={{ width: "100%" }}
        >
          {success.message}
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
