import React from 'react';
import { Box, Typography } from '@mui/material';

import { useUser } from '../../../contexts/UserProvider';
import { FALLBACK_PROFILE_IMAGE } from '../../../constants';

import styles from './profileDetailsHeader.module.css';

export default function ProfileDetailsHeader() {
  const { user } = useUser();
  const profileToShow = user?.profilePic || FALLBACK_PROFILE_IMAGE;

  return (
    <Box className={styles['profile-detail-header']}>
      <Box className={styles['profile-detail-header__image']}>
        <img
          className={styles['profile-detail-header__user-image']}
          src={profileToShow}
          alt={user?.name || 'user'}
        />
      </Box>

      <Box className={styles['profile-detail-header__info']}>
        <Typography
          className={styles['profile-detail-header__name']}
          variant='h3'
        >
          {user?.name}
        </Typography>
        <Typography
          className={styles['profile-detail-header__username']}
          variant='body1'
        >
          {`@${user?.username}`}
        </Typography>
      </Box>
    </Box>
  );
}
