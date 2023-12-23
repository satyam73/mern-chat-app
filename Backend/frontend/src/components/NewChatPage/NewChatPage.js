import axios from 'axios';
import { Box } from '@mui/material';
import '../styles/NewChatPage.css';
import ProfileHeader from './components/ProfileHeader/ProfileHeader';
import SidebarSearchBar from './components/SidebarSearchBar/SidebarSearchBar';
import ProfileCard from './components/ProfileCard/ProfileCard';
import { useContext, useEffect, useState } from 'react';
import ChatInput from './components/ChatInput/ChatInput';
import ChatMessagesList from './components/ChatMessagesList/ChatMessagesList';
import { BACKEND_BASE_URL, FRIENDS_API_URL } from '../../constants';
import { io } from 'socket.io-client';
import { getChatByUserId, getFriends } from '../../services/chat';
import { UserContext } from '../../App';

const socket = io(BACKEND_BASE_URL, {
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionDelay: 1000,
});
export default function NewChatPage() {
  const [activeChatUserId, setActiveChatUserId] = useState(null);
  const [activeChatUser, setActiveChatUser] = useState(null)
  const [activeChatId, setActiveChatId] = useState();
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [user] = useContext(UserContext);

  useEffect(() => {
    const onMessageReceive = (message) => {
      if (activeChatId && (message.chat === activeChatId) && (message.sender !== user._id)) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    }
    socket.on("receive-message", onMessageReceive);

    return () => socket.off('receive-message', onMessageReceive);
  }, [activeChatId]);

  useEffect(() => {
    (async () => {
      const friends = await getFriends();
      setFriends(friends);
    })();
  }, []);

  const profileMapping = friends.map((friend, idx) => (
    <ProfileCard
      name={friend.name}
      profileImage={friend.profilePic}
      isActive={friend._id === activeChatUserId}
      onProfileClick={(e) => profileClickHandler(e, friend)}
      key={friend._id}
    />
  ));

  async function profileClickHandler(e, user) {
    socket.disconnect();
    socket.connect();
    setActiveChatUser(user);
    setActiveChatUserId(user._id);

    const { chat } = await getChatByUserId(user._id);
    const chatId = chat?.[0]?._id;
    const messages = chat?.[0]?.messages;

    setActiveChatId(chatId);
    setMessages(messages);

    if (socket.connected) {
      socket.emit("joining", chatId);
      console.log("connected to socket.io");
    }
  }




  return (
    <Box className='chat-container'>
      <Box className='chat-container__main'>
        <Box className='chat-container__sidebar'>
          <ProfileHeader />
          <SidebarSearchBar />
          <Box className='chat-container__friend-list'>{profileMapping}</Box>
        </Box>
        <Box className='chat-container__chat-section'>
          <ProfileHeader activeChatUser={activeChatUser} />
          <hr className='chat-container__separator' />
          <Box className={'chat-container__message-section'}>
            <ChatMessagesList activeChatUserId={activeChatUserId} messages={messages} />
          </Box>
          <Box className='chat-container__input-wrapper'>
            <ChatInput activeChatUserId={activeChatUserId} activeChatId={activeChatId} setMessages={setMessages} socket={socket} />
          </Box>
        </Box>
      </Box >
    </Box >
  );
}
