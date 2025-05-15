// backend/socket.js
const express = require('express');
const http = require('http');
const app = express();
const socketIO = require('socket.io');

// Crear servidor HTTP
const server = http.createServer(app);

// Configurar Socket.IO con CORS
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000", // Origen permitido (frontend)
    methods: ["GET", "POST"],         // Métodos permitidos
    credentials: true                  // Si usas autenticación con cookies
  }
});

// Escuchar conexiones de clientes (opcional pero útil para debugging)
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado:", socket.id);

  // Escuchar desconexión
  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// Exportamos las instancias para usarlas en otros archivos
module.exports = { app, server, io };