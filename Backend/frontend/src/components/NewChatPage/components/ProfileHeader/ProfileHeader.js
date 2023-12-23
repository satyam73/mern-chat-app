import { Box, Typography } from '@mui/material';
import styles from './ProfileHeader.module.css';

const defaultImageSource =
  'https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg';
export default function ProfileHeader({ activeChatUser }) {

  const name = activeChatUser?.name || 'Name';
  const username = activeChatUser?.username ? '@' + activeChatUser?.username : '@username';
  const profileImage = activeChatUser?.profilePic || defaultImageSource;
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
