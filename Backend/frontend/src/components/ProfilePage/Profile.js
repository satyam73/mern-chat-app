import axios from "axios";
import React, { useState, useContext } from "react";
import { PhotoCamera } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  Box,
} from "@mui/material";
import { UserContext } from "../../App";
import EditModal from "./EditModal/EditModal";

import styles from './profilePage.module.css';
import ProfileDetailsHeader from "./ProfileDetailsHeader/ProfileDetailsHeader";
import FriendSection from "./FriendsSection/FriendSection";

function Profile() {
  const [profile, setProfile] = useState("");
  const [isEditPopupShowing, setIsEditPopupShowing] = useState(false);

  return (
    <>
      <EditModal
        showModal={isEditPopupShowing}
        setShowModal={setIsEditPopupShowing}
        profile={profile}
        setProfile={setProfile}
      />
      <Box
        className={styles['profile-page']}
      >
        <Box className={styles['profile-page__main']}>
          <IconButton
            className={styles['profile-page__edit-button']}
            onClick={() => setIsEditPopupShowing(true)}
          >
            <EditIcon fontSize="medium" />
          </IconButton>
          <ProfileDetailsHeader profile={profile}
            setProfile={setProfile} />
          <FriendSection />
        </Box>
      </Box >
    </>
  );
}

export default Profile;
