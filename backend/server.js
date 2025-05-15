// backend/server.js
const { app, server, io } = require('./socket'); // Importamos todo desde socket.js
const express = require('express');
const cors = require('cors');

// Rutas
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// Configuración del servidor
app.use(cors());
app.use(express.json());

// Usar rutas
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Puerto
const PORT = process.env.PORT || 5000;

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});