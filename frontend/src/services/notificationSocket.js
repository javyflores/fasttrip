// frontend/src/services/notificationSocket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

socket.on("connect", () => {
  console.log("Conexión establecida con el servidor.");
});

socket.on("disconnect", () => {
  console.log("Desconectado del servidor");
});

export default socket;