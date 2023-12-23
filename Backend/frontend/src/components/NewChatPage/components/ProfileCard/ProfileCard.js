import { Box, Typography } from '@mui/material';
import styles from './ProfileCard.module.css';

const defaultImageSource =
  'https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg';

export default function ProfileCard({
  name,
  lastMessage,
  profileImage = defaultImageSource,
  isActive,
  onProfileClick,
}) {
  return (
    <Box
      className={`${styles['profile-card']} ${
        isActive ? styles['profile-card--active'] : ''
      }`}
      onClick={onProfileClick}
    >
      <img
        className={styles['profile-card__image']}
        src={profileImage}
        alt='user'
      />
      <Box className={styles['profile-card__info']}>
        <Typography className={styles['profile-card__name']} variant='body1'>
          {name || 'Abhinav Jaiswal'}
        </Typography>
        <Typography
          className={styles['profile-card__last-message']}
          variant='body1'
        >
          {lastMessage || ' Hi there'}
        </Typography>
      </Box>
    </Box>
  );
}
