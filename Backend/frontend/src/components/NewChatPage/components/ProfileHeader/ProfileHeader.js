import { Box, Typography } from '@mui/material';
import styles from './ProfileHeader.module.css';

const defaultImageSource =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
export default function ProfileHeader({ user }) {
  const name = user?.name || 'Name';
  const username = user?.username ? '@' + user?.username : '@username';
  const profileImage = user?.profilePic || defaultImageSource;
  return (
    <Box className={styles['profile-header']}>
      <img
        className={styles['profile-header__image']}
        src={profileImage}
        alt=''
      />
      <Box className={styles['profile-header__info']}>
        <Typography className={styles['profile-header__name']} variant='body1'>
          {name}
        </Typography>
        <Typography
          className={styles['profile-header__username']}
          variant='body1'
        >
          {username || '@satyam'}
        </Typography>
      </Box>
    </Box>
  );
}
