import React from 'react';
import { Box, IconButton, Skeleton, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import styles from './tabCard.module.css';
const defaultImage =
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80';

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
          src={profileImg || defaultImage}
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
