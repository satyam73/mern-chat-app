import React from "react";
import "./styles/User.css";
function User({ user, clickHandler }) {
  return (
    <div
      className="row border justify-content-center align-items-center p-2 userListCard"
      onClick={() => {
        clickHandler(true);
        console.log("clicked");
      }}
    >
      <div className="col-3">
        <img
          src={user.profilePic || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60"}
          alt="user"
          style={{ width: "60px", borderRadius: "50px" }}
        />
      </div>
      <div className="col-9">
        <div className="userListName row fw-bold">{user.name}</div>
        <div className="userListLastMessage row fw-bold text-secondary">
          {"Last Message"}
        </div>
      </div>
    </div>
  );
}

export default User;
