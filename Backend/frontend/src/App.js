import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

// bootstrap styles
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import UserProvider from './contexts/UserProvider';
import ToastProvider from './contexts/Toast';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/ProfilePage/Profile';
import AuthProvider from './contexts/AuthProvider';
import NewChatPage from './components/NewChatPage/NewChatPage';
import Layout from './common/Layout';

import './global.css';
import './App.css';

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [activeChatUserId, setActiveChatUserId] = useState(null);
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null);
  const [isChatActive, setIsChatActive] = useState(false);

  function goToAllChats() {
    setIsChatActive(false);
    setActiveChatUserId('');
    setActiveChatUser({});
    setActiveChatId('');
  }

  function sidebarToggleHandler(evt) {
    setIsSideBarOpen(!isSideBarOpen);
  }

  return (
    <ToastProvider>
      <UserProvider>
        <Box className='App'>
          <Routes>
            <Route
              element={
                <Home
                  sidebarToggleHandler={sidebarToggleHandler}
                  isSideBarOpen={isSideBarOpen}
                />
              }
              path='/'
            />
            <Route
              element={
                <AuthProvider>
                  <Layout
                    goToAllChats={goToAllChats}
                    sidebarToggleHandler={sidebarToggleHandler}
                  >
                    <NewChatPage
                      setActiveChatUserId={setActiveChatUserId}
                      activeChatUserId={activeChatUserId}
                      activeChatUser={activeChatUser}
                      setActiveChatUser={setActiveChatUser}
                      activeChatId={activeChatId}
                      setActiveChatId={setActiveChatId}
                      setIsChatActive={setIsChatActive}
                      isChatActive={isChatActive}
                    />
                  </Layout>
                </AuthProvider>
              }
              path='/chat'
            />
            <Route
              element={
                <Register
                  sidebarToggleHandler={sidebarToggleHandler}
                  isSideBarOpen={isSideBarOpen}
                />
              }
              path='/register'
            />
            <Route
              element={
                <Login
                  sidebarToggleHandler={sidebarToggleHandler}
                  isSideBarOpen={isSideBarOpen}
                />
              }
              path='/login'
            />
            <Route
              element={
                <AuthProvider>
                  <Layout
                    goToAllChats={goToAllChats}
                    sidebarToggleHandler={sidebarToggleHandler}
                  >
                    <Profile
                      sidebarToggleHandler={sidebarToggleHandler}
                      isSideBarOpen={isSideBarOpen}
                    />
                  </Layout>
                </AuthProvider>
              }
              path='/profile'
            />
          </Routes>
        </Box>
      </UserProvider>
    </ToastProvider>
  );
}

export default App;
