import { Box, Typography } from '@mui/material';
import styles from './noChatSelected.module.css';

export default function NoChatSelected() {
  return (
    <Box className={styles['no-chat-selected-container']}>
      <img
        className={styles['no-chat-selected-container__image']}
        src='/assets/begin-chat.svg'
        alt='not chat selected'
      />
      <Typography
        className={styles['no-chat-selected-container__text']}
        variant='h4'
      >
        Select your contact to start conversation
      </Typography>
    </Box>
  );
}
