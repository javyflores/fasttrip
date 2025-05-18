// backend/server.js
const express = require('express');
const cors = require('cors');
const { app, server, io } = require('./socket'); // Importamos servidor HTTP + socket.io

// Middlewares
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// Rutas
const driverRoutes = require('./routes/driverRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');

// Montar rutas en el servidor
app.use('/api/drivers', driverRoutes);
app.use('/api/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/api/client', clientRoutes);

// Puerto
const PORT = process.env.PORT || 5000;

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});