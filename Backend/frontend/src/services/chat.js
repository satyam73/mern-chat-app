import axios from "axios";
import { FRIENDS_API_URL, GET_CHAT_BY_USERID, SEND_API_URL } from "../constants";

async function getChatByUserId(userId) {
  try {
    const CHAT_API_URL = GET_CHAT_BY_USERID(userId)

    const { data } = await axios.get(CHAT_API_URL, { withCredentials: true });

    return data;
  } catch (error) {
    console.error('Some error occured while fetching chat by user id ', error)
  }
}

async function sendMessage(payload) {
  try {
    const { data, status } = await axios.post(
      SEND_API_URL,
      payload,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    return { data, status };
  } catch (error) {
    console.error('Some error occured while sending message ', error)
  }
}

async function getFriends() {
  const { data: { friends } } = await axios.get(FRIENDS_API_URL, { withCredentials: true });

  return friends;
}

export { getChatByUserId, sendMessage, getFriends };