// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { fetchRegistrationRequests, approveRegistration } = require('../controllers/adminController');

// Ruta: GET /api/admin/requests
// Descripción: Aprueba una solicitud de registro y crea el usuario en la tabla 'usuarios'
router.get('/requests', fetchRegistrationRequests);

// Ruta: PATCH /api/admin/approve/:id_registro
// Descripción: Aprueba una solicitud de registro y crea el usuario en la tabla 'usuarios'
router.patch('/approve/:id_registro', approveRegistration);

module.exports = router;