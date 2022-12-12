import React, { useState } from "react";
import Navbar from "../common/Navbar";
// import Sidebar from "../common/Sidebar";
import {
  TextField,
  FormControl,
  OutlinedInput,
  IconButton,
  //   Input,
  InputLabel,
  InputAdornment,
  //   FormControlLabel,
  //   Checkbox,
  Button,
  Typography,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import background from "../images/background.svg";
// import loader from "../images/loading,gif"
function Register({ isSideBarOpen, sidebarToggleHandler }) {
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);
  const [pic, setPic] = useState("");
  const [registerDetails, setRegisterDetails] = useState({
    name: "",
    email: "",
    username: "",
    profilePic: "",
    password: "",
    confirmPassword: "",
  });
  const handleClickShowPassword = () => {
    setIsPasswordShowing(!isPasswordShowing);
  };
  const inputChangeHandler = (evt) => {
    setRegisterDetails({
      ...registerDetails,
      [evt.target.name]: evt.target.value,
    });
  };
  return (
    <div
      className="login bg-light"
      style={{
        backgroundImage: `url(${background})`,
        height: "100vh",
        backgroundPosition: "center",
        backgroundSize: "90%",
      }}
    >
      <Navbar sidebarToggleHandler={sidebarToggleHandler} />
      {/* <Sidebar isSideBarOpen={isSideBarOpen} /> */}
      <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{ height: "92vh", width: "99vw" }}
      >
        <div className="row registerMainContainer rounded-4 p-3 pb-0 pt-5">
          <div className="col-12 d-flex align-items-center justify-content-center flex-column w-100">
            <div className="row mb-5 flex-column w-100 justify-content-center align-items-center">
              <div className="col-12 text-center">
                <h2 className="mb-5 fw-bolder">Create Account</h2>
              </div>
              <div className="col-12" style={{ width: "100%" }}>
                <TextField
                  fullWidth
                  label="Name"
                  type="text"
                  // id="fullWidth"
                  variant="outlined"
                  name="name"
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="col-12 mt-2" style={{ width: "100%" }}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  // id="fullWidth"
                  variant="outlined"
                  name="email"
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="col-12 mt-2" style={{ width: "100%" }}>
                <TextField
                  fullWidth
                  label="Username"
                  type="text"
                  // id="fullWidth"
                  variant="outlined"
                  name="username"
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="col-12 mt-4" style={{ width: "100%" }}>
                <Typography
                  sx={{ font: "inherit" }}
                  className="fw-bolder"
                  variant="subtitle1"
                  component="div"
                >
                  Upload Profile Picture
                </Typography>
                <Button
                  sx={{
                    backgroundColor: "var(--primary-color)",
                    "&:hover": {
                      backgroundColor: "var(--secondary-color)",
                    },
                  }}
                  variant="contained"
                  component="label"
                >
                  Click to upload
                  <input
                    onChange={(evt)=>{
                      console.log(evt.target.files[0]);
                      const image = evt.target.files[0];
                      // if(!image){
                        
                      // }
                      
                    }}
                    name="profilePic"
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                  />
                </Button>
                {/* <img src="loader" alt="" /> */}
              </div>
              <div className="col-12 mt-4" style={{ width: "100%" }}>
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    onChange={inputChangeHandler}
                    name="password"
                    fullWidth
                    id="outlined-adornment-password"
                    type={isPasswordShowing ? "text" : "password"}
                    // value={"hello"}
                    // onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleClickShowPassword}
                          edge="end"
                        >
                          {isPasswordShowing ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </div>
              <div className="col-12 mt-2" style={{ width: "100%" }}>
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-c-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    onChange={inputChangeHandler}
                    name="confirmPassword"
                    fullWidth
                    id="outlined-adornment-c-password"
                    type="password"
                    label="Password"
                  />
                </FormControl>
              </div>
              <div
                className="col-12 text-center mt-3"
                style={{ width: "100%" }}
              >
                <Button
                  size="medium"
                  variant="contained"
                  sx={{
                    width: "50%",
                    fontSize: "17px",
                    p: 1,
                    backgroundColor: "var(--primary-color)",
                    "&:hover": {
                      backgroundColor: "var(--secondary-color)",
                    },
                  }}
                >
                  Register
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Register;
