import axios from "axios";
import { FRIENDS_API_URL, FRIEND_REQUESTS_API_URL, } from "../constants";

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


export { getAllFriends, getFriendRequests };