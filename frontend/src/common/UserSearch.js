import React from "react";
import { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function UserSearch({ style, profiles }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // console.log(profiles);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // console.log(profiles[0])
  const handleClose = () => {
    setAnchorEl(null);
  };
  const sendFriendRequest = async (e, userID) => {
    console.log(userID);
    // const response = await fetch();
  };
  return (
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
  );
}

export default UserSearch;
