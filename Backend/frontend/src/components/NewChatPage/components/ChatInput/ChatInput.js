import EmojiPicker from 'emoji-picker-react';
import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

import socket from '../../../../services/socket';
import { sendMessage } from '../../../../services/chat';
import { useUser } from '../../../../contexts/UserProvider';

import styles from './ChatInput.module.css';
import { throttle } from '../../../../utils';

export default function ChatInput({
  activeChatUserId,
  setMessages,
  activeChatId,
}) {
  const [isEmojiPanelVisible, setIsEmojiPanelVisible] = useState(false);
  const chatInputRef = useRef(null);
  const { user } = useUser();
  const onMessageSendThrottled = throttle(onMessageSend, 1500);

  useEffect(() => {
    const onKeyPress = (e) => {
      if (e.keyCode !== 13) return;
      onMessageSendThrottled();
    };

    document.addEventListener('keydown', onKeyPress);

    return () => document.removeEventListener('keydown', onKeyPress);
  }, [activeChatUserId, activeChatId]);

  function emojiClickHandler(emojiObject, event) {
    chatInputRef.current.focus();

    chatInputRef.current.value = `${chatInputRef.current.value}${emojiObject.emoji}`;
  }

  async function onMessageSend() {
    const sanitizedValue = chatInputRef.current.value.trim();
    chatInputRef.current.value = '';
    if (!sanitizedValue) return;

    const payload = {
      senderId: user._id,
      receiverId: activeChatUserId,
      message: sanitizedValue,
      chatId: activeChatId,
    };

    try {
      const {
        data: { message },
        status,
      } = await sendMessage(payload);

      if (status !== 201) return;

      socket.emit('send-message', message);

      setMessages((prevMessages) => [...prevMessages, message]);
      chatInputRef.current.value = '';
    } catch (error) {
      console.error('Some error occured while sending message', error);
    }
  }

  return (
    <Box className={styles['chat-input-container']}>
      {isEmojiPanelVisible && (
        <Box className={styles['chat-input-container__emoji-panel']}>
          <EmojiPicker
            onEmojiClick={emojiClickHandler}
            skinTonesDisabled={true}
            searchPlaceholder={'Search your emoji!'}
          />
        </Box>
      )}
      <IconButton
        onClick={() => {
          setIsEmojiPanelVisible((prevState) => !prevState);
        }}
        className='chat-input-container__emoji-button'
      >
        <InsertEmoticonIcon fontSize='medium' />
      </IconButton>
      <input
        className={styles['chat-input-container__input']}
        type='text'
        placeholder='Type your message'
        name='chatInputValue'
        ref={chatInputRef}
        aria-label='chat input'
      />
      <IconButton
        onClick={onMessageSendThrottled}
        className={styles['chat-input-container__send-button']}
      >
        <SendIcon fontSize='medium' />
      </IconButton>
    </Box>
  );
}
