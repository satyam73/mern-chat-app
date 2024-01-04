import React from 'react';
import { Box, IconButton, Skeleton, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import styles from './tabCard.module.css';
import { FALLBACK_PROFILE_IMAGE } from '../../constants';

function TabCard({
  id,
  tabValue,
  name,
  profileImg,
  rejectFriendRequestHandler,
  acceptFriendRequestHandler,
}) {
  const shouldShowActions = tabValue === 1;

  return (
    <Box className={styles['tab-card']}>
      <Box className={styles['tab-card__details']}>
        <img
          className={styles['tab-card__image']}
          src={profileImg || FALLBACK_PROFILE_IMAGE}
          alt=''
        />
        <Typography component='span' className={styles['tab-card__username']}>
          {name || 'No user'}
        </Typography>
      </Box>
      {shouldShowActions && (
        <Box className={styles['tab-card__actions']}>
          <IconButton
            className={styles['tab-card__accept-button']}
            aria-label='accept'
            onClick={(e) => acceptFriendRequestHandler(e, id)}
          >
            <DoneIcon className={styles['tab-card__accept-icon']} />
          </IconButton>
          <IconButton
            className={styles['tab-card__reject-button']}
            aria-label='reject'
            onClick={(e) => rejectFriendRequestHandler(e, id)}
          >
            <CloseIcon className={styles['tab-card__reject-icon']} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}

export default TabCard;
