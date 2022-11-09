import React, { useState } from 'react';
import Navbar from "../common/Navbar"
import Sidebar from '../common/Sidebar';
import HomeImg from "../images/home_img.svg";
import { Button } from "@mui/material";
import "./styles/Home.css";
import "../utils.css"
function Home({isSideBarOpen, sidebarToggleHandler}) {

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
                            <Button sx={{
                                marginRight: "20px", backgroundColor: "var(--primary-color)",
                                "&:hover": {
                                    backgroundColor: "var(--secondary-color)"
                                }

                            }} variant="contained"> Login</Button>
                            <Button variant="outlined" sx={{
                                border: "2px solid var(--primary-color)",
                                color: "var(--primary-color)",
                                "&:hover": {
                                    border: "2px solid var(--secondary-color)"
                                }

                            }}> Signup</Button>
                        </div>

                    </div>
                    <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                        <img className="home_img" src={HomeImg} alt="Chat" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;