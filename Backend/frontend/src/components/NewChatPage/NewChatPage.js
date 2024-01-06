import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';

import { getChatByUserId, getFriends } from '../../services/chat';
import { useUser } from '../../contexts/UserProvider';
import { debounce } from '../../utils';

import { BACKEND_BASE_URL } from '../../constants';

import ProfileHeader from './components/ProfileHeader/ProfileHeader';
import ProfileCard from './components/ProfileCard/ProfileCard';
import ChatMessagesList from './components/ChatMessagesList/ChatMessagesList';
import SidebarSearchBar from './components/SidebarSearchBar/SidebarSearchBar';
import ChatInput from './components/ChatInput/ChatInput';
import NoDataFoundFallback from '../../common/NoDataFoundFallback';

import '../styles/NewChatPage.css';

const socket = io(BACKEND_BASE_URL, {
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionDelay: 1000,
});

export default function NewChatPage({ activeChatUserId, setActiveChatUserId, activeChatUser, setActiveChatUser, activeChatId, setActiveChatId, isChatActive, setIsChatActive }) {
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const { user } = useUser();
  const [friendsToShowOnUi, setFriendsToShowOnUi] = useState([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(true);
  const isNoFriendsFound = friendsToShowOnUi.length === 0;
  const searchInputHandler = debounce(onSearchInput);
  const isMobileScreen = useMediaQuery('(max-width: 1007px)', { defaultMatches: null });

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
      setFriendsToShowOnUi(friends);
    })();
  }, []);

  function onSearchInput(event) {
    const sanitizedInput = event.target.value.trim();

    if (!sanitizedInput) {
      setFriendsToShowOnUi(friends);
      return;
    }

    const filteredFriends = friends.filter((friend) => friend.name.includes(sanitizedInput) || friend.username.includes(sanitizedInput));

    setFriendsToShowOnUi(filteredFriends);
  }

  const profileMapping = friendsToShowOnUi.map((friend, idx) => (
    <ProfileCard
      name={friend.name}
      profileImage={friend.profilePic}
      isActive={friend._id === activeChatUserId}
      onProfileClick={(e) => profileClickHandler(e, friend)}
      key={friend._id}
    />
  ));

  async function profileClickHandler(e, user) {
    setIsChatActive(true);
    setIsMessagesLoading(true);
    socket.disconnect();
    socket.connect();
    setActiveChatUser(user);
    setActiveChatUserId(user._id);

    try {
      const { chat } = await getChatByUserId(user._id);
      const chatId = chat?.[0]?._id;
      const messages = chat?.[0]?.messages;

      setActiveChatId(chatId);
      setMessages(messages);
      if (socket.connected) {
        socket.emit("joining", chatId);
        console.log("connected to socket.io");
      }
    } catch (error) {
      console.error('Some error occured while fetching messages ', error);
    } finally {
      setIsMessagesLoading(false);
    }

  }

  return (
    <Box className='chat-container'>
      <Box className='chat-container__main'>
        {isMobileScreen ?
          <>
            <Box className={`chat-container__sidebar ${isChatActive ? 'chat-container__sidebar--hidden' : 'chat-container__sidebar--visible'}`}>
              <ProfileHeader user={user} />
              <SidebarSearchBar onSearchInput={searchInputHandler} />
              <Box className='chat-container__friend-list'>

                {isNoFriendsFound ?
                  <NoDataFoundFallback /> :
                  profileMapping}
              </Box>
            </Box>
            <Box className={`chat-container__chat-section ${isChatActive ? 'chat-container__chat-section--visible' : 'chat-container__chat-section--hidden'}`}>
              <ProfileHeader user={activeChatUser} />
              <hr className='chat-container__separator' />
              <Box className={'chat-container__message-section'}>
                <ChatMessagesList isMessagesLoading={isMessagesLoading} activeChatUserId={activeChatUserId} messages={messages} />
              </Box>
              <Box className='chat-container__input-wrapper'>
                <ChatInput activeChatUserId={activeChatUserId} activeChatId={activeChatId} setMessages={setMessages} socket={socket} />
              </Box>
            </Box>
          </>
          :
          <>
            <Box className='chat-container__sidebar'>
              <ProfileHeader user={user} />
              <SidebarSearchBar onSearchInput={searchInputHandler} />
              <Box className='chat-container__friend-list'> {isNoFriendsFound ?
                <NoDataFoundFallback /> :
                profileMapping}</Box>
            </Box>
            <Box className='chat-container__chat-section'>
              <ProfileHeader user={activeChatUser} />
              <hr className='chat-container__separator' />
              <Box className={'chat-container__message-section'}>
                <ChatMessagesList activeChatUserId={activeChatUserId} messages={messages} />
              </Box>
              <Box className='chat-container__input-wrapper'>
                <ChatInput activeChatUserId={activeChatUserId} activeChatId={activeChatId} setMessages={setMessages} socket={socket} />
              </Box>
            </Box>
          </>
        }
      </Box >
    </Box >
  );
}
