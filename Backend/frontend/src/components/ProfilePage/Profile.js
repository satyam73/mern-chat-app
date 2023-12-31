import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  Box,
} from "@mui/material";

import EditModal from "./EditModal/EditModal";
import ProfileDetailsHeader from "./ProfileDetailsHeader/ProfileDetailsHeader";
import FriendSection from "./FriendsSection/FriendSection";

import styles from './profilePage.module.css';

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
