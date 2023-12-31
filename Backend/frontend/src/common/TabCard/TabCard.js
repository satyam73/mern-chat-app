import React from 'react';
import { IconButton, Skeleton, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { ACCEPT_FRIEND_REQUEST_URL } from '../../constants';
import styles from './tabCard.module.css';
const defaultImage =
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80';

function TabCard({ id, tabValue, isLoading, name, profileImg }) {
  const shouldShowActions = tabValue === 1;
  const acceptHandler = async (e, id) => {
    const { data, status } = await axios.put(
      ACCEPT_FRIEND_REQUEST_URL(id),
      {},
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
  };

  const rejectHandler = (e, id) => {
    console.log(e);
  };

  const skeletonMapping = Array(1)
    .fill('skeleton')
    .map((element, idx) => {
      return (
        <Skeleton
          key={element + '-' + idx}
          sx={{ margin: '10px 0' }}
          variant='rounded'
          width={'100%'}
          height={50}
        />
      );
    });

  if (isLoading) return skeletonMapping;

  return (
    <div className={styles['tab-card']}>
      <div className={styles['tab-card__details']}>
        <img
          className={styles['tab-card__image']}
          src={profileImg || defaultImage}
          alt=''
        />
        <Typography component='span' className={styles['tab-card__username']}>
          {name || 'No user'}
        </Typography>
      </div>
      {shouldShowActions && (
        <div className={styles['tab-card__actions']}>
          <IconButton
            className={styles['tab-card__accept-button']}
            aria-label='accept'
            onClick={(e) => acceptHandler(e, id)}
          >
            <DoneIcon className={styles['tab-card__accept-icon']} />
          </IconButton>
          <IconButton
            className={styles['tab-card__reject-button']}
            aria-label='reject'
            onClick={(e) => rejectHandler(e, id)}
          >
            <CloseIcon className={styles['tab-card__reject-icon']} />
          </IconButton>
        </div>
      )}
    </div>
  );
}

export default TabCard;
