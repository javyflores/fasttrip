// backend/socket.js
const express = require('express');
const http = require('http');
const app = express();
const socketIO = require('socket.io');

// Crear servidor HTTP y Socket.IO
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000", // Origen permitido
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

// Ejemplo básico de conexión
io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

module.exports = { app, server, io };