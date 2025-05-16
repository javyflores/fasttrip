// backend/server.js
const express = require('express');
const cors = require('cors');
const { app, server, io } = require('./socket'); // Importamos servidor + socket.io desde socket.js

// Middlewares
app.use(cors({
  origin: "http://localhost:3000", // Permite solo este origen
  credentials: true                  // Si usas cookies o autenticación
}));
app.use(express.json());

// Rutas
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);

// Puerto
const PORT = process.env.PORT || 5000;

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});