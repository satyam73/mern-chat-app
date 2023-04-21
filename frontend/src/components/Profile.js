import React, { useState, useContext } from "react";
import Navbar from "../common/Navbar";
import background from "../images/background.svg";
import {
  IconButton,
  Button,
  TextField,
  Modal,
  Box,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import { PhotoCamera, UsbRounded } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import TabCard from "../common/TabCard";
import {
  PROFILE_TABS,
  FRIEND_REQUESTS_API_URL,
  FRIENDS_API_URL,
} from "../constants";
import axios from "axios";
import { UserContext } from "../App";

function EditModal({ showModal, setShowModal }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    color: "black !important",
    boxShadow: 24,
    p: 2,
    pt: 0,
  };
  return (
    <Modal
      open={showModal}
      // onClose={() => setShowModal(false)}
      // aria-labelledby="modal-modal-title"
      // aria-describedby="modal-modal-description"
      sx={{ opacity: 1 }}
    >
      <Box className="container-fluid rounded-3" sx={style}>
        <div className="row justify-content-end">
          <CloseIcon
            sx={{ color: "black", fontSize: "60px", cursor: "pointer" }}
            onClick={() => setShowModal(false)}
          />
        </div>
        <div className="row">
          <h4 className="text-secondary fw-bold text-center">Change Details</h4>
        </div>
        <div className="row justify-content-center">
          <div className="col-6">
            <img
              class="profileImg my-4"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=580&amp;q=80"
              alt=""
              style={{
                height: "150px",
                width: "150px",
                borderRadius: "100px",
                border: "5px solid var(--primary-color)",
              }}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <TextField
              sx={{
                width: "100%",
                "&:after": {
                  borderBottom: "2px solid var(--primary-color)",
                },
              }}
              id="filled-basic"
              label="Name"
              variant="filled"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <TextField
              sx={{
                width: "100%",
                "&:after": {
                  borderBottom: "2px solid var(--primary-color)",
                },
              }}
              id="filled-basic"
              label="Username"
              variant="filled"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <TextField
              sx={{
                width: "100%",
                "&:after": {
                  borderBottom: "2px solid var(--primary-color)",
                },
              }}
              id="filled-basic"
              label="Password"
              variant="filled"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <TextField
              sx={{
                width: "100%",
                "&:after": {
                  borderBottom: "2px solid var(--primary-color)",
                },
              }}
              id="filled-basic"
              label="Confirm Password"
              variant="filled"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <Button
              sx={{
                width: "100%",
                pt: 1.6,
                pb: 1.6,
                fontSize: "15px",
                backgroundColor: "var(--primary-color)",
                "&:hover": {
                  backgroundColor: "var(--secondary-color)",
                },
              }}
              variant="contained"
            >
              Change
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Profile() {
  const [profile, setProfile] = useState("");
  const [isEditPopupShowing, setIsEditPopupShowing] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [tabData, setTabData] = useState([]);
  const [user, setUser] = useContext(UserContext);

  const handleChange = async (e, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) {
      const { data } = await axios.get(FRIENDS_API_URL, {
        withCredentials: true,
      });
      setTabData(data.friends);
      return;
    }
    if (newValue === 1) {
      const { data } = await axios.get(FRIEND_REQUESTS_API_URL("incoming"), {
        withCredentials: true,
      });
      console.log(data);
      setTabData(data.incomingRequests);
      return;
    }
    if (newValue === 2) {
      const { data } = await axios.get(FRIEND_REQUESTS_API_URL("pending"), {
        withCredentials: true,
      });
      console.log(data);
      setTabData(data.pendingRequests);
      return;
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        height: "100vh",
        backgroundPosition: "center",
        backgroundSize: "100%",
      }}
    >
      <EditModal
        showModal={isEditPopupShowing}
        setShowModal={setIsEditPopupShowing}
      />
      <Navbar />
      <div
        className="container-fluid my-2 border rounded-3 bg-white"
        style={{ height: "93vh", width: "96vw", zIndex: -1 }}
      >
        <div className="row justify-content-end mt-3">
          <div className="col-1" style={{ width: "fit-content" }}>
            <IconButton
              onClick={() => setIsEditPopupShowing(true)}
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
            </IconButton>
          </div>
          <div className="col-sm-12 col-md-8  d-flex flex-column justify-content-center">
            <h1 className="fw-bold"> {user?.name || "Not logged in"}</h1>
            <p className="fw-bold">{`@${user?.username}` || "Log in"}</p>
          </div>
        </div>
        <div className="row h-50">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {PROFILE_TABS.map((tab, index) => (
                <Tab label={tab} {...a11yProps(index)} />
              ))}
            </Tabs>
          </Box>
          {PROFILE_TABS.map((tab, index) => (
            <TabPanel className="tabContent" value={tabValue} index={index}>
              {tabData.map((item) => (
                <TabCard
                  id={item._id}
                  name={item.name}
                  profileImg={item.profilePic}
                />
              ))}
            </TabPanel>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
