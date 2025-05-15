// frontend/src/utils/socketClient.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  reconnection: true,
  reconnectionAttempts: Infinity,
});

export default socket;