import React from "react";
import { Button } from "@mui/material";

function TabCard() {
  return (
    <div class="tabCard" style={{ zIndex: 2 }}>
      <div className="tabCardDetails">
        <img
          className="tabCardImage"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
          alt=""
        />
        <div className="username">Dark Sign</div>
      </div>
      <div className="tabCardActions">
        <Button
          sx={{
            backgroundColor: "var(--secondary-color)",
            "&:hover": { backgroundColor: "var(--primary-color)" },
          }}
          variant="contained"
        >
          Accept
        </Button>
        <Button
          sx={{
            borderColor: "red",
            color: "red",
            "&:hover": {
              borderColor: "red",
              backgroundColor: "var(--transparent-red)",
            },
          }}
          variant="outlined"
        >
          Reject
        </Button>
      </div>
    </div>
  );
}

export default TabCard;
