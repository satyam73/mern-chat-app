import { Box, Skeleton } from "@mui/material";
import styles from './ChatMessagesList.module.css';
import Message from "../../../../common/Message/Message";
import { useEffect, useRef } from "react";
import { useUser } from "../../../../contexts/UserProvider";

export default function ChatMessagesList({ isMessagesLoading, activeChatUserId, messages }) {
  const { user } = useUser();
  const lastMessageRef = useRef();
  const userId = user?._id;
  const lastMessageIndex = messages?.length - 1;

  useEffect(() => {
    const scrollToLastMessage = () => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'instant' })
    }

    const timeout = setTimeout(scrollToLastMessage, 500);
    scrollToLastMessage()
    return () => clearTimeout(timeout);
  }, [activeChatUserId, messages]);



  const messagesMapping = messages?.map((message, idx) => (message.sender === userId) ? (<Message messageRef={idx === lastMessageIndex ? lastMessageRef : null} className={'right'} message={message.message} key={message._id} />) : (<Message messageRef={idx === lastMessageIndex ? lastMessageRef : null} className={'left'} message={message.message} key={message._id} />)
  );

  const skeletonMapping = Array(10).fill('messages-skeleton').map((element, idx) => {
    return <Skeleton
      sx={{ margin: '10px 0' }}
      className={idx % 4 ? 'left' : 'right'}
      key={element + '-' + idx}
      variant='rounded'
      width={'20%'}
      height={28} />
  });

  return (
    <Box className={styles['chat-list']
    }>

      {isMessagesLoading ? skeletonMapping : messagesMapping}
    </Box >
  )
}