import React, { useState } from "react";
import {
  Box,
} from "@mui/material";

import ProfileDetailsHeader from "./ProfileDetailsHeader/ProfileDetailsHeader";
import FriendSection from "./FriendsSection/FriendSection";

import styles from './profilePage.module.css';

function Profile() {
  const [profile, setProfile] = useState("");

  return (
    <>
      <Box
        className={styles['profile-page']}
      >
        <Box className={styles['profile-page__main']}>
          <ProfileDetailsHeader profile={profile}
            setProfile={setProfile} />
          <FriendSection />
        </Box>
      </Box >
    </>
  );
}

export default Profile;
