const BACKEND_BASE_URL = 'https://convo-q1bf.onrender.com'
// const BACKEND_BASE_URL = 'http://localhost:5000'


const SIGNIN_URL = `${BACKEND_BASE_URL}/api/user/login`;
const REGISTER_URL = `${BACKEND_BASE_URL}/api/user/register`;
const SIGNOUT_URL = `${BACKEND_BASE_URL}/api/user/signout`;
const USER_DETAILS_URL = `${BACKEND_BASE_URL}/api/user`;
const SEND_API_URL = `${BACKEND_BASE_URL}/api/messages`;
const FRIENDS_API_URL = `${BACKEND_BASE_URL}/api/user/friends`;

const SEARCH_API_URL = (username) => {
  return `${BACKEND_BASE_URL}/api/user/search/${username}`;
};

const SEND_FRIEND_REQUEST_URL = (userId) => {
  return `${BACKEND_BASE_URL}/api/user/${userId}/friend-request`;
};

const ACCEPT_FRIEND_REQUEST_URL = (userId) => {
  return `${BACKEND_BASE_URL}/api/user/${userId}/friend-request/accept`;
};

const GET_CHAT_BY_USERID = (userId, query) => {
  const limit = query?.limit;

  if (limit) {
    return `${BACKEND_BASE_URL}/api/chats/${userId}/?limit=${limit}`;
  }
  return `${BACKEND_BASE_URL}/api/chats/${userId}`;
};

const REJECT_FRIEND_REQUEST_URL = (userId) => {
  return `${BACKEND_BASE_URL}/api/user/${userId}/friend-request/reject`;
};

const FRIEND_REQUESTS_API_URL = (type) => {
  return `${BACKEND_BASE_URL}/api/user/friend-requests/${type}`;
}
const PROFILE_TABS = [
  "Friends",
  "Friend Requests",
  "Sent Requests"
]

export const INTERNAL_SERVER_ERROR = 'Internal server error';
export const FALLBACK_PROFILE_IMAGE = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
export {
  BACKEND_BASE_URL,
  SIGNIN_URL,
  REGISTER_URL,
  SIGNOUT_URL,
  SEARCH_API_URL,
  SEND_FRIEND_REQUEST_URL,
  ACCEPT_FRIEND_REQUEST_URL,
  REJECT_FRIEND_REQUEST_URL,
  GET_CHAT_BY_USERID,
  USER_DETAILS_URL,
  SEND_API_URL,
  PROFILE_TABS,
  FRIENDS_API_URL,
  FRIEND_REQUESTS_API_URL
};
