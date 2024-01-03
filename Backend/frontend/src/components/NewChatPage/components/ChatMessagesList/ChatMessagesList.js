import { Box } from "@mui/material";
import styles from './ChatMessagesList.module.css';
import Message from "../../../../common/Message";
import { useEffect, useRef } from "react";
import { useUser } from "../../../../contexts/UserProvider";

export default function ChatMessagesList({ activeChatUserId, messages }) {
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

  return (
    <Box className={styles['chat-list']
    }>

      {messagesMapping}
    </Box >
  )
}