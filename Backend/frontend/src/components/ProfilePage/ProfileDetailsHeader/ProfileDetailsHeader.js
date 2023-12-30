import { Box, Typography } from '@mui/material';
import React, { useContext } from 'react';
import styles from './profileDetailsHeader.module.css';
import { UserContext } from '../../../App';

export default function ProfileDetailsHeader({ profile }) {
  const [user] = useContext(UserContext);

  return (
    <Box className={styles['profile-detail-header']}>
      <Box className={styles['profile-detail-header__image']}>
        <img
          style={{
            height: '200px',
            width: '200px',
            borderRadius: '100px',
            border: '5px solid var(--primary-color)',
          }}
          className={styles['profile-detail-header__user-image']}
          src={
            profile === ''
              ? 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
              : profile
          }
          alt='user'
        />
      </Box>

      <Box className={styles['profile-detail-header__info']}>
        <Typography
          className={styles['profile-detail-header__name']}
          variant='h3'
        >
          {user?.name || 'Not logged in'}
        </Typography>
        <Typography
          className={styles['profile-detail-header__username']}
          variant='body1'
        >
          {`@${user?.username}` || 'Log in'}
        </Typography>
      </Box>
    </Box>
  );
}
