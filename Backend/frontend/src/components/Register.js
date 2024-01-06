import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  FormControl,
  OutlinedInput,
  IconButton,
  InputLabel,
  InputAdornment,
  Snackbar,
  Alert,
  Button,
  Typography,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

import { REGISTER_URL } from "../constants";
import { useAuth } from "../contexts/AuthProvider";

import Navbar from "../common/Navbar";
import Loader from "../common/Loader";

import background from "../images/background.svg";


function Register() {
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [picName, setPicName] = useState("");
  const { isLoggedIn, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate()

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
    message: "no error!",
  });
  const [success, setSuccess] = useState({
    isSuccess: false,
    message: "",
  });
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

  const imageChangeHandler = async (evt) => {
    const image = evt.target.files[0];
    if (!image) {
      setError({
        isError: true,
        message: "Please select image to proceed!",
      });
      return;
    }
    try {
      const type = image.type;
      if (type === "image/png" || type === "image/jpeg") {
        setIsLoading(true);
        const imageFile = new FormData();

        imageFile.append("file", image);
        imageFile.append("upload_preset", "chat-app");
        imageFile.append("cloud_name", "dl5pqfdrf");
        imageFile.append("tags", [
          "chat-app",
          "userPic",
          "profile",
          "profilePic",
        ]);
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dl5pqfdrf/image/upload",
          {
            method: "post",
            body: imageFile,
          }
        );
        const data = await response.json();
        const { status } = response;
        const { url } = data;
        if (status === 200) {
          setRegisterDetails({
            ...registerDetails,
            profilePic: url,
          });
          setPicName(image.name);
        } else {
          setError({
            isError: true,
            message: "Error : Picture uploading unsuccessful!",
          });
        }
      } else {
        setError({
          isError: true,
          message: "Please use png or jpg format photo!",
        });
      }
    } catch (err) {
      setError({
        isError: true,
        message: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const submitHandler = async (evt) => {
    const { name, email, username, profilePic, password, confirmPassword } =
      registerDetails;
    if (
      !name ||
      !email ||
      !username ||
      !profilePic ||
      !password ||
      !confirmPassword
    ) {
      setError({
        isError: true,
        message: "Please fill all the details!",
      });
      return;
    }

    if (password !== confirmPassword) {
      setError({
        isError: true,
        message: "Password is not matching!",
      });
      return;
    }

    try {
      const { data } = await axios.post(
        REGISTER_URL,
        { name, email, username, profilePic, password, confirmPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess({
        isSuccess: true,
        message: "Account created successfully!",
      });
    } catch (err) {
      const {
        response: {
          data: { message },
        },
      } = err;
      console.error("Error: ", err.message);
      setError({
        isError: true,
        message: message,
      });
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
                  {isLoading ? (
                    <>
                      <Loader /> Uploading
                    </>
                  ) : (
                    "Click to upload"
                  )}
                  <input
                    onChange={imageChangeHandler}
                    name="profilePic"
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                  />
                </Button>
                <span className="ms-1 fw-bold">{picName}</span>
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
                  onClick={submitHandler}
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
