import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  FormControl,
  OutlinedInput,
  IconButton,
  InputLabel,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useAuth } from "../contexts/AuthProvider";
import { useUser } from "../contexts/UserProvider";
import { SIGNIN_URL } from "../constants";

import Navbar from "../common/Navbar";
import Loader from "../common/Loader";

import background from "../images/background.svg";

export default function Login() {
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loginDetails, setLoginDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setIsLoading: setIsUserLoading } = useUser();
  const { isLoggedIn, isLoading: isAuthLoading } = useAuth();

  useEffect(() => {
    function redirectLoggedInUser() {
      if (isLoggedIn && !isAuthLoading) {
        navigate('/chat');
      }
    }

    redirectLoggedInUser();
  }, []);

  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const [success, setSuccess] = useState({
    isSuccess: false,
    message: "",
  });
  const handleClickShowPassword = () => {
    setIsPasswordShowing(!isPasswordShowing);
  };

  const inputChangeHandler = (evt) => {
    const field = evt.target.name;
    const value = evt.target.value;
    setLoginDetails({ ...loginDetails, [field]: value });
  };

  const submitHandler = async (evt) => {
    setIsLoading(true);
    setIsUserLoading(true)
    const { email, username, password } = loginDetails;
    if (isChecked) {
      if (!username || !password) {
        setError({
          isError: true,
          message: "Please fill all the details!",
        });
        return;
      }
    } else {
      if (!email || !password) {
        setError({
          isError: true,
          message: "Please fill all the details!",
        });
        return;
      }
    }

    try {
      const { data, status } = await axios.post(
        SIGNIN_URL,
        { email, username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (status === 200) {
        setUser(data);
        setSuccess({ isSuccess: true, message: "Login Successfully!" });

      }

      setTimeout(() => navigate("/chat"), 1000);
    } catch (err) {
      setError({
        isError: true,
        message: err.message,
      });
      console.error("Error in login : ", err.message);
    } finally {
      setIsLoading(false);
      setIsUserLoading(false);
    }
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
      <Navbar />
      <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{ height: "92vh", width: "99vw" }}
      >
        <Snackbar
          open={error.isError}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          // key={{ vertical: "bottom" } + { horizontal: "center" }}
          onClose={() =>
            setSuccess({
              isSuccess: false,
              message: "",
            })
          }
        >
          <Alert
            onClose={() =>
              setSuccess({
                isSuccess: false,
                message: "",
              })
            }
            severity="success"
            sx={{ width: "100%" }}
          >
            {success.message}
          </Alert>
        </Snackbar>
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
                  name={isChecked ? "username" : "email"}
                  id="fullWidth"
                  variant="outlined"
                  onChange={inputChangeHandler}
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
                    onChange={inputChangeHandler}
                    name="password"
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
                  onClick={submitHandler}
                  disabled={isLoading}
                  sx={{
                    width: "50%",
                    fontSize: "17px",
                    p: 1,
                    backgroundColor: "var(--primary-color)",
                    "&:hover": {
                      backgroundColor: "var(--secondary-color)",
                    },
                    "&:disabled": {
                      opacity: 0.5,
                      backgroundColor: "var(--primary-color)",
                    }
                  }}
                >
                  {isLoading ? <Loader /> : "Login"}
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

