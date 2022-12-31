import React from "react";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ChatIcon from "@mui/icons-material/Chat";

function BottomBar({ setIsChatActive }) {
  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        top: "auto",
        bottom: 0,
        backgroundColor: "white",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-around" }}>
        <IconButton color="inherit" aria-label="open drawer">
          <ArrowBackIosIcon
            sx={{ color: "black" }}
            onClick={(evt) => {
              setIsChatActive(false);
            }}
          />
        </IconButton>
        {/* <StyledFab color="secondary" aria-label="add">
          <AddIcon />
        </StyledFab> */}
        {/* <Box /> */}
        <IconButton color="inherit">
          <ChatIcon
            sx={{ color: "black" }}
            onClick={(evt) => {
              setIsChatActive(false);
            }}
          />
        </IconButton>
        <IconButton color="inherit">
          <MoreIcon sx={{ color: "black" }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default BottomBar;
