import axios from "axios";
import { ACCEPT_FRIEND_REQUEST_URL, FRIENDS_API_URL, FRIEND_REQUESTS_API_URL, REJECT_FRIEND_REQUEST_URL, } from "../constants";

async function getAllFriends() {
  try {
    const { data, status } = await axios.get(FRIENDS_API_URL, { withCredentials: true });

    return { data, status };
  } catch (error) {
    throw error;
  }
}

async function getFriendRequests(type) {
  try {
    const FRIEND_REQUESTS_URL = FRIEND_REQUESTS_API_URL(type);
    const { data, status } = await axios.get(FRIEND_REQUESTS_URL, { withCredentials: true });

    return { data, status };
  } catch (error) {
    throw error;
  }
}


async function acceptFriendRequest(userId) {
  try {
    const ACCEPT_FRIEND_REQUEST_API_URL = ACCEPT_FRIEND_REQUEST_URL(userId);
    const { data, status } = await axios.put(
      ACCEPT_FRIEND_REQUEST_API_URL,
      {},
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );

    return { data, status };
  } catch (error) {
    throw error;
  }
}
async function rejectFriendRequest(userId) {
  try {
    const REJECT_FRIEND_REQUEST_API_URL = REJECT_FRIEND_REQUEST_URL(userId);
    const { data, status } = await axios.put(REJECT_FRIEND_REQUEST_API_URL, {}, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });

    return { data, status };
  } catch (error) {
    throw error;
  }
}

export { getAllFriends, getFriendRequests, acceptFriendRequest, rejectFriendRequest };