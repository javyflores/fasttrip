// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Controladores
const {
  login
} = require('../controllers/authController');

const {
  requestRegistration
} = require('../controllers/userController');

/**
 * Ruta: POST /api/auth/login
 * Descripción: Autenticación de usuarios registrados (login)
 */
router.post('/login', login);

/**
 * Ruta: POST /api/auth/users/request
 * Descripción: Envía una solicitud de registro desde usuario no autenticado
 */
router.post('/users/request', requestRegistration);

module.exports = router;