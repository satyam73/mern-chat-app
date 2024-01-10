import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import styles from './ProfileCard.module.css';
import { getChatByUserId } from '../../../../services/chat';

const defaultImageSource =
  'https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/profile/user-1.jpg';

export default function ProfileCard({
  userId,
  name,
  profileImage = defaultImageSource,
  isActive,
  onProfileClick,
}) {
  const [lastMessage, setLastMessage] = useState('')
  const [isLastMessageLoading, setIsLastMessageLoading] = useState(true);
  useEffect(() => {
    async function getLastMessage() {
      console.log('last message');
      const query = { limit: 1 };
      setIsLastMessageLoading(true);
      try {
        const { data: { chat }, status } = await getChatByUserId(userId, query);

        console.log(chat)
        if (status === 200) {
          setLastMessage(chat?.[0]?.messages?.[0]?.message);
        }
      } catch (error) {
        console.error('Something went wrong while getting last message ', error)
      } finally {
        setIsLastMessageLoading(false);
      }
    }
    getLastMessage();
  }, []);
  return (
    <Box
      className={`${styles['profile-card']} ${isActive ? styles['profile-card--active'] : ''
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
          {name || 'Loading...'}
        </Typography>
        <Typography
          className={styles['profile-card__last-message']}
          variant='body1'
        >
          {lastMessage || 'Loading...'}
        </Typography>
      </Box>
    </Box>
  );
}
