import React, { useState } from "react";
import {
  Box,
} from "@mui/material";

import ProfileDetailsHeader from "./ProfileDetailsHeader/ProfileDetailsHeader";
import FriendSection from "./FriendsSection/FriendSection";

import styles from './profilePage.module.css';

function Profile() {
  return (
    <>
      <Box
        className={styles['profile-page']}
      >
        <Box className={styles['profile-page__main']}>
          <ProfileDetailsHeader />
          <FriendSection />
        </Box>
      </Box >
    </>
  );
}

export default Profile;
