// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();

// Controladores
const {
  register,         // Registro directo por parte del administrador (Req002, Req017)
  requestRegistration // Solicitud pública de registro (Req003, Req017)
} = require('../controllers/userController');

/**
 * Ruta: POST /api/users/register
 * Descripción: Registra un nuevo usuario directamente (solo accesible por el administrador)
 * Requiere autenticación y permisos de ADMINISTRADOR (Req014, Req017)
 */
router.post('/register', register);

/**
 * Ruta: POST /api/users/request
 * Descripción: Envía una solicitud de registro desde un usuario público
 * No requiere autenticación (Req003, Req017)
 */
router.post('/request', requestRegistration);

module.exports = router;