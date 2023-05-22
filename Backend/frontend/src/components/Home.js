import React from "react";
import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";
import HomeImg from "../images/home_img.svg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./styles/Home.css";
import "../utils.css";
function Home({ isSideBarOpen, sidebarToggleHandler }) {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar sidebarToggleHandler={sidebarToggleHandler} />
      <Sidebar isSideBarOpen={isSideBarOpen} />
      <div className="container-fluid" style={{ height: "92vh" }}>
        <div className="row h-100">
          <div className="col-12 col-md-6  d-flex justify-content-center align-items-center flex-column">
            <h1>The Chat App You Want!</h1>
            <p>Just Login and Socialise with the Chat App.</p>
            <div className="buttons d-flex">
              <Button
                variant="contained"
                sx={{
                  marginRight: "20px",
                  backgroundColor: "var(--primary-color)",
                  "&:hover": {
                    backgroundColor: "var(--secondary-color)",
                  },
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                sx={{
                  border: "2px solid var(--primary-color)",
                  color: "var(--primary-color)",
                  "&:hover": {
                    border: "2px solid var(--secondary-color)",
                  },
                }}
                onClick={() => navigate("/register")}
              >
                Signup
              </Button>
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
            <img className="home_img" src={HomeImg} alt="Chat" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
