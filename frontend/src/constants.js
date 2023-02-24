const BACKEND_BASE_URL = "http://localhost:5000";
const SIGNIN_URL = "http://localhost:5000/api/user/login";
const REGISTER_URL = "http://localhost:5000/api/user/register";
const SIGNOUT_URL = "http://localhost:5000/api/user/signout";
// const API_BASE_URL = 'http://localhost:8080'

const SEARCH_API_URL = (username) => {
  return `${BACKEND_BASE_URL}/api/user/search/${username}`;
};

const SEND_FRIEND_REQUEST_URL = (userId) => {
  return `${BACKEND_BASE_URL}/api/user/${userId}/friend-request`;
};

const ACCEPT_FRIEND_REQUEST_URL = (userId) => {
  return `${BACKEND_BASE_URL}/api/user/${userId}/friend-request/accept`;
};

const REJECT_FRIEND_REQUEST_URL = (userId) => {
  return `${BACKEND_BASE_URL}/api/user/${userId}/friend-request/reject`;
};
export {
  BACKEND_BASE_URL,
  SIGNIN_URL,
  REGISTER_URL,
  SIGNOUT_URL,
  SEARCH_API_URL,
  SEND_FRIEND_REQUEST_URL,
  ACCEPT_FRIEND_REQUEST_URL,
  REJECT_FRIEND_REQUEST_URL,
};
