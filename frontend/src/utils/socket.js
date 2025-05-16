//frontend/src/utils/socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "FastTrip"
  },
  transports: ['websocket']
});

export default socket;