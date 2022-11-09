import React, { useState } from "react";
import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";
import {
  TextField,
  FormControl,
  OutlinedInput,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import background from "../images/background.svg";

function Login({ isSideBarOpen, sidebarToggleHandler }) {
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const handleClickShowPassword = () => {
    setIsPasswordShowing(!isPasswordShowing);
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
        <div className="row loginMainContainer rounded-4 p-3 pb-0 pt-5">
          <div className="col-12 d-flex align-items-center justify-content-center flex-column w-100">
            <div className="row mb-5 flex-column w-100 justify-content-center align-items-center">
              <div className="col-12 text-center">
                <h2 className="mb-5 fw-bolder">Login</h2>
              </div>
              <div className="col-12" style={{ width: "100%" }}>
                <TextField
                  fullWidth
                  label={isChecked ? "Username" : "Email"}
                  type={isChecked ? "text" : "email"}
                  id="fullWidth"
                  variant="outlined"
                />
              </div>
              <div className="col-12 my-4" style={{ width: "100%" }}>
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
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
              <div className="col-12" style={{ width: "100%" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: "var(--primary-color) !important",
                      }}
                      checked={isChecked}
                      onChange={() => {
                        setIsChecked(!isChecked);
                      }}
                      defaultChecked
                    />
                  }
                  label="Login by username"
                />
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
                  Login
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

export default Login;
