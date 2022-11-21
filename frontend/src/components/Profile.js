import React, { useState } from "react";
import Navbar from "../common/Navbar";
import background from "../images/background.svg";
import { IconButton, Button } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";

function Profile() {
  const [profile, setProfile] = useState("");
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        height: "100vh",
        backgroundPosition: "center",
        backgroundSize: "100%",
      }}
    >
      <Navbar />
      <div
        className="container-fluid my-2 border rounded-3 bg-white"
        style={{ height: "90vh", width: "96vw" }}
      >
        <div className="row justify-content-end mt-3">
          <div className="col-1" style={{ width: "fit-content" }}>
            <IconButton
              sx={{
                fontSize: "40px",
                backgroundColor: "var(--secondary-color)",
                "&:hover": {
                  backgroundColor: "var(--primary-color)",
                },
              }}
            >
              <EditIcon sx={{ color: "white" }} />
            </IconButton>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-4 text-center">
            <div>
              <img
                style={{
                  height: "200px",
                  width: "200px",
                  borderRadius: "100px",
                  border: "5px solid var(--primary-color)",
                }}
                className="profileImg my-4"
                src={
                  profile === ""
                    ? "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                    : profile
                }
                alt=""
              />
            </div>
            <IconButton
              sx={{
                fontSize: "40px",
                backgroundColor: "var(--secondary-color)",
                "&:hover": {
                  backgroundColor: "var(--primary-color)",
                },
              }}
              aria-label="upload picture"
              component="label"
            >
              {/* <Button> */}
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(evt) =>
                  setProfile(URL.createObjectURL(evt.target.files[0]))
                }
              />
              <PhotoCamera sx={{ color: "white" }} />
              {/* Change Photo */}
              {/* </Button> */}
            </IconButton>
          </div>
          <div className="col-sm-12 col-md-8  d-flex flex-column justify-content-center">
            <h1 className="fw-bold"> Satyam Bajpai</h1>
            <p className="">@username</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
