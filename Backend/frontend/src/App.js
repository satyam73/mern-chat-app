import React, { useState, createContext, useEffect } from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Chat from './components/Chat';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/ProfilePage/Profile';
import Auth from './common/Auth';
import './global.css';
import { USER_DETAILS_URL } from './constants';
import axios from 'axios';
import NewChatPage from './components/NewChatPage/NewChatPage';
import Layout from './common/Layout';
import NewProfilePage from './components/NewProfilePage/NewProfilePage';
import ToastProvider from './common/Toast';
export const ErrorContext = createContext();

export const UserContext = createContext({});

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [user, setUser] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isDev = Boolean(searchParams.get('dev'));
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

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(USER_DETAILS_URL, {
        withCredentials: true,
      });

      setUser({ ...data.user });
    })();
  }, []);

  function sidebarToggleHandler(evt) {
    setIsSideBarOpen(!isSideBarOpen);
  }

  return (
    <ToastProvider>
      <UserContext.Provider value={[user, setUser]}>
        <div className='App'>
          {/* <Router> */}
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
                <Auth
                  // Component={
                  //   <Chat
                  //     sidebarToggleHandler={sidebarToggleHandler}
                  //     isSideBarOpen={isSideBarOpen}
                  //   />
                  // }

                  Component={
                    isDev ? (
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
                    ) : (
                      <Chat
                        sidebarToggleHandler={sidebarToggleHandler}
                        isSideBarOpen={isSideBarOpen}
                      />
                    )
                  }
                />
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
                isDev ? (
                  <Layout
                    goToAllChats={goToAllChats}
                    sidebarToggleHandler={sidebarToggleHandler}
                  >
                    <NewProfilePage />
                  </Layout>
                ) : (
                  <Layout
                    goToAllChats={goToAllChats}
                    sidebarToggleHandler={sidebarToggleHandler}
                  >
                    <Profile
                      sidebarToggleHandler={sidebarToggleHandler}
                      isSideBarOpen={isSideBarOpen}
                    />
                  </Layout>
                )
              }
              path='/profile'
            />
          </Routes>
          {/* </Router> */}
        </div>
      </UserContext.Provider>
    </ToastProvider>
  );
}

export default App;
