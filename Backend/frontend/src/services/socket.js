import { io } from 'socket.io-client';
import { BACKEND_BASE_URL } from '../constants';

const socket = io(BACKEND_BASE_URL, {
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionDelay: 1000,
});

export default socket;
